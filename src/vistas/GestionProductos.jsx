import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";
import { PlusCircle, Edit, Trash2, Save, XCircle, Package, Tag, DollarSign, Archive } from 'lucide-react'; // Added more relevant icons

export default function GestionProductos() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    // Simulate fetching products and categories
    const simulatedProducts = [
      { id: 'PROD001', name: 'Vino Tinto Reserva', category: 'Vinos', price: 15.99, stock: 120, description: 'Un vino elegante y con cuerpo.' },
      { id: 'PROD002', name: 'Crema de Whisky Clásica', category: 'Cremas Whisky', price: 22.50, stock: 75, description: 'Suave crema irlandesa.' },
      { id: 'PROD003', name: 'Mistela Artesanal Dulce', category: 'Mistelas', price: 9.90, stock: 200, description: 'Licor tradicional de uva.' },
      { id: 'PROD004', name: 'Zumo de Uva Natural', category: 'Zumo', price: 4.00, stock: 300, description: 'Zumo 100% natural.' },
      { id: 'PROD005', name: 'Sacacorchos Premium', category: 'Accesorios', price: 7.25, stock: 150, description: 'Sacacorchos de alta calidad.' },
    ];
    const simulatedCategories = ['Vinos', 'Cremas Whisky', 'Mistelas', 'Zumo', 'Accesorios', 'Licores'];

    setProducts(simulatedProducts);
    setCategories(simulatedCategories);
  }, []);

  const validateForm = (data) => {
    const errors = {};
    if (!data.name || data.name.trim() === '') errors.name = 'El nombre es obligatorio.';
    if (!data.category || data.category.trim() === '') errors.category = 'La categoría es obligatoria.';
    if (isNaN(parseFloat(data.price)) || parseFloat(data.price) <= 0) errors.price = 'El precio debe ser un número positivo.';
    if (isNaN(parseInt(data.stock)) || parseInt(data.stock) < 0) errors.stock = 'El stock debe ser un número no negativo.';
    return errors;
  };

  const handleCreateNew = () => {
    setCurrentProduct({ id: '', name: '', category: '', price: '', stock: '', description: '' });
    setIsModalOpen(true);
    setFormErrors({});
  };

  const handleEdit = (product) => {
    setCurrentProduct({ ...product });
    setIsModalOpen(true);
    setFormErrors({});
  };

  const handleDelete = (productId) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar el producto con ID: ${productId}?`)) {
      setProducts(products.filter(product => product.id !== productId));
      alert('Producto eliminado (simulado).');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(currentProduct);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (currentProduct.id) {
      // Update existing product
      setProducts(products.map(product =>
        product.id === currentProduct.id ? { ...currentProduct, price: parseFloat(currentProduct.price), stock: parseInt(currentProduct.stock) } : product
      ));
      alert('Producto actualizado (simulado).');
    } else {
      // Create new product
      const newId = `PROD${String(products.length + 1).padStart(3, '0')}`;
      setProducts([...products, { ...currentProduct, id: newId, price: parseFloat(currentProduct.price), stock: parseInt(currentProduct.stock) }]);
      alert('Nuevo producto creado (simulado).');
    }
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct(prev => ({ ...prev, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: undefined }));
  };

  return (
    <>
      <div className="page-container">
        <Header />
        <BarraProductos />
        <main className="bg-vistas-home min-h-screen py-8 px-4 sm:px-8">
          <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-10">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">Gestión de Categorías y Productos</h1>
            <p className="text-center text-gray-600 text-lg mb-8">
              Crea, actualiza y organiza tus productos y sus categorías.
            </p>

            <div className="flex justify-end mb-6">
              <button
                onClick={handleCreateNew}
                className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-md shadow-md transition-colors duration-200 flex items-center space-x-2"
              >
                <PlusCircle size={20} />
                <span>Nuevo Producto</span>
              </button>
            </div>

            {products.length > 0 ? (
              <div className="overflow-x-auto rounded-lg shadow-md">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-100 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Nombre</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Categoría</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Precio</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Stock</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{product.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{product.category}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${product.price.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{product.stock}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-center space-x-3">
                            <button
                              onClick={() => handleEdit(product)}
                              className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                              title="Editar"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="text-red-600 hover:text-red-900 transition-colors duration-200"
                              title="Eliminar"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-gray-500 mt-8">No hay productos registrados.</p>
            )}

            {/* Modal para Crear/Editar Producto */}
            {isModalOpen && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
                <div className="relative p-8 bg-white w-full max-w-lg mx-auto rounded-lg shadow-xl">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    {currentProduct.id ? 'Editar Producto' : 'Crear Nuevo Producto'}
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nombre:</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={currentProduct?.name || ''}
                          onChange={handleChange}
                          className={`shadow appearance-none border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                        />
                        {formErrors.name && <p className="text-red-500 text-xs italic mt-1">{formErrors.name}</p>}
                      </div>
                      <div>
                        <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Categoría:</label>
                        <select
                          id="category"
                          name="category"
                          value={currentProduct?.category || ''}
                          onChange={handleChange}
                          className={`shadow appearance-none border ${formErrors.category ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                        >
                          <option value="">Selecciona una categoría</option>
                          {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                        {formErrors.category && <p className="text-red-500 text-xs italic mt-1">{formErrors.category}</p>}
                      </div>
                      <div>
                        <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Precio:</label>
                        <input
                          type="number"
                          id="price"
                          name="price"
                          value={currentProduct?.price || ''}
                          onChange={handleChange}
                          step="0.01"
                          className={`shadow appearance-none border ${formErrors.price ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                        />
                        {formErrors.price && <p className="text-red-500 text-xs italic mt-1">{formErrors.price}</p>}
                      </div>
                      <div>
                        <label htmlFor="stock" className="block text-gray-700 text-sm font-bold mb-2">Stock:</label>
                        <input
                          type="number"
                          id="stock"
                          name="stock"
                          value={currentProduct?.stock || ''}
                          onChange={handleChange}
                          className={`shadow appearance-none border ${formErrors.stock ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                        />
                        {formErrors.stock && <p className="text-red-500 text-xs italic mt-1">{formErrors.stock}</p>}
                      </div>
                    </div>
                    <div className="mb-6">
                      <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Descripción:</label>
                      <textarea
                        id="description"
                        name="description"
                        value={currentProduct?.description || ''}
                        onChange={handleChange}
                        rows="3"
                        className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      ></textarea>
                    </div>
                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md flex items-center space-x-2 transition-colors duration-200"
                      >
                        <XCircle size={20} />
                        <span>Cancelar</span>
                      </button>
                      <button
                        type="submit"
                        className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-md flex items-center space-x-2 transition-colors duration-200"
                      >
                        <Save size={20} />
                        <span>{currentProduct.id ? 'Guardar Cambios' : 'Crear'}</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}