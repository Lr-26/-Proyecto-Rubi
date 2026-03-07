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
    // Para cargar instantáneamente sin retrasos, devolvemos la data local
    // (A futuro si Firebase está bien configurado, esto se puede revertir)
    console.log("Loading products instantly from local data");

    // Apply local overrides to the fetched data (stock status etc)
    const overriddenData = applyLocalOverrides(initialProducts);

    // Simular un pequeño retardo de red para la animación, o sacarlo si se quiere instantáneo.
    // Lo eliminamos para máxima velocidad.
    return overriddenData as unknown as ProductData;
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
