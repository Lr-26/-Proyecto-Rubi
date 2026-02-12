import { db } from './src/firebase/config';
import { collection, doc, writeBatch } from 'firebase/firestore';
import { initialProducts } from './src/data/initialProducts';

const seedDatabase = async () => {
    console.log('Starting seed process...');
    try {
        const batch = writeBatch(db);
        const allCategories = Object.entries(initialProducts);
        let count = 0;

        for (const [mainCategory, subCategories] of allCategories) {
            for (const [subCategory, items] of Object.entries(subCategories)) {
                // @ts-ignore
                items.forEach((item: any) => {
                    const ref = doc(collection(db, "products")); // Auto-ID
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
        console.log(`Success! Uploaded ${count} products.`);
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
