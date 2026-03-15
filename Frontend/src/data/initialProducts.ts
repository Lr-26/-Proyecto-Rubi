export const initialProducts = {
    carteras: {
        premium: [
            { 
                id: 1, 
                title: "Bag Prada Re-edition 2000", 
                price: "USD 450", 
                image: "/assets/products/Carteras/Bolso Prada 001.jfif", 
                images: [
                    "/assets/products/Carteras/Bolso Prada 001.jfif",
                    "/assets/products/Carteras/Bolso Paradaa001.jfif",
                    "/assets/products/Carteras/Bolso pradaa 001.jfif"
                ],
                description: "Mini bag en tono azul marino con diseño clásico y logo plateado. Incluye caja y certificación de compra.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10 
            },
            { 
                id: 2, 
                title: "Set rosado cartera + billetera Ardilla Roja", 
                price: "USD 320", 
                image: "/assets/products/Carteras/Ardilla Rosa 002.jfif", 
                images: [
                    "/assets/products/Carteras/Ardilla Rosa 002.jfif",
                    "/assets/products/Carteras/Ardilla rosaa 002.jfif",
                    "/assets/products/Carteras/Ardilla Rosaaa002.jfif"
                ],
                description: "Combo que incluye cartera y billetera a juego. La cartera presenta un diseño moderno y un delicado pañuelo decorativo.", 
                stockStatus: 'in_stock', 
                stockQuantity: 5 
            },
            { 
                id: 3, 
                title: "Bolso Camel", 
                price: "USD 280", 
                image: "/assets/products/Carteras/Bolso Camel 003.jfif", 
                images: [
                    "/assets/products/Carteras/Bolso Camel 003.jfif",
                    "/assets/products/Carteras/Bolso Camell003.jfif",
                    "/assets/products/Carteras/Bolso Camelll 003.jfif"
                ],
                description: "Amplia y versátil en tono beige. Su diseño incluye correa larga desmontable para usar al hombro o cruzada, brindando mayor comodidad y practicidad.", 
                stockStatus: 'in_stock', 
                stockQuantity: 8 
            }
        ],
        plus: [],
        standard: []
    },
    lentesSol: {
        premium: [
            // Miu Miu (Ópticos)
            { id: 100, title: "Miu Miu Tortoise Luxe (Mod. 001)", price: "USD 350", image: "/assets/products/miu_miu_new.jpg", description: "Lentes ópticos Miu Miu\nDiseño redondo en tono carey. El set incluye:\n• Estuche rígido aterciopelado\n• Funda protectora aterciopelada\n• Paño de limpieza\n• Caja y bolsa con logo MM\nLentes fotocromáticos (se oscurecen al sol) con filtro azul, apto para colocar lentes con graduación.", stockStatus: 'in_stock', stockQuantity: 5, brand: 'Miu Miu', specs: { material: "Acetato Italiano", shape: "Redonda", style: "Carey", extra: "Fotocromáticos + Filtro Azul" } },
            { 
                id: 101, 
                title: "Lente de sol Miu Miu (Mod. 002)", 
                price: "USD 350", 
                image: "/assets/products/miu_miu_002_1.jfif", 
                images: [
                    "/assets/products/miu_miu_002_1.jfif",
                    "/assets/products/miu_miu_002_2.jfif",
                    "/assets/products/miu_miu_002_3.jfif",
                    "/assets/products/miu_miu_002_4.jfif"
                ],
                description: "Lente de sol Miu Miu\n\nDiseño ovalado con marco plateado y lentes y patillas color verde musgo. UV 400.\nIncluye:\n* Bolsa y caja de la marca\n* estuche rígido aterciopelado \n* funda de tela aterciopelada \n* paño de limpieza.", 
                stockStatus: 'in_stock', 
                stockQuantity: 5, 
                brand: 'Miu Miu', 
                specs: { material: "Metal Plateado", shape: "Ovalada", style: "Verde Musgo", extra: "Protección UV 400" } 
            },
            // Prada
            { 
                id: 105, 
                title: "Lente Prada", 
                price: "USD 380", 
                image: "/assets/products/prada/prada_001.jfif", 
                images: [
                    "/assets/products/prada/prada_001.jfif",
                    "/assets/products/prada/prada_002.jfif"
                ],
                description: "Lente Prada\n\nModelo clásico, tono marrón oscuro. Marco grueso con logo grabado. UV 400\nIncluye:\n* bolsa y caja de la marca \n* estuche rígido \n* paño de limpieza", 
                stockStatus: 'in_stock', 
                stockQuantity: 10, 
                brand: 'Prada',
                specs: { material: "Acetato", shape: "Clásica", style: "Marrón Oscuro", extra: "UV 400" }
            },
            {
                id: 106,
                title: "Lentes Prada (Mod. 002)",
                price: "USD 380",
                image: "/assets/products/Lentes-prada/prada2-002.jfif",
                images: [
                    "/assets/products/Lentes-prada/prada2-002.jfif",
                    "/assets/products/Lentes-prada/pradaaa002.jfif",
                    "/assets/products/Lentes-prada/pradaaaa002.jfif"
                ],
                description: "Lentes Prada\n\nDiseño rombo sin marco, en tono degrade rosado.\nPatillas metálicas con el logo grabado. UV 400\nIncluye:\n* Caja y bolsa de la marca\n* Estuche rígido\n* Paño de limpieza",
                stockStatus: 'in_stock',
                stockQuantity: 5,
                brand: 'Prada',
                specs: { material: "Metal", shape: "Rombo sin marco", style: "Degradé Rosado", extra: "UV 400" }
            },
            // Chanel
            {
                id: 107,
                title: "Lente Chanel",
                price: "USD 450",
                image: "/assets/products/Lentes-Channel/chanell001.jfif",
                images: [
                    "/assets/products/Lentes-Channel/chanel001.jfif",
                    "/assets/products/Lentes-Channel/chanell001.jfif"
                ],
                description: "Lente Chanel\n\nDiseño carey, con detalles dorados en las patillas. UV 400\nIncluye:\n* Bolsa y caja de la marca \n* estuche rígido\n* paño de limpieza\n* tarjeta",
                stockStatus: 'in_stock',
                stockQuantity: 5,
                brand: 'Chanel',
                specs: { material: "Acetato", shape: "Clásica", style: "Carey", extra: "UV 400" }
            },
            // Dior
            {
                id: 109,
                title: "Lentes de Sol Dior",
                price: "USD 480",
                image: "/assets/products/Lentes-Dior/dior001.jfif",
                images: [
                    "/assets/products/Lentes-Dior/diooor001.jfif",
                    "/assets/products/Lentes-Dior/dioor001.jfif",
                    "/assets/products/Lentes-Dior/dior001.jfif"
                ],
                description: "Lentes de Sol Dior\n\nMontura rectangular en color blanco con logo dorado en las patillas y herrajes metálicos en negro. Lente negro con protección UV 400\nIncluye:\n* Caja y Estuche Dior\n* Paño de limpieza\n* Funda de tela",
                stockStatus: 'in_stock',
                stockQuantity: 5,
                brand: 'Dior',
                specs: { material: "Acetato/Metal", shape: "Rectangular", style: "Blanco y Dorado", extra: "UV 400" }
            },
        ],
        plus: [
            { 
                id: 110, 
                title: "Lente de Sol Pluss 001", 
                price: "USD 220", 
                image: "/assets/products/Lentes-Plus/pluss001.jfif", 
                images: [
                    "/assets/products/Lentes-Plus/pluss001.jfif",
                    "/assets/products/Lentes-Plus/plus-001.jfif"
                ],
                description: "- Línea plus\nDescripción general:\nLente de sol\nFiltro UV 400\nIncluye estuche.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Plus',
                specs: { material: "Premium", shape: "Modern", style: "Plus", extra: "Filtro UV 400 + Estuche" }
            },
            { 
                id: 111, 
                title: "Lente de Sol Pluss 002", 
                price: "USD 220", 
                image: "/assets/products/Lentes-Plus/pluss002.jfif", 
                images: [
                    "/assets/products/Lentes-Plus/pluss002.jfif",
                    "/assets/products/Lentes-Plus/plus002.jfif"
                ],
                description: "- Línea plus\nDescripción general:\nLente de sol\nFiltro UV 400\nIncluye estuche.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Plus',
                specs: { material: "Premium", shape: "Modern", style: "Plus", extra: "Filtro UV 400 + Estuche" }
            },
            { 
                id: 112, 
                title: "Lente de Sol Pluss 003", 
                price: "USD 220", 
                image: "/assets/products/Lentes-Plus/pluss003.jfif", 
                images: [
                    "/assets/products/Lentes-Plus/pluss003.jfif",
                    "/assets/products/Lentes-Plus/plus003.jfif"
                ],
                description: "- Línea plus\nDescripción general:\nLente de sol\nFiltro UV 400\nIncluye estuche.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Plus',
                specs: { material: "Premium", shape: "Modern", style: "Plus", extra: "Filtro UV 400 + Estuche" }
            },
            { 
                id: 113, 
                title: "Lente de Sol Pluss 004", 
                price: "USD 220", 
                image: "/assets/products/Lentes-Plus/pluss004.jfif", 
                images: [
                    "/assets/products/Lentes-Plus/pluss004.jfif",
                    "/assets/products/Lentes-Plus/plus004.jfif"
                ],
                description: "- Línea plus\nDescripción general:\nLente de sol\nFiltro UV 400\nIncluye estuche.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Plus',
                specs: { material: "Premium", shape: "Modern", style: "Plus", extra: "Filtro UV 400 + Estuche" }
            },
            { 
                id: 114, 
                title: "Lente de Sol Pluss 005", 
                price: "USD 220", 
                image: "/assets/products/Lentes-Plus/pluss005.jfif", 
                images: [
                    "/assets/products/Lentes-Plus/pluss005.jfif",
                    "/assets/products/Lentes-Plus/plus005.jfif"
                ],
                description: "- Línea plus\nDescripción general:\nLente de sol\nFiltro UV 400\nIncluye estuche.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Plus',
                specs: { material: "Premium", shape: "Modern", style: "Plus", extra: "Filtro UV 400 + Estuche" }
            },
            { 
                id: 115, 
                title: "Lente de Sol Pluss 006", 
                price: "USD 220", 
                image: "/assets/products/Lentes-Plus/pluss006.jfif", 
                images: [
                    "/assets/products/Lentes-Plus/pluss006.jfif",
                    "/assets/products/Lentes-Plus/plus006.jfif"
                ],
                description: "- Línea plus\nDescripción general:\nLente de sol\nFiltro UV 400\nIncluye estuche.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Plus',
                specs: { material: "Premium", shape: "Modern", style: "Plus", extra: "Filtro UV 400 + Estuche" }
            },
            { 
                id: 116, 
                title: "Lente de Sol Pluss 007", 
                price: "USD 220", 
                image: "/assets/products/Lentes-Plus/pluss007.jfif", 
                images: [
                    "/assets/products/Lentes-Plus/pluss007.jfif",
                    "/assets/products/Lentes-Plus/plus007.jfif"
                ],
                description: "- Línea plus\nDescripción general:\nLente de sol\nFiltro UV 400\nIncluye estuche.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Plus',
                specs: { material: "Premium", shape: "Modern", style: "Plus", extra: "Filtro UV 400 + Estuche" }
            },
            { 
                id: 117, 
                title: "Lente de Sol Pluss 008", 
                price: "USD 220", 
                image: "/assets/products/Lentes-Plus/pluss008.jfif", 
                images: [
                    "/assets/products/Lentes-Plus/pluss008.jfif",
                    "/assets/products/Lentes-Plus/plus008.jfif"
                ],
                description: "- Línea plus\nDescripción general:\nLente de sol\nFiltro UV 400\nIncluye estuche.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Plus',
                specs: { material: "Premium", shape: "Modern", style: "Plus", extra: "Filtro UV 400 + Estuche" }
            },
            { 
                id: 120, 
                title: "Lente de Sol Pluss 011", 
                price: "USD 220", 
                image: "/assets/products/Lentes-Plus/pluss011.jfif", 
                images: [
                    "/assets/products/Lentes-Plus/pluss011.jfif",
                    "/assets/products/Lentes-Plus/plus011.jfif",
                    "/assets/products/Lentes-Plus/plusss011.jfif"
                ],
                description: "- Lente de sol\nFiltro UV 400\nIncluye estuche", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Plus',
                specs: { material: "Premium", shape: "Modern", style: "Sunglasses", extra: "Filtro UV 400 + Estuche" }
            },
            { 
                id: 121, 
                title: "Lente de Sol Pluss 012", 
                price: "USD 220", 
                image: "/assets/products/Lentes-Plus/pluss012.jfif", 
                images: [
                    "/assets/products/Lentes-Plus/pluss012.jfif",
                    "/assets/products/Lentes-Plus/plus012.jfif"
                ],
                description: "- Lente de sol\nFiltro UV 400\nIncluye estuche", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Plus',
                specs: { material: "Premium", shape: "Modern", style: "Sunglasses", extra: "Filtro UV 400 + Estuche" }
            },
        ],
        plusDescanso: [
            { 
                id: 118, 
                title: "Lente de Descanso Pluss 009", 
                price: "USD 180", 
                image: "/assets/products/Lentes-Plus/pluss009.jfif", 
                images: [
                    "/assets/products/Lentes-Plus/pluss009.jfif",
                    "/assets/products/Lentes-Plus/plus009.jfif"
                ],
                description: "- Lentes de descanso\n•filtro azul\n•Aptos para cambiar por lentes con graduación\nIncluye estuche", 
                stockStatus: 'in_stock',
                brand: 'Línea Plus',
                specs: { material: "Acetato/Metal", shape: "Descanso", style: "Filtro Azul", extra: "Aptos para graduación" }
            },
            { 
                id: 119, 
                title: "Lente de Descanso Pluss 010", 
                price: "USD 180", 
                image: "/assets/products/Lentes-Plus/pluss010.jfif", 
                images: [
                    "/assets/products/Lentes-Plus/pluss010.jfif",
                    "/assets/products/Lentes-Plus/plus010.jfif"
                ],
                description: "- Lentes de descanso\n•filtro azul\n•Aptos para cambiar por lentes con graduación\nIncluye estuche", 
                stockStatus: 'in_stock',
                brand: 'Línea Plus',
                specs: { material: "Acetato/Metal", shape: "Descanso", style: "Filtro Azul", extra: "Aptos para graduación" }
            },
        ],
        standard: [
            { 
                id: 201, 
                title: "Lente de Sol Estandar 001", 
                price: "USD 120", 
                image: "/assets/products/Lentes-Estandar/estandar001.jfif", 
                images: [
                    "/assets/products/Lentes-Estandar/estandar001.jfif",
                    "/assets/products/Lentes-Estandar/estandarr001.jfif"
                ],
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 202, 
                title: "Lente de Sol Estandar 002", 
                price: "USD 120", 
                image: "/assets/products/Lentes-Estandar/estandar002.jfif", 
                images: [
                    "/assets/products/Lentes-Estandar/estandar002.jfif",
                    "/assets/products/Lentes-Estandar/estandarr002.jfif"
                ],
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 203, 
                title: "Lente de Sol Estandar 003", 
                price: "USD 120", 
                image: "/assets/products/Lentes-Estandar/estandar003.jfif", 
                images: [
                    "/assets/products/Lentes-Estandar/estandar003.jfif",
                    "/assets/products/Lentes-Estandar/estandarr003.jfif"
                ],
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 204, 
                title: "Lente de Sol Estandar 004", 
                price: "USD 120", 
                image: "/assets/products/Lentes-Estandar/estandar004.jfif", 
                images: [
                    "/assets/products/Lentes-Estandar/estandar004.jfif",
                    "/assets/products/Lentes-Estandar/estandarr004.jfif"
                ],
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 205, 
                title: "Lente de Sol Estandar 005", 
                price: "USD 120", 
                image: "/assets/products/Lentes-Estandar/estandar005.jfif", 
                images: [
                    "/assets/products/Lentes-Estandar/estandar005.jfif",
                    "/assets/products/Lentes-Estandar/estandarr005.jfif"
                ],
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 206, 
                title: "Lente de Sol Estandar 006", 
                price: "USD 120", 
                image: "/assets/products/Lentes-Estandar/estandar006.jfif", 
                images: [
                    "/assets/products/Lentes-Estandar/estandar006.jfif",
                    "/assets/products/Lentes-Estandar/estandarr006.jfif"
                ],
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 207, 
                title: "Lente de Sol Estandar 007", 
                price: "USD 120", 
                image: "/assets/products/Lentes-Estandar/estandar007.jfif", 
                images: [
                    "/assets/products/Lentes-Estandar/estandar007.jfif",
                    "/assets/products/Lentes-Estandar/estandarr007.jfif"
                ],
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 208, 
                title: "Lente de Sol Estandar 008", 
                price: "USD 120", 
                image: "/assets/products/Lentes-Estandar/estandar008.jfif", 
                images: [
                    "/assets/products/Lentes-Estandar/estandar008.jfif",
                    "/assets/products/Lentes-Estandar/estandarr008.jfif"
                ],
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 209, 
                title: "Lente de Sol Estandar 009", 
                price: "USD 120", 
                image: "/assets/products/Lentes-Estandar/estandar009.jfif", 
                images: [
                    "/assets/products/Lentes-Estandar/estandar009.jfif",
                    "/assets/products/Lentes-Estandar/estandarr009.jfif"
                ],
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 210, 
                title: "Lente de Sol Estandar 010", 
                price: "USD 120", 
                image: "/assets/products/Lentes-Estandar/estandar010.jfif", 
                images: [
                    "/assets/products/Lentes-Estandar/estandar010.jfif",
                    "/assets/products/Lentes-Estandar/estandarr010.jfif"
                ],
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 211, 
                title: "Lente de Sol Estandar 011", 
                price: "USD 120", 
                image: "/assets/products/Lentes-Estandar/estandar011.jfif", 
                images: [
                    "/assets/products/Lentes-Estandar/estandar011.jfif",
                    "/assets/products/Lentes-Estandar/estandarr011.jfif"
                ],
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 212, 
                title: "Lente de Sol Estandar 012", 
                price: "USD 120", 
                image: "/assets/products/Lentes-Estandar/estandar012.jfif", 
                images: [
                    "/assets/products/Lentes-Estandar/estandar012.jfif",
                    "/assets/products/Lentes-Estandar/estandarr012.jfif"
                ],
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 213, 
                title: "Lente de Sol Estandar 013", 
                price: "USD 120", 
                image: "/assets/products/Lentes-Estandar/estandar013.jfif", 
                images: [
                    "/assets/products/Lentes-Estandar/estandar013.jfif",
                    "/assets/products/Lentes-Estandar/estandarr013.jfif"
                ],
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 214, 
                title: "Lente de Sol Estandar 014", 
                price: "USD 120", 
                image: "/assets/products/Lentes-Estandar/estandar014.jfif", 
                images: [
                    "/assets/products/Lentes-Estandar/estandar014.jfif",
                    "/assets/products/Lentes-Estandar/estandarr014.jfif"
                ],
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 215, 
                title: "Lente de Sol Estandar 015", 
                price: "USD 120", 
                image: "/assets/products/Lentes-Estandar/estandar015.jfif", 
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 216, 
                title: "Lente de Sol Estandar 016", 
                price: "USD 120", 
                image: "/assets/products/Lentes-Estandar/estandar016.jfif", 
                images: [
                    "/assets/products/Lentes-Estandar/estandar016.jfif",
                    "/assets/products/Lentes-Estandar/estandarr016.jfif"
                ],
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 217, 
                title: "Lente de Sol Estandar 017", 
                price: "USD 120", 
                image: "/assets/products/Lentes-Estandar/estandar017.jfif", 
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 218, 
                title: "Lente de Sol Estandar 018", 
                price: "USD 120", 
                image: "/assets/products/Lentes-Estandar/estandar018.jfif", 
                images: [
                    "/assets/products/Lentes-Estandar/estandar018.jfif",
                    "/assets/products/Lentes-Estandar/estandarr018.jfif"
                ],
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 219, 
                title: "Lente de Sol Estandar 019", 
                price: "USD 120", 
                image: "/assets/products/Lentes-Estandar/estandar019.jfif", 
                images: [
                    "/assets/products/Lentes-Estandar/estandar019.jfif",
                    "/assets/products/Lentes-Estandar/estandarr019.jfif"
                ],
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 220, 
                title: "Lente de Sol Estandar 020", 
                price: "USD 120", 
                image: "/assets/products/Lentes-Estandar/estandar020.jfif", 
                images: [
                    "/assets/products/Lentes-Estandar/estandar020.jfif",
                    "/assets/products/Lentes-Estandar/estandarr020.jfif"
                ],
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            }
        ]
    },
    billeteras: {
        hombre: [],
        mujer: [
            { 
                id: 801, 
                title: "Billetera Fendi Azul", 
                price: "USD 190", 
                image: "/assets/products/Billeteras/Fendi001.jfif", 
                images: [
                    "/assets/products/Billeteras/Fendi001.jfif",
                    "/assets/products/Billeteras/Fendii001.jfif"
                ],
                description: "Diseño moderno inspirado en el icónico monograma de la marca. Presenta estampado estilo denim en tonos azules y detalle metálico frontal. Incluye caja y certificación de compra.", 
                stockStatus: 'in_stock',
                stockQuantity: 5
            },
            { 
                id: 802, 
                title: "Billetera Louis Vuitton", 
                price: "USD 210", 
                image: "/assets/products/Billeteras/Louis002.jfif", 
                images: [
                    "/assets/products/Billeteras/Louis002.jfif",
                    "/assets/products/Billeteras/Louiss002.jfif"
                ],
                description: "Diseño inspirado en el clásico modelo. Detalles dorados con el logo. Incluye caja y certificación de compra.", 
                stockStatus: 'in_stock',
                stockQuantity: 5
            }
        ],
        accesorios: []
    }
} as const;
