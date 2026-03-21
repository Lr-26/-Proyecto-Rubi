
import { initialProducts } from './src/data/initialProducts';

const checkMixing = () => {
    const categories = ['carteras', 'lentesSol', 'billeteras'];
    
    categories.forEach(cat => {
        const catData = (initialProducts as any)[cat];
        console.log(`\n--- Checking ${cat.toUpperCase()} ---`);
        
        Object.keys(catData).forEach(subCat => {
            const items = catData[subCat];
            if (!Array.isArray(items)) return;
            
            items.forEach(item => {
                const path = item.image.toLowerCase();
                const title = item.title.toLowerCase();
                
                if (cat === 'lentesSol' && !path.includes('lente') && !title.includes('lente')) {
                    console.warn(`[MIXING] Found non-lente in LentesSol (${subCat}): ID ${item.id} - ${item.title} - Path: ${item.image}`);
                }
                
                if (cat === 'carteras' && !path.includes('cartera') && !path.includes('bolso') && !title.includes('cartera') && !title.includes('bolso')) {
                    console.warn(`[MIXING] Found potentially non-cartera in Carteras (${subCat}): ID ${item.id} - ${item.title} - Path: ${item.image}`);
                }

                if (cat === 'billeteras' && !path.includes('billetera') && !title.includes('billetera')) {
                    console.warn(`[MIXING] Found non-billetera in Billeteras (${subCat}): ID ${item.id} - ${item.title} - Path: ${item.image}`);
                }
            });
        });
    });
};

checkMixing();
