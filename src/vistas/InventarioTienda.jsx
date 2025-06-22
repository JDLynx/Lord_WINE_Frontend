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
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newProduct, setNewProduct] = useState({ product: '', sku: '', stock: '', location: '' });
  const [editedProduct, setEditedProduct] = useState({});

  const handleAddProduct = () => {
    const id = storeInventory.length > 0 ? Math.max(...storeInventory.map(p => p.id)) + 1 : 1;
    setStoreInventory([...storeInventory, { id, ...newProduct, stock: parseInt(newProduct.stock) }]);
    setNewProduct({ product: '', sku: '', stock: '', location: '' });
    setIsAdding(false);
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
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Inventario de Tienda</h2>
          <p className="text-gray-600 mb-6 text-center flex items-center justify-center">
            <Store className="w-5 h-5 mr-2" />
            Inventario de: **Tienda Central Popayán**
          </p>

          <button
            onClick={() => setIsAdding(!isAdding)}
            className="mb-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md flex items-center space-x-2 transition-colors"
          >
            <PlusCircle className="w-5 h-5" />
            <span>{isAdding ? 'Cancelar' : 'Añadir Nuevo Producto'}</span>
          </button>

          {isAdding && (
            <div className="bg-blue-50 p-6 rounded-md mb-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Añadir Producto</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input type="text" placeholder="Nombre Producto" value={newProduct.product} onChange={(e) => setNewProduct({ ...newProduct, product: e.target.value })} className="p-2 border rounded-md" />
                <input type="text" placeholder="SKU" value={newProduct.sku} onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })} className="p-2 border rounded-md" />
                <input type="number" placeholder="Stock" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} className="p-2 border rounded-md" />
                <input type="text" placeholder="Ubicación" value={newProduct.location} onChange={(e) => setNewProduct({ ...newProduct, location: e.target.value })} className="p-2 border rounded-md" />
              </div>
              <button onClick={handleAddProduct} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors">
                Guardar Producto
              </button>
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
                    <tr key={product.id} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50">
                      {editingId === product.id ? (
                        <>
                          <td className="py-3 px-4">{product.id}</td>
                          <td className="py-3 px-4"><input type="text" value={editedProduct.product} onChange={(e) => setEditedProduct({ ...editedProduct, product: e.target.value })} className="p-1 border rounded-md w-full" /></td>
                          <td className="py-3 px-4"><input type="text" value={editedProduct.sku} onChange={(e) => setEditedProduct({ ...editedProduct, sku: e.target.value })} className="p-1 border rounded-md w-full" /></td>
                          <td className="py-3 px-4"><input type="number" value={editedProduct.stock} onChange={(e) => setEditedProduct({ ...editedProduct, stock: e.target.value })} className="p-1 border rounded-md w-full" /></td>
                          <td className="py-3 px-4"><input type="text" value={editedProduct.location} onChange={(e) => setEditedProduct({ ...editedProduct, location: e.target.value })} className="p-1 border rounded-md w-full" /></td>
                          <td className="py-3 px-4 flex space-x-2">
                            <button onClick={() => handleSaveEdit(product.id)} className="text-green-600 hover:text-green-800"><Save className="w-5 h-5" /></button>
                            <button onClick={handleCancelEdit} className="text-red-600 hover:text-red-800"><XCircle className="w-5 h-5" /></button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="py-3 px-4">{product.id}</td>
                          <td className="py-3 px-4 flex items-center space-x-2"><Package className="w-4 h-4 text-gray-500" /><span>{product.product}</span></td>
                          <td className="py-3 px-4">{product.sku}</td>
                          <td className="py-3 px-4 flex items-center space-x-2"><Boxes className="w-4 h-4 text-gray-500" /><span>{product.stock}</span></td>
                          <td className="py-3 px-4">{product.location}</td>
                          <td className="py-3 px-4 flex space-x-2">
                            <button onClick={() => handleEditClick(product)} className="text-blue-600 hover:text-blue-800"><Edit className="w-5 h-5" /></button>
                            <button onClick={() => handleDeleteProduct(product.id)} className="text-red-600 hover:text-red-800"><Trash2 className="w-5 h-5" /></button>
                          </td>
                        </>
                      )}
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
