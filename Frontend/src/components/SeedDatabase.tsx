import { db, auth } from '../firebase/config';
import { doc, writeBatch } from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';
import { initialProducts } from '../data/initialProducts';
import { useState } from 'react';

const SeedDatabase = () => {
    const [status, setStatus] = useState('Idle');
    const [logs, setLogs] = useState<string[]>([]);

    const addLog = (msg: string) => setLogs(prev => [...prev, msg]);

    const handleSeed = async () => {
        setStatus('Seeding...');
        setLogs([]);
        try {
            addLog("Starting authentication...");
            await signInAnonymously(auth);
            addLog("Authenticated anonymously.");

            const batch = writeBatch(db);
            const allCategories = Object.entries(initialProducts);
            let count = 0;

            addLog("Preparing data...");

            for (const [mainCategory, subCategories] of allCategories) {
                // validation
                if (typeof subCategories !== 'object') {
                    console.warn(`Skipping invalid category: ${mainCategory}`);
                    continue;
                }

                for (const [subCategory, items] of Object.entries(subCategories as object)) {
                    if (!Array.isArray(items)) {
                        console.warn(`Skipping invalid subcategory: ${subCategory}`);
                        continue;
                    }

                    items.forEach((item: any) => {
                        // Create a reference with the specific ID so we don't duplicate on re-runs
                        // Use string conversion just in case
                        const ref = doc(db, "products", String(item.id));

                        // Sanitize price
                        let priceNum = 0;
                        if (typeof item.price === 'string') {
                            priceNum = parseInt(item.price.replace(/[^\d]/g, '')) || 0;
                        }

                        batch.set(ref, {
                            ...item,
                            mainCategory,
                            subCategory,
                            priceNumerical: priceNum,
                            stockQuantity: item.stockQuantity ?? 10,
                            isUnlimitedStock: item.isUnlimitedStock ?? false,
                            createdAt: new Date()
                        });
                        count++;
                    });
                }
            }

            addLog(`Ready to commit ${count} items. Sending to Firestore...`);
            await batch.commit();
            setStatus(`Success! Uploaded ${count} products.`);
            addLog("Batch commit successful.");

        } catch (error: any) {
            console.error("Seeding error:", error);
            setStatus('Error: ' + error.message);
            addLog(`Error details: ${error.message}`);
        }
    };

    return (
        <div className="p-10 bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-lg w-full">
                <h1 className="text-2xl font-bold mb-4">Database Seeder</h1>
                <p className="mb-6 text-gray-600">Click below to upload `initialProducts` to Firestore.</p>
                <button
                    onClick={handleSeed}
                    disabled={status === 'Seeding...'}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
                >
                    {status === 'Seeding...' ? 'Uploading...' : 'Upload Data'}
                </button>

                <div className="mt-6 text-left bg-gray-50 p-4 rounded-lg h-48 overflow-y-auto font-mono text-xs border border-gray-200">
                    <p className="font-bold border-b pb-2 mb-2">Logs:</p>
                    {logs.map((log, i) => (
                        <div key={i} className="mb-1 text-gray-600">{log}</div>
                    ))}
                    {status.startsWith('Error') && <p className="text-red-500 font-bold">{status}</p>}
                    {status.startsWith('Success') && <p className="text-green-600 font-bold">{status}</p>}
                </div>
            </div>
        </div>
    );
};

export default SeedDatabase;
