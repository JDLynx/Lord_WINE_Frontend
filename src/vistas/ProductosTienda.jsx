import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from '../components/BarraProductos';
import { Package, Tag, Boxes, Edit, Save, XCircle, PlusCircle, Trash2 } from 'lucide-react';

export default function ProductosTienda() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Vino Tinto Reserva', category: 'Vinos', price: 75.00, stock: 50 },
    { id: 2, name: 'Cremas de Whisky Irlandesa', category: 'Cremas y Licores', price: 45.00, stock: 120 },
    { id: 3, name: 'Mistela Casera', category: 'Mistelas', price: 30.00, stock: 80 },
    { id: 4, name: 'Zumo de Uva Natural', category: 'Zumos', price: 15.00, stock: 150 },
    { id: 5, name: 'Set de Copas de Vino', category: 'Accesorios', price: 50.00, stock: 30 },
    { id: 6, name: 'Champagne Brut', category: 'Vinos', price: 120.00, stock: 25 },
  ]);

  const [editingId, setEditingId] = useState(null); // Estado para la ID del producto en edición
  const [editedProduct, setEditedProduct] = useState({}); // Estado para guardar los datos del producto editado
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la visibilidad del modal de añadir
  const [newProduct, setNewProduct] = useState({ name: '', category: '', price: '', stock: '' }); // Estado para el nuevo producto

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setNewProduct({ name: '', category: '', price: '', stock: '' });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddProduct = () => {
    const id = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    setProducts([...products, {
      id,
      name: newProduct.name,
      category: newProduct.category,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock)
    }]);
    handleCloseModal();
    alert('Producto añadido a la tienda (simulado).');
  };

  const handleEditClick = (product) => {
    setEditingId(product.id);
    setEditedProduct({ ...product });
  };

  const handleSaveEdit = (id) => {
    setProducts(products.map(product =>
      product.id === id ? {
        ...editedProduct,
        price: parseFloat(editedProduct.price),
        stock: parseInt(editedProduct.stock)
      } : product
    ));
    setEditingId(null);
    setEditedProduct({});
    alert(`Producto ${id} actualizado (simulado).`);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedProduct({});
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto de la tienda?')) {
      setProducts(products.filter(product => product.id !== id));
      alert('Producto eliminado de la tienda (simulado).');
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
          <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">Productos Disponibles en Tienda</h2>

          <button
            onClick={handleOpenModal}
            className="mb-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md flex items-center space-x-2 transition-colors"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Añadir Nuevo Producto</span>
          </button>

          {/* Modal de Añadir Nuevo Producto */}
          {isModalOpen && (
            <div className="fixed inset-0 flex justify-center items-center z-50">
              <div className="absolute inset-0 bg-gray-500/20 backdrop-blur-sm"></div>

              <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md mx-4 relative z-10">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Añadir Nuevo Producto</h3>
                <div className="grid grid-cols-1 gap-4 mb-6">
                  <div className="flex flex-col">
                    <label htmlFor="productName" className="text-sm font-medium text-gray-700 mb-1">Nombre Producto</label>
                    <input
                      id="productName"
                      type="text"
                      placeholder="Nombre Producto"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="p-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="productCategory" className="text-sm font-medium text-gray-700 mb-1">Categoría</label>
                    <input
                      id="productCategory"
                      type="text"
                      placeholder="Categoría"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      className="p-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="productPrice" className="text-sm font-medium text-gray-700 mb-1">Precio</label>
                    <input
                      id="productPrice"
                      type="number"
                      step="0.01" // Permite decimales para el precio
                      placeholder="Precio"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      className="p-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="productStock" className="text-sm font-medium text-gray-700 mb-1">Stock</label>
                    <input
                      id="productStock"
                      type="number"
                      placeholder="Stock"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
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

          {products.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">ID</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Nombre</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Categoría</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Precio</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Stock</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50 text-gray-600">
                      <td className="py-3 px-4">{product.id}</td>

                      <td className="py-3 px-4">
                        {editingId === product.id ? (
                          <input type="text" value={editedProduct.name} onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })} className="p-1 border rounded-md w-full" />
                        ) : (
                          <span className="flex items-center space-x-2"><Package className="w-4 h-4 text-gray-500" /><span>{product.name}</span></span>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        {editingId === product.id ? (
                          <input type="text" value={editedProduct.category} onChange={(e) => setEditedProduct({ ...editedProduct, category: e.target.value })} className="p-1 border rounded-md w-full" />
                        ) : (
                          <span className="flex items-center space-x-2"><Tag className="w-4 h-4 text-gray-500" /><span>{product.category}</span></span>
                        )}
                      </td>

                      {/* Celda para Precio (editable) */}
                      <td className="py-3 px-4">
                        {editingId === product.id ? (
                          <input type="number" step="0.01" value={editedProduct.price} onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })} className="p-1 border rounded-md w-full" />
                        ) : (
                          <span>${product.price.toFixed(2)}</span>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        {editingId === product.id ? (
                          <input type="number" value={editedProduct.stock} onChange={(e) => setEditedProduct({ ...editedProduct, stock: e.target.value })} className="p-1 border rounded-md w-full" />
                        ) : (
                          <span className="flex items-center space-x-2"><Boxes className="w-4 h-4 text-gray-500" /><span>{product.stock}</span></span>
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
            <p className="text-center text-gray-500 mt-8">No hay productos disponibles en esta tienda.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}