import { db } from '../firebase/config';
import { collection, getDocs, doc, updateDoc, addDoc, writeBatch } from 'firebase/firestore';

export type ProductHeight = 'in_stock' | 'low_stock' | 'out_of_stock';
export type ProductCategory = 'carteras' | 'lentesSol' | 'lentesCristal' | 'ropaDeportiva';

export interface Product {
    id: string | number; // Firestore IDs are strings
    title: string;
    price: string;
    image: string;
    description: string;
    stockStatus: ProductHeight;
    category?: string;
    mainCategory?: string;
    subCategory?: string;
    priceNumerical?: number;
    stockQuantity?: number; // New field for numeric stock
    isUnlimitedStock?: boolean; // New field for unlimited stock
}

export interface ProductData {
    carteras: {
        premium: Product[];
        plus: Product[];
        standard: Product[];
    };
    lentesSol: {
        premium: Product[];
        plus: Product[];
        standard: Product[];
    };
    lentesCristal: {
        premium: Product[];
        plus: Product[];
        standard: Product[];
    };
    ropaDeportiva: {
        hombre: Product[];
        mujer: Product[];
        accesorios: Product[];
    };
    [key: string]: any; // Allow for extensibility/dynamic keys if strictly needed, but prefer strict structure
}

// Helper to structure data correctly for the app
import { initialProducts } from './initialProducts';

// Simple in-memory cache
let cachedData: ProductData | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const getProducts = async (forceRefresh = false): Promise<ProductData> => {
    const now = Date.now();

    // Return cached data if available and fresh
    if (!forceRefresh && cachedData && (now - lastFetchTime < CACHE_DURATION)) {
        console.log("Returning cached product data");
        // Apply overrides to cached data to ensure latest stock status is used
        return applyLocalOverrides(cachedData) as unknown as ProductData;
    }

    try {
        console.log("Fetching products from Firestore...");
        const productsCol = collection(db, 'products');
        const productSnapshot = await getDocs(productsCol);

        if (productSnapshot.empty) {
            console.warn("Firestore is empty, seeding database...");

            // Auto-seed logic directly from the client
            try {
                const batch = writeBatch(db);
                const allCategories = Object.entries(initialProducts);
                let count = 0;

                for (const [mainCategory, subCategories] of allCategories) {
                    for (const [subCategory, items] of Object.entries(subCategories)) {
                        // @ts-ignore
                        items.forEach((item: any) => {
                            // Use the ID from the item as the document ID
                            const ref = doc(db, "products", String(item.id));
                            batch.set(ref, {
                                ...item,
                                mainCategory,
                                subCategory,
                                priceNumerical: parseInt(item.price.replace('$', '')),
                                createdAt: new Date()
                            });
                            count++;
                        });
                    }
                }

                await batch.commit();
                console.log(`Successfully seeded ${count} products.`);

                // Fetch again after seeding
                // const newSnapshot = await getDocs(productsCol);
                // const productList = newSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Product));

                // For simplified flow after seeding, just return initial structure
                cachedData = initialProducts as unknown as ProductData;
                lastFetchTime = Date.now();
                return initialProducts as unknown as ProductData;

            } catch (seedError) {
                console.error("Error auto-seeding:", seedError);
                return initialProducts as unknown as ProductData;
            }
        }

        const productList = productSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Product));

        // Reconstruct the nested object structure the app expects
        const structuredData: ProductData = {
            carteras: { premium: [], plus: [], standard: [] },
            lentesSol: { premium: [], plus: [], standard: [] },
            lentesCristal: { premium: [], plus: [], standard: [] },
            ropaDeportiva: { hombre: [], mujer: [], accesorios: [] }
        };

        productList.forEach(product => {
            if (product.mainCategory && product.subCategory) {
                // Type guard/assertion could be improved here with a proper schema validation
                // for now we trust the mainCategory/subCategory strings match keys
                if (structuredData[product.mainCategory] && (structuredData[product.mainCategory] as any)[product.subCategory]) {
                    (structuredData[product.mainCategory] as any)[product.subCategory].push(product);
                }
            }
        });

        // Store in cache
        cachedData = structuredData;
        lastFetchTime = Date.now();

        // Apply local overrides to the fetched data
        const overriddenData = applyLocalOverrides(structuredData);

        return overriddenData as unknown as ProductData;
    } catch (error) {
        console.error("Error connecting to Firestore, falling back to initial data:", error);
        return applyLocalOverrides(initialProducts) as unknown as ProductData;
    }
};

// Helper to apply local overrides
const applyLocalOverrides = (data: any) => {
    try {
        const localStock = JSON.parse(localStorage.getItem('stock_overrides') || '{}');
        // Deep copy to avoid mutating the original import
        const newData = JSON.parse(JSON.stringify(data));

        console.log("Applying stock overrides:", localStock);

        // Iterate through all categories to apply overrides
        Object.keys(newData).forEach(mainCat => {
            if (!newData[mainCat]) return;
            Object.keys(newData[mainCat]).forEach(subCat => {
                const items = newData[mainCat][subCat];
                if (!Array.isArray(items)) return;

                // Direct mutation of the deep copy
                items.forEach((product: Product) => {
                    const override = localStock[String(product.id)];
                    if (override) {
                        console.log(`Overriding product ${product.id} (${product.title}) to ${override}`);
                        product.stockStatus = override;
                    }
                });
            });
        });
        return newData;
    } catch (e) {
        console.error("Error applying local overrides:", e);
        return data;
    }
};

export const updateProductStock = async (id: string, newStatus: ProductHeight) => {
    // 1. Save to LocalStorage (Always works for the current user)
    try {
        const localStock = JSON.parse(localStorage.getItem('stock_overrides') || '{}');
        localStock[id] = newStatus;
        localStorage.setItem('stock_overrides', JSON.stringify(localStock));
        console.log(`Local stock updated for ${id}: ${newStatus}`);
    } catch (e) {
        console.error("Error saving to local storage:", e);
    }

    // 2. Try to save to Firestore (Best effort)
    try {
        const productRef = doc(db, 'products', id);
        await updateDoc(productRef, {
            stockStatus: newStatus
        });
    } catch (e) {
        console.warn("Could not persist to Firestore (using local fallback only).");
    }
};

export const addProduct = async (product: Omit<Product, 'id'>): Promise<string> => {
    try {
        const productsCol = collection(db, 'products');
        const docRef = await addDoc(productsCol, product);
        return docRef.id;
    } catch (e) {
        console.error("Error adding product: ", e);
        throw e;
    }
};

export const updateProduct = async (id: string, updates: Partial<Product>): Promise<void> => {
    try {
        const productRef = doc(db, 'products', id);
        await updateDoc(productRef, updates);
    } catch (e) {
        console.error("Error updating product: ", e);
        throw e;
    }
};
