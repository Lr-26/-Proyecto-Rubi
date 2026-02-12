import { db } from './src/firebase/config';
import { collection, getDocs, addDoc } from 'firebase/firestore';

const testConnection = async () => {
    console.log("Testing Firestore Connection...");
    try {
        // Try to read
        console.log("Attempting to read 'products'...");
        const snapshot = await getDocs(collection(db, 'products'));
        console.log(`Read success! Found ${snapshot.size} docs.`);
    } catch (e: any) {
        console.error("Read failed:", e.code, e.message);
    }

    try {
        // Try to write
        console.log("Attempting to write test product...");
        await addDoc(collection(db, 'products'), {
            title: "Test Product",
            test: true,
            createdAt: new Date()
        });
        console.log("Write success!");
    } catch (e: any) {
        console.error("Write failed:", e.code, e.message);
    }
};

testConnection();
