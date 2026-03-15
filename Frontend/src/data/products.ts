import { db } from '../firebase/config';
import { collection, getDocs, doc, updateDoc, addDoc, writeBatch } from 'firebase/firestore';

export type ProductHeight = 'in_stock' | 'low_stock' | 'out_of_stock';
export type ProductCategory = 'carteras' | 'lentesSol' | 'lentesCristal' | 'ropaDeportiva';

export interface Product {
    id: string | number; // Firestore IDs are strings
    title: string;
    price: string;
    image: string;
    images?: string[]; // Array opcional para soportar carruseles/galerías
    description: string;
    stockStatus: ProductHeight;
    category?: string;
    mainCategory?: string;
    subCategory?: string;
    brand?: string; // Brand for premium divisions
    priceNumerical?: number;
    stockQuantity?: number; // New field for numeric stock
    isUnlimitedStock?: boolean; // New field for unlimited stock
    specs?: {
        material?: string;
        shape?: string;
        style?: string;
        uv?: string;
        [key: string]: string | undefined;
    };
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
    billeteras: {
        hombre: Product[];
        mujer: Product[];
        accesorios: Product[];
    };
    [key: string]: any; 
}

// Helper to structure data correctly for the app
import { initialProducts } from './initialProducts';

// Simple in-memory cache
let cachedData: ProductData | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const getProducts = async (forceRefresh = false): Promise<ProductData> => {
    console.log("Loading products instantly from local data directly");
    return initialProducts as unknown as ProductData;
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
