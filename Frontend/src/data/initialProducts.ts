export const initialProducts = {
    carteras: {
        premium: [
            { id: 1, title: "Bolso Tote de Cuero Italiano", price: "$450", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=400", description: "Elegancia atemporal confeccionada a mano.", stockStatus: 'in_stock', stockQuantity: 10 },
            { id: 2, title: "Clutch de Noche Gold", price: "$320", image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&q=80&w=400", description: "El complemento perfecto para eventos exclusivos.", stockStatus: 'low_stock', stockQuantity: 3 },
            { id: 7, title: "Maletín Ejecutivo Noir", price: "$550", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=400", description: "Diseñado para el profesional moderno con acabados de lujo.", stockStatus: 'in_stock', stockQuantity: 10 },
            { id: 8, title: "Crossbody Matelassé", price: "$390", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=400", description: "Textura acolchada icónica con cadena dorada.", stockStatus: 'in_stock', stockQuantity: 10 },
            { id: 9, title: "Bolsa de Viaje Heritage", price: "$680", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=400", description: "Capacidad y estilo para tus escapadas de fin de semana.", stockStatus: 'out_of_stock', stockQuantity: 0 },
            { id: 10, title: "Mini Bag Estructurada", price: "$290", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=400", description: "Pequeña en tamaño, grande en sofisticación.", stockStatus: 'in_stock', stockQuantity: 10 },
        ],
        plus: [
            { id: 3, title: "Bolso Satchel Estructurado", price: "$380", image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80&w=400", description: "Diseño minimalista para la mujer moderna.", stockStatus: 'in_stock', stockQuantity: 10 },
            { id: 4, title: "Mochila Urbana Chic", price: "$180", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=400", description: "Estilo y funcionalidad para el día a día.", stockStatus: 'in_stock', stockQuantity: 10 },
        ],
        standard: [
            { id: 5, title: "Bolso Crossbody Texturizado", price: "$150", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=400", description: "Versatilidad en cada detalle.", stockStatus: 'in_stock', stockQuantity: 10 },
            { id: 6, title: "Cartera de Hombro Soft", price: "$165", image: "https://images.unsplash.com/photo-1601924994987-69e2c70cb322?auto=format&fit=crop&q=80&w=400", description: "Suavidad y confort en un diseño único.", stockStatus: 'in_stock', stockQuantity: 10 }
        ]
    },
    lentesSol: {
        premium: [
            // Miu Miu (Ópticos)
            { id: 100, title: "Miu Miu Tortoise Luxe (Mod. 001)", price: "$350", image: "/assets/products/miu_miu_new.jpg", description: "Lentes ópticos Miu Miu\nDiseño redondo en tono carey. El set incluye:\n• Estuche rígido aterciopelado\n• Funda protectora aterciopelada\n• Paño de limpieza\n• Caja y bolsa con logo MM\nLentes fotocromáticos (se oscurecen al sol) con filtro azul, apto para colocar lentes con graduación.", stockStatus: 'in_stock', stockQuantity: 5, brand: 'Miu Miu', specs: { material: "Acetato Italiano", shape: "Redonda", style: "Carey", extra: "Fotocromáticos + Filtro Azul" } },
            { 
                id: 101, 
                title: "Lente de sol Miu Miu (Mod. 002)", 
                price: "$350", 
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
                price: "$380", 
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
                price: "$380",
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
                price: "$450",
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
                price: "$480",
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
                price: "$220", 
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
                price: "$220", 
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
                price: "$220", 
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
                price: "$220", 
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
                price: "$220", 
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
                price: "$220", 
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
                price: "$220", 
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
                price: "$220", 
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
                price: "$220", 
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
                price: "$220", 
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
                price: "$180", 
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
                price: "$180", 
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
                price: "$120", 
                image: "/assets/products/Lentes-Estandar/estandar001.jfif", 
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 202, 
                title: "Lente de Sol Estandar 002", 
                price: "$120", 
                image: "/assets/products/Lentes-Estandar/estandar002.jfif", 
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 203, 
                title: "Lente de Sol Estandar 003", 
                price: "$120", 
                image: "/assets/products/Lentes-Estandar/estandar003.jfif", 
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 204, 
                title: "Lente de Sol Estandar 004", 
                price: "$120", 
                image: "/assets/products/Lentes-Estandar/estandar004.jfif", 
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 205, 
                title: "Lente de Sol Estandar 005", 
                price: "$120", 
                image: "/assets/products/Lentes-Estandar/estandar005.jfif", 
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 206, 
                title: "Lente de Sol Estandar 006", 
                price: "$120", 
                image: "/assets/products/Lentes-Estandar/estandar006.jfif", 
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 207, 
                title: "Lente de Sol Estandar 007", 
                price: "$120", 
                image: "/assets/products/Lentes-Estandar/estandar007.jfif", 
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 208, 
                title: "Lente de Sol Estandar 008", 
                price: "$120", 
                image: "/assets/products/Lentes-Estandar/estandar008.jfif", 
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 209, 
                title: "Lente de Sol Estandar 009", 
                price: "$120", 
                image: "/assets/products/Lentes-Estandar/estandar009.jfif", 
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 210, 
                title: "Lente de Sol Estandar 010", 
                price: "$120", 
                image: "/assets/products/Lentes-Estandar/estandar010.jfif", 
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 211, 
                title: "Lente de Sol Estandar 011", 
                price: "$120", 
                image: "/assets/products/Lentes-Estandar/estandar011.jfif", 
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 212, 
                title: "Lente de Sol Estandar 012", 
                price: "$120", 
                image: "/assets/products/Lentes-Estandar/estandar012.jfif", 
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 213, 
                title: "Lente de Sol Estandar 013", 
                price: "$120", 
                image: "/assets/products/Lentes-Estandar/estandar013.jfif", 
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 214, 
                title: "Lente de Sol Estandar 014", 
                price: "$120", 
                image: "/assets/products/Lentes-Estandar/estandar014.jfif", 
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 215, 
                title: "Lente de Sol Estandar 015", 
                price: "$120", 
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
                price: "$120", 
                image: "/assets/products/Lentes-Estandar/estandar016.jfif", 
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 217, 
                title: "Lente de Sol Estandar 017", 
                price: "$120", 
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
                price: "$120", 
                image: "/assets/products/Lentes-Estandar/estandar018.jfif", 
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 219, 
                title: "Lente de Sol Estandar 019", 
                price: "$120", 
                image: "/assets/products/Lentes-Estandar/estandar019.jfif", 
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 220, 
                title: "Lente de Sol Estandar 020", 
                price: "$120", 
                image: "/assets/products/Lentes-Estandar/estandar020.jfif", 
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 221, 
                title: "Lente de Sol Estandar 021", 
                price: "$120", 
                image: "/assets/products/Lentes-Estandar/estandarr001.jfif", 
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 222, 
                title: "Lente de Sol Estandar 022", 
                price: "$120", 
                image: "/assets/products/Lentes-Estandar/estandarr002.jfif", 
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 223, 
                title: "Lente de Sol Estandar 023", 
                price: "$120", 
                image: "/assets/products/Lentes-Estandar/estandarr003.jfif", 
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 224, 
                title: "Lente de Sol Estandar 024", 
                price: "$120", 
                image: "/assets/products/Lentes-Estandar/estandarr004.jfif", 
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 225, 
                title: "Lente de Sol Estandar 025", 
                price: "$120", 
                image: "/assets/products/Lentes-Estandar/estandarr005.jfif", 
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 226, 
                title: "Lente de Sol Estandar 026", 
                price: "$120", 
                image: "/assets/products/Lentes-Estandar/estandarr006.jfif", 
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 227, 
                title: "Lente de Sol Estandar 027", 
                price: "$120", 
                image: "/assets/products/Lentes-Estandar/estandarr007.jfif", 
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 228, 
                title: "Lente de Sol Estandar 028", 
                price: "$120", 
                image: "/assets/products/Lentes-Estandar/estandarr008.jfif", 
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 229, 
                title: "Lente de Sol Estandar 029", 
                price: "$120", 
                image: "/assets/products/Lentes-Estandar/estandarr009.jfif", 
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 230, 
                title: "Lente de Sol Estandar 030", 
                price: "$120", 
                image: "/assets/products/Lentes-Estandar/estandarr010.jfif", 
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 231, 
                title: "Lente de Sol Estandar 031", 
                price: "$120", 
                image: "/assets/products/Lentes-Estandar/estandarr011.jfif", 
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 232, 
                title: "Lente de Sol Estandar 032", 
                price: "$120", 
                image: "/assets/products/Lentes-Estandar/estandarr012.jfif", 
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 233, 
                title: "Lente de Sol Estandar 033", 
                price: "$120", 
                image: "/assets/products/Lentes-Estandar/estandarr013.jfif", 
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 234, 
                title: "Lente de Sol Estandar 034", 
                price: "$120", 
                image: "/assets/products/Lentes-Estandar/estandarr014.jfif", 
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 235, 
                title: "Lente de Sol Estandar 035", 
                price: "$120", 
                image: "/assets/products/Lentes-Estandar/estandarr016.jfif", 
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 236, 
                title: "Lente de Sol Estandar 036", 
                price: "$120", 
                image: "/assets/products/Lentes-Estandar/estandarr018.jfif", 
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 237, 
                title: "Lente de Sol Estandar 037", 
                price: "$120", 
                image: "/assets/products/Lentes-Estandar/estandarr019.jfif", 
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            },
            { 
                id: 238, 
                title: "Lente de Sol Estandar 038", 
                price: "$120", 
                image: "/assets/products/Lentes-Estandar/estandarr020.jfif", 
                description: "Lentes de sol\nFiltro UV 400\nIncluye funda de tela.", 
                stockStatus: 'in_stock', 
                stockQuantity: 10,
                brand: 'Línea Estandar',
                specs: { material: "Acetato", shape: "Classic", style: "Casual", extra: "Filtro UV 400 + Funda de tela" }
            }
        ]
    },
    ropaDeportiva: {
        hombre: [
            { id: 501, title: "Tech Runner Jacket", price: "$120", image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&q=80&w=400", description: "Tejido transpirable y resistente al agua.", stockStatus: 'in_stock' },
            { id: 502, title: "Pro Compression Tight", price: "$85", image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=400", description: "Soporte muscular avanzado.", stockStatus: 'in_stock' },
            { id: 503, title: "Elite Training Tee", price: "$55", image: "https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&q=80&w=400", description: "Tecnología de absorción de sudor.", stockStatus: 'in_stock' },
            { id: 504, title: "Marathon Shorts", price: "$60", image: "https://images.unsplash.com/photo-1518617638479-725840dc188c?auto=format&fit=crop&q=80&w=400", description: "Libertad de movimiento para largas distancias.", stockStatus: 'in_stock' },
            { id: 505, title: "Thermal Hoodie", price: "$110", image: "https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&q=80&w=400", description: "Calidez ligera para entrenamientos invernales.", stockStatus: 'low_stock' },
            { id: 506, title: "Impact Vest", price: "$95", image: "https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?auto=format&fit=crop&q=80&w=400", description: "Protección corporal para deportes de alto impacto.", stockStatus: 'in_stock' },
        ],
        mujer: [
            { id: 601, title: "Yoga Flex Top", price: "$65", image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=400", description: "Libertad de movimiento total.", stockStatus: 'in_stock' },
            { id: 602, title: "Aero Leggings", price: "$90", image: "https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?auto=format&fit=crop&q=80&w=400", description: "Cintura alta y tejido de secado rápido.", stockStatus: 'in_stock' },
            { id: 603, title: "Impact Sports Bra", price: "$55", image: "https://images.unsplash.com/photo-1574680096141-fac95585f672?auto=format&fit=crop&q=80&w=400", description: "Soporte máximo para entrenamientos intensos.", stockStatus: 'in_stock' },
            { id: 604, title: "Seamless Crop Top", price: "$45", image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=400", description: "Comodidad sin costuras para todo el día.", stockStatus: 'in_stock' },
            { id: 605, title: "Runner Windbreaker", price: "$130", image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&q=80&w=400", description: "Protección contra el viento con estilo.", stockStatus: 'low_stock' },
            { id: 606, title: "Pilates Studio Set", price: "$140", image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=400", description: "Conjunto coordinado para cuerpo y mente.", stockStatus: 'in_stock' },
        ],
        accesorios: [
            { id: 701, title: "Sport Cap Elite", price: "$35", image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&q=80&w=400", description: "Protección solar y ventilación.", stockStatus: 'in_stock' }
        ]
    }
} as const;
