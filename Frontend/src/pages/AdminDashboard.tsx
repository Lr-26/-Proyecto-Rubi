import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Search, Edit2, CheckCircle, AlertTriangle, XCircle, LogOut, Loader2 } from 'lucide-react';
import { getProducts, updateProductStock, addProduct, updateProduct, Product } from '../data/products';
import { Link } from 'react-router-dom';
import ImageUpload from '../components/ImageUpload';
import { auth, db } from '../firebase/config';
import { signInAnonymously } from 'firebase/auth';
import { writeBatch, doc } from 'firebase/firestore';
import { initialProducts } from '../data/initialProducts';

const AdminDashboard = () => {
    // Simple mock authentication (Can be upgraded to Firebase Auth later)
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Data state
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if (password === 'admin123') { // Simple hardcoded password for demo
            try {
                // Sign in anonymously to Firebase to get write access
                await signInAnonymously(auth);
                setIsAuthenticated(true);
                fetchData();
            } catch (authError) {
                console.error("Auth error:", authError);
                // Allow login even if auth fails for demo purposes, but warn
                setIsAuthenticated(true);
                fetchData();
                // setError('Error de conexión con el servicio de autenticación');
            }
        } else {
            setError('Contraseña incorrecta');
        }
        setLoading(false);
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await getProducts(); // Loaded directly now
            // Flatten the structure for the table
            let flatList: Product[] = [];

            // Iterate over the known keys of ProductData
            Object.values(data).forEach((mainCat) => {
                if (typeof mainCat === 'object' && mainCat !== null) {
                    Object.values(mainCat).forEach((subCatList) => {
                        if (Array.isArray(subCatList)) {
                            flatList = [...flatList, ...subCatList];
                        }
                    });
                }
            });

            setProducts(flatList);
            setFilteredProducts(flatList);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Filter effect
    useEffect(() => {
        const results = products.filter(product =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (product.category || '').toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(results);
    }, [searchTerm, products]);

    // Real update function
    const handleStockUpdate = async (id: string | number, newStatus: Product['stockStatus']) => {
        try {
            // Optimistic update
            const updatedProducts = products.map(p =>
                p.id === id ? { ...p, stockStatus: newStatus } : p
            );
            setProducts(updatedProducts);
            setFilteredProducts(prev => prev.map(p => p.id === id ? { ...p, stockStatus: newStatus } : p));

            // Real DB update
            await updateProductStock(String(id), newStatus);

        } catch (error) {
            console.error("Update failed:", error);
            alert("Error al actualizar. Revisa tu conexión.");
            fetchData(); // Revert on error
        }
    };

    const getStockBadgeColor = (status: Product['stockStatus']) => {
        switch (status) {
            case 'in_stock': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            case 'low_stock': return 'bg-amber-100 text-amber-800 border-amber-200';
            case 'out_of_stock': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    // Add/Edit Product State
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
        title: '',
        price: '',
        image: '',
        description: '',
        stockStatus: 'in_stock',
        category: '',
        mainCategory: 'carteras', 
        subCategory: 'premium',    // Default
        stockQuantity: 10,
        isUnlimitedStock: false
    });

    // Auto-update status based on quantity or unlimited flag
    useEffect(() => {
        if (newProduct.isUnlimitedStock) {
            setNewProduct(prev => (prev.stockStatus !== 'in_stock' ? { ...prev, stockStatus: 'in_stock' } : prev));
            return;
        }

        const qty = newProduct.stockQuantity || 0;
        let status: Product['stockStatus'] = 'in_stock';
        if (qty === 0) status = 'out_of_stock';
        else if (qty < 5) status = 'low_stock';

        setNewProduct(prev => (prev.stockStatus !== status ? { ...prev, stockStatus: status } : prev));
    }, [newProduct.stockQuantity, newProduct.isUnlimitedStock]);

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Basic formatting for price
            let formattedPrice = newProduct.price;
            if (!formattedPrice.startsWith('$') && !isNaN(Number(formattedPrice))) {
                formattedPrice = `$${formattedPrice}`;
            }

            const productToSave = { ...newProduct, price: formattedPrice };

            if (editingId) {
                await updateProduct(editingId, productToSave);
                // alert("Producto actualizado exitosamente");
            } else {
                await addProduct(productToSave);
                // alert("Producto agregado exitosamente");
            }
            setIsAddModalOpen(false);
            setEditingId(null);
            setNewProduct(initialProductState);
            await fetchData(); // Refresh list to see changes
        } catch (error) {
            console.error("Error saving product:", error);
            alert("Error al guardar producto");
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (product: Product) => {
        setNewProduct({
            title: product.title,
            price: product.price,
            image: product.image,
            description: product.description,
            stockStatus: product.stockStatus,
            category: product.category || '',
            mainCategory: product.mainCategory || 'carteras',
            subCategory: product.subCategory || 'premium',
            stockQuantity: product.stockQuantity ?? 10, // Default to 10 if not set
            isUnlimitedStock: product.isUnlimitedStock ?? false
        });
        setEditingId(String(product.id));
        setIsAddModalOpen(true);
    };

    const initialProductState = {
        title: '',
        price: '',
        image: '',
        description: '',
        stockStatus: 'in_stock' as const,
        category: '',
        mainCategory: 'carteras',
        subCategory: 'premium',
        stockQuantity: 10,
        isUnlimitedStock: false
    };

    if (!isAuthenticated) {
        // ... (Login form remains the same)
        return (
            <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
                >
                    <div className="text-center mb-8">
                        <div className="bg-premium-dark text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                            <Package size={32} />
                        </div>
                        <h2 className="text-2xl font-serif font-bold text-gray-900">Acceso Propietario</h2>
                        <p className="text-gray-500 mt-2">Ingrese su contraseña para gestionar el inventario.</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-premium-gold outline-none transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <button
                            type="submit"
                            className="w-full bg-premium-dark text-white py-3 rounded-lg font-bold hover:bg-black transition-colors"
                        >
                            {loading ? <Loader2 className="animate-spin mx-auto" /> : 'Ingresar al Panel'}
                        </button>
                    </form>
                    <p className="text-center mt-6 text-xs text-gray-400">
                        Solo personal autorizado. <Link to="/" className="text-premium-gold hover:underline">Volver al inicio</Link>
                    </p>
                </motion.div>
            </div>
        );
    }

    const handleSeedDatabase = async () => {
        if (window.confirm("¿Estás seguro de que deseas restaurar la base de datos? Esto sobrescribirá todos los productos actuales con los datos iniciales.")) {
            setLoading(true);
            try {
                // Since this is a client-side component, we use a batch operation similar to the seed script
                const batch = writeBatch(db);
                // @ts-ignore
                Object.entries(initialProducts).forEach(([mainCategory, subCategories]) => {
                    // @ts-ignore
                    Object.entries(subCategories).forEach(([subCategory, items]) => {
                        // @ts-ignore
                        items.forEach((item: any) => {
                            const ref = doc(db, "products", String(item.id));
                            batch.set(ref, {
                                ...item,
                                mainCategory,
                                subCategory,
                                updatedAt: new Date()
                            });
                        });
                    });
                });
                await batch.commit();
                alert("Base de datos restaurada con éxito.");
                await fetchData();
            } catch (err) {
                console.error("Seed error:", err);
                alert("Error al restaurar la base de datos.");
            } finally {
                setLoading(false);
            }
        }
    };

    if (loading && isAuthenticated && !isAddModalOpen) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader2 size={40} className="text-premium-dark animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            {/* Admin Header */}
            <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="bg-premium-dark p-2 rounded-lg text-white">
                            <Package size={24} />
                        </div>
                        <h1 className="text-xl font-bold text-gray-900 tracking-tight">Panel de Inventario</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={handleSeedDatabase}
                            className="text-xs text-gray-400 hover:text-premium-dark underline mr-2"
                            title="Recargar productos de ejemplo si la base de datos está vacía o corrupta"
                        >
                            Restaurar BD
                        </button>
                        <button
                            onClick={() => { setIsAddModalOpen(true); setNewProduct(initialProductState); setEditingId(null); }}
                            className="bg-premium-gold text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-600 transition-colors flex items-center shadow-lg shadow-premium-gold/20"
                        >
                            <Package size={18} className="mr-2" /> Agregar Producto
                        </button>
                        <div className="text-sm text-gray-500 hidden md:block border-l pl-4 ml-4">
                            Hola, <span className="font-semibold text-gray-900">Administrador</span>
                        </div>
                        <Link to="/" className="p-2 text-gray-400 hover:text-red-600 transition-colors" title="Salir">
                            <LogOut size={20} />
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">

                {/* Stats / Controls */}
                <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <div className="relative w-full sm:w-96">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={18} className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Buscar por nombre, categoría..."
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-premium-gold focus:border-premium-gold sm:text-sm transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex space-x-4 text-sm">
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-1.5 rounded-md">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            <span className="text-gray-600">Total: <span className="font-bold text-gray-900">{products.length}</span></span>
                        </div>
                    </div>
                </div>

                {/* Products Table */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        Producto
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                                        Categoría
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        Precio
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        Stock Físico
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        Estado Visible
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        Acciones Rápidas
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredProducts.map((product) => (
                                    <motion.tr
                                        key={product.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        layoutId={`row-${product.id}`}
                                        className="hover:bg-gray-50 transition-colors group"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-16 w-16 rounded-lg overflow-hidden border border-gray-200 bg-gray-100 shadow-sm group-hover:shadow-md transition-shadow">
                                                    <img className="h-full w-full object-cover" src={product.image} alt="" loading="lazy" />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-bold text-gray-900 group-hover:text-premium-dark transition-colors">{product.title}</div>
                                                    <div className="text-xs text-gray-500 md:hidden">{product.category}</div>
                                                    <div className="text-xs text-gray-400 mt-1 truncate max-w-[200px]">{product.description}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                                            <span className="px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-600 border border-gray-200">
                                                {product.category}
                                            </span>
                                            <div className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">
                                                {product.mainCategory} • {product.subCategory}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                                            {product.price}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            <div className={`font-mono px-2 py-1 rounded inline-block ${product.isUnlimitedStock ? 'bg-blue-100 text-blue-800' : 'bg-gray-100'}`}>
                                                {product.isUnlimitedStock ? '∞ Ilimitado' : `${product.stockQuantity ?? '-'} u.`}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-bold rounded-full border ${getStockBadgeColor(product.stockStatus)} whitespace-nowrap shadow-sm`}>
                                                {product.stockStatus === 'in_stock' && '✅ Disponible'}
                                                {product.stockStatus === 'low_stock' && '⚠️ Últimas Unid.'}
                                                {product.stockStatus === 'out_of_stock' && '❌ Agotado'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end space-x-1">
                                                {/* Action Buttons for quick status toggle */}
                                                <button
                                                    onClick={() => handleStockUpdate(product.id, 'out_of_stock')}
                                                    className={`p-1.5 rounded-lg transition-all ${product.stockStatus === 'out_of_stock' ? 'bg-red-100 text-red-600 ring-2 ring-red-200' : 'text-gray-300 hover:bg-gray-100 hover:text-red-500'}`}
                                                    title="Marcar como Agotado"
                                                >
                                                    <XCircle size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleStockUpdate(product.id, 'low_stock')}
                                                    className={`p-1.5 rounded-lg transition-all ${product.stockStatus === 'low_stock' ? 'bg-amber-100 text-amber-600 ring-2 ring-amber-200' : 'text-gray-300 hover:bg-gray-100 hover:text-amber-500'}`}
                                                    title="Marcar como Últimas Unidades"
                                                >
                                                    <AlertTriangle size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleStockUpdate(product.id, 'in_stock')}
                                                    className={`p-1.5 rounded-lg transition-all ${product.stockStatus === 'in_stock' ? 'bg-emerald-100 text-emerald-600 ring-2 ring-emerald-200' : 'text-gray-300 hover:bg-gray-100 hover:text-emerald-500'}`}
                                                    title="Marcar como Disponible"
                                                >
                                                    <CheckCircle size={18} />
                                                </button>
                                                <div className="h-6 w-px bg-gray-200 mx-3"></div>
                                                <button
                                                    onClick={() => handleEditClick(product)}
                                                    className="bg-premium-dark text-white p-1.5 rounded-lg hover:bg-black transition-all shadow-md hover:shadow-lg flex items-center space-x-1 px-3"
                                                >
                                                    <Edit2 size={14} />
                                                    <span>Editar</span>
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {filteredProducts.length === 0 && !loading && (
                    <div className="mt-8 p-12 text-center bg-white rounded-xl shadow-lg border border-gray-200">
                        {/* Empty state content */}
                        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                            <AlertTriangle size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No se encontraron productos</h3>
                        <p className="text-gray-500">Prueba ajustando tu búsqueda o agrega un nuevo producto.</p>
                    </div>
                )}
            </main>

            {/* Add Product Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                    >
                        <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50 sticky top-0 z-10">
                            <div>
                                <h3 className="text-2xl font-serif font-bold text-gray-900">
                                    {editingId ? 'Editar Producto' : 'Crear Nuevo Producto'}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    Complete la información para {editingId ? 'actualizar' : 'publicar'} el ítem en la tienda.
                                </p>
                            </div>
                            <button onClick={() => { setIsAddModalOpen(false); setEditingId(null); }} className="text-gray-400 hover:text-gray-600 bg-white p-2 rounded-full shadow-sm hover:shadow transition-all">
                                <XCircle size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleAddProduct} className="p-8 space-y-6">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Left Column: Image */}
                                <div className="space-y-4">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Imagen del Producto</label>
                                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-2 hover:border-premium-gold transition-colors bg-gray-50">
                                        <ImageUpload
                                            onImageUploaded={(url) => setNewProduct({ ...newProduct, image: url })}
                                            currentImage={newProduct.image}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-400 text-center">Recomendado: 800x1000px o similar.</p>
                                </div>

                                {/* Right Column: Details */}
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Título / Nombre</label>
                                        <input required type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-premium-gold outline-none transition-shadow"
                                            placeholder="Ej: Lentes Aviador Gold"
                                            value={newProduct.title} onChange={e => setNewProduct({ ...newProduct, title: e.target.value })} />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-1">Precio</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <span className="text-gray-500 font-bold">$</span>
                                                </div>
                                                <input required type="text" className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-premium-gold outline-none transition-shadow"
                                                    placeholder="Ej: 150"
                                                    value={newProduct.price.replace('$', '')}
                                                    onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-1">Cant. en Stock</label>
                                            <div className="relative">
                                                <input
                                                    required={!newProduct.isUnlimitedStock}
                                                    type="number"
                                                    min="0"
                                                    disabled={newProduct.isUnlimitedStock}
                                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-premium-gold outline-none transition-shadow ${newProduct.isUnlimitedStock ? 'bg-gray-100 text-gray-400 border-gray-200' : 'border-gray-300'}`}
                                                    placeholder={newProduct.isUnlimitedStock ? "Ilimitado" : "Ej: 10"}
                                                    value={newProduct.isUnlimitedStock ? '' : newProduct.stockQuantity}
                                                    onChange={e => setNewProduct({ ...newProduct, stockQuantity: parseInt(e.target.value) || 0 })}
                                                />
                                            </div>

                                            <label className="flex items-center mt-2 cursor-pointer group">
                                                <div className="relative">
                                                    <input
                                                        type="checkbox"
                                                        className="sr-only"
                                                        checked={newProduct.isUnlimitedStock || false}
                                                        onChange={e => setNewProduct({ ...newProduct, isUnlimitedStock: e.target.checked })}
                                                    />
                                                    <div className={`block w-8 h-5 rounded-full transition-colors ${newProduct.isUnlimitedStock ? 'bg-premium-gold' : 'bg-gray-300'}`}></div>
                                                    <div className={`dot absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-transform ${newProduct.isUnlimitedStock ? 'transform translate-x-3' : ''}`}></div>
                                                </div>
                                                <span className="ml-2 text-xs text-gray-600 font-medium group-hover:text-premium-dark transition-colors">Stock Ilimitado (Siempre visible)</span>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Removed dropdown stock status, it is now automatic */}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-100">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Categoría General</label>
                                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-premium-gold outline-none bg-white"
                                        value={newProduct.mainCategory} onChange={e => setNewProduct({ ...newProduct, mainCategory: e.target.value })}>
                                        <option value="carteras">👜 Carteras</option>
                                        <option value="billeteras">👛 Billeteras</option>
                                        <option value="lentesSol">🕶️ Lentes</option>
                                        <option value="lentesCristal">👓 Lentes de Cristal</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Subcategoría</label>
                                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-premium-gold outline-none bg-white"
                                        value={newProduct.subCategory} onChange={e => setNewProduct({ ...newProduct, subCategory: e.target.value })}>
                                        <option value="premium">Premium</option>
                                        <option value="plus">Línea Plus</option>
                                        <option value="standard">Estándar</option>
                                        <option value="hombre">Hombre</option>
                                        <option value="mujer">Mujer</option>
                                        <option value="accesorios">Accesorios</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Tag Visual (Badge)</label>
                                    <input required type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-premium-gold outline-none"
                                        placeholder="Ej: Premium, Nuevo..."
                                        value={newProduct.category} onChange={e => setNewProduct({ ...newProduct, category: e.target.value })} />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Descripción</label>
                                <textarea required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-premium-gold outline-none transition-shadow" rows={3}
                                    placeholder="Describe los detalles de lujo, materiales y características..."
                                    value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} />
                            </div>

                            <div className="pt-6 border-t border-gray-100 flex items-center justify-end space-x-4 sticky bottom-0 bg-white pb-2">
                                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-6 py-3 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors">
                                    Cancelar
                                </button>
                                <button type="submit" disabled={loading} className="px-8 py-3 bg-premium-dark text-white rounded-lg font-bold hover:bg-black transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center">
                                    {loading ? <Loader2 className="animate-spin mr-2" /> : (editingId ? 'Guardar Cambios' : 'Publicar Producto')}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
