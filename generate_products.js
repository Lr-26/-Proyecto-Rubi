
const files = [
    "estandar001.jfif", "estandar002.jfif", "estandar003.jfif", "estandar004.jfif", "estandar005.jfif",
    "estandar006.jfif", "estandar007.jfif", "estandar008.jfif", "estandar009.jfif", "estandar010.jfif",
    "estandar011.jfif", "estandar012.jfif", "estandar013.jfif", "estandar014.jfif", "estandar015.jfif",
    "estandar016.jfif", "estandar017.jfif", "estandar018.jfif", "estandar019.jfif", "estandar020.jfif",
    "estandarr001.jfif", "estandarr002.jfif", "estandarr003.jfif", "estandarr004.jfif", "estandarr005.jfif",
    "estandarr006.jfif", "estandarr007.jfif", "estandarr008.jfif", "estandarr009.jfif", "estandarr010.jfif",
    "estandarr011.jfif", "estandarr012.jfif", "estandarr013.jfif", "estandarr014.jfif", "estandarr016.jfif",
    "estandarr018.jfif", "estandarr019.jfif", "estandarr020.jfif"
];

const products = files.map((filename, i) => {
    const productId = 201 + i;
    const title = `Lente de Sol Estandar ${String(i + 1).padStart(3, '0')}`;
    const imagePath = `/assets/products/Lentes-Estandar/${filename}`;
    
    return `            { 
                id: ${productId}, 
                title: "${title}", 
                price: "$120", 
                image: "${imagePath}", 
                description: "Lentes de sol\\nFiltro UV 400\\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            }`;
});

console.log(products.join(',\n'));
