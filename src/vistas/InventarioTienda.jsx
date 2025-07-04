import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from '../components/BarraProductos';
import { Store, Package, Boxes, Edit, Save, XCircle, PlusCircle, Trash2 } from 'lucide-react';

export default function InventarioTienda() {
  const [storeInventory, setStoreInventory] = useState([
    { id: 1, product: 'Vino Tinto Gran Reserva', sku: 'VTGR001', stock: 50, location: 'Bodega 1' },
    { id: 2, product: 'Crema de Whisky Clásica', sku: 'CWC002', stock: 120, location: 'Estante A' },
    { id: 3, product: 'Mistela Tradicional', sku: 'MT003', stock: 80, location: 'Exhibidor' },
    { id: 4, product: 'Zumo Uva Premium', sku: 'ZUP004', stock: 150, location: 'Refrigerador' },
    { id: 5, product: 'Licor de Café', sku: 'LC005', stock: 70, location: 'Barra' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newProduct, setNewProduct] = useState({ product: '', sku: '', stock: '', location: '' });
  const [editedProduct, setEditedProduct] = useState({});

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setNewProduct({ product: '', sku: '', stock: '', location: '' });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddProduct = () => {
    const id = storeInventory.length > 0 ? Math.max(...storeInventory.map(p => p.id)) + 1 : 1;
    setStoreInventory([...storeInventory, { id, ...newProduct, stock: parseInt(newProduct.stock) }]);
    handleCloseModal();
    alert('Producto añadido al inventario (simulado).');
  };

  const handleEditClick = (product) => {
    setEditingId(product.id);
    setEditedProduct({ ...product });
  };

  const handleSaveEdit = (id) => {
    setStoreInventory(storeInventory.map(product =>
      product.id === id ? { ...editedProduct, stock: parseInt(editedProduct.stock) } : product
    ));
    setEditingId(null);
    setEditedProduct({});
    alert('Inventario actualizado (simulado).');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedProduct({});
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto del inventario?')) {
      setStoreInventory(storeInventory.filter(product => product.id !== id));
      alert('Producto eliminado del inventario (simulado).');
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      <BarraProductos />
      <main
        className="flex-grow flex flex-col items-center w-full py-8 px-4 sm:px-8 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/img/Viñedo.jpg')" }}
      >
        <div className="max-w-6xl mx-auto w-full bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">Inventario de Tienda</h2>
          <p className="text-gray-600 mb-6 text-center flex items-center justify-center">
            <Store className="w-5 h-5 mr-2 text-red-600" />
            Inventario de: **Tienda Central Popayán**
          </p>

          <button
            onClick={handleOpenModal} // Ahora abre el modal
            className="mb-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md flex items-center space-x-2 transition-colors"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Añadir Nuevo Producto</span>
          </button>

          {isModalOpen && (
            <div className="fixed inset-0 flex justify-center items-center z-50">
              <div className="absolute inset-0 bg-gray-500/20 backdrop-blur-sm"></div>

              <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md mx-4 relative z-10">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Añadir Nuevo Producto</h3>
                <div className="grid grid-cols-1 gap-4 mb-6">
                  <div className="flex flex-col">
                    <label htmlFor="product" className="text-sm font-medium text-gray-700 mb-1">Nombre Producto</label>
                    <input
                      id="product"
                      type="text"
                      placeholder="Nombre Producto"
                      value={newProduct.product}
                      onChange={(e) => setNewProduct({ ...newProduct, product: e.target.value })}
                      className="p-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="sku" className="text-sm font-medium text-gray-700 mb-1">SKU</label>
                    <input
                      id="sku"
                      type="text"
                      placeholder="SKU"
                      value={newProduct.sku}
                      onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                      className="p-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="stock" className="text-sm font-medium text-gray-700 mb-1">Stock</label>
                    <input
                      id="stock"
                      type="number"
                      placeholder="Stock"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                      className="p-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="location" className="text-sm font-medium text-gray-700 mb-1">Ubicación</label>
                    <input
                      id="location"
                      type="text"
                      placeholder="Ubicación"
                      value={newProduct.location}
                      onChange={(e) => setNewProduct({ ...newProduct, location: e.target.value })}
                      className="p-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4 mt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 text-gray-800 flex items-center space-x-1"
                  >
                    <XCircle size={18} /> <span>Cancelar</span>
                  </button>
                  <button
                    onClick={handleAddProduct}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors flex items-center space-x-1"
                  >
                    <Save size={18} /> <span>Guardar Producto</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {storeInventory.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">ID</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Producto</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">SKU</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Stock</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Ubicación</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {storeInventory.map(product => (
                    <tr key={product.id} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50 text-gray-600">

                      <td className="py-3 px-4">{product.id}</td>

                      <td className="py-3 px-4">
                        {editingId === product.id ? (
                          <input type="text" value={editedProduct.product} onChange={(e) => setEditedProduct({ ...editedProduct, product: e.target.value })} className="p-1 border rounded-md w-full" />
                        ) : (
                          <span className="flex items-center space-x-2"><Package className="w-4 h-4 text-gray-500" /><span>{product.product}</span></span>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        {editingId === product.id ? (
                          <input type="text" value={editedProduct.sku} onChange={(e) => setEditedProduct({ ...editedProduct, sku: e.target.value })} className="p-1 border rounded-md w-full" />
                        ) : (
                          <span>{product.sku}</span>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        {editingId === product.id ? (
                          <input type="number" value={editedProduct.stock} onChange={(e) => setEditedProduct({ ...editedProduct, stock: e.target.value })} className="p-1 border rounded-md w-full" />
                        ) : (
                          <span className="flex items-center space-x-2"><Boxes className="w-4 h-4 text-gray-500" /><span>{product.stock}</span></span>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        {editingId === product.id ? (
                          <input type="text" value={editedProduct.location} onChange={(e) => setEditedProduct({ ...editedProduct, location: e.target.value })} className="p-1 border rounded-md w-full" />
                        ) : (
                          <span>{product.location}</span>
                        )}
                      </td>

                      <td className="py-3 px-4 flex space-x-2">
                        {editingId === product.id ? (
                          <>
                            <button onClick={() => handleSaveEdit(product.id)} className="text-green-600 hover:text-green-800"><Save className="w-5 h-5" /></button>
                            <button onClick={handleCancelEdit} className="text-red-600 hover:text-red-800"><XCircle className="w-5 h-5" /></button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => handleEditClick(product)} className="text-red-600 hover:text-red-800"><Edit className="w-5 h-5" /></button>
                            <button onClick={() => handleDeleteProduct(product.id)} className="text-red-600 hover:text-red-800"><Trash2 className="w-5 h-5" /></button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-8">No hay productos en este inventario de tienda.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}