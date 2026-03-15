import { db } from '../firebase/config';
import { collection, doc, updateDoc, addDoc } from 'firebase/firestore';

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

export const getProducts = async (): Promise<ProductData> => {
    console.log("Loading products instantly from local data directly");
    return initialProducts as unknown as ProductData;
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
