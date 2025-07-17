import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from '../components/BarraProductos';
import { PlusCircle, Edit, Trash2, Save, XCircle } from 'lucide-react';

export default function GestionProductos() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);

  const API_URL = 'http://localhost:3000/api';

  const showNotification = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000);
  };

  useEffect(() => {
    fetch(`${API_URL}/productos`)
      .then(res => res.json())
      .then(setProducts)
      .catch(err => {
        console.error('Error al cargar productos:', err);
        showNotification('Error al cargar productos.', 'error');
      });

    fetch(`${API_URL}/categorias`)
      .then(res => res.json())
      .then(setCategories)
      .catch(err => {
        console.error('Error al cargar categorías:', err);
        showNotification('Error al cargar categorías.', 'error');
      });

    fetch(`${API_URL}/administradores`)
      .then(res => res.json())
      .then(setAdmins)
      .catch(err => {
        console.error('Error al cargar administradores:', err);
        showNotification('Error al cargar administradores.', 'error');
      });
  }, []);

  const validateForm = (data) => {
    const errors = {};
    if (!data.prodNombre?.trim()) errors.prodNombre = 'El nombre es obligatorio.';
    if (!data.categIdCategoria) errors.categIdCategoria = 'Debe seleccionar una categoría.';
    if (!data.prodPrecio || parseFloat(data.prodPrecio) <= 0) errors.prodPrecio = 'El precio debe ser mayor a 0.';
    if (!data.prodDescripcion?.trim()) errors.prodDescripcion = 'La descripción es obligatoria.';
    if (!data.adminCodAdministrador) errors.adminCodAdministrador = 'Administrador no asignado.';
    return errors;
  };

  const handleCreateNew = () => {
    setCurrentProduct({
      prodNombre: '',
      categIdCategoria: '',
      prodPrecio: '',
      prodDescripcion: '',
      adminCodAdministrador: ''
    });
    setIsModalOpen(true);
    setFormErrors({});
  };

  const handleEdit = (product) => {
    setCurrentProduct({ ...product });
    setIsModalOpen(true);
    setFormErrors({});
  };

  const handleDelete = (id) => {
    setProductIdToDelete(id);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    try {
      await fetch(`${API_URL}/productos/${productIdToDelete}`, { method: 'DELETE' });
      setProducts(products.filter(p => p.prodIdProducto !== productIdToDelete));
      showNotification('Producto eliminado correctamente.', 'success');
    } catch (err) {
      console.error(err);
      showNotification('Error al eliminar el producto.', 'error');
    } finally {
      setShowConfirmModal(false);
      setProductIdToDelete(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(currentProduct);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      if (currentProduct.prodIdProducto) {
        const res = await fetch(`${API_URL}/productos/${currentProduct.prodIdProducto}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(currentProduct),
        });
        const data = await res.json();
        setProducts(products.map(p => (p.prodIdProducto === data.producto.prodIdProducto ? data.producto : p)));
        showNotification('Producto actualizado correctamente.', 'success');
      } else {
        const res = await fetch(`${API_URL}/productos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(currentProduct),
        });
        const data = await res.json();
        setProducts([...products, data.producto]);
        showNotification('Producto creado correctamente.', 'success');
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      showNotification('Error al guardar el producto.', 'error');
    }
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) {
      setCategoryError('El nombre de la categoría es obligatorio.');
      return;
    }
    try {
      const res = await fetch(`${API_URL}/categorias`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ catNombre: newCategoryName }),
      });
      const data = await res.json();
      setCategories([...categories, data.categoria]);
      setNewCategoryName('');
      setShowCategoryModal(false);
      showNotification('Categoría creada correctamente.', 'success');
    } catch (err) {
      console.error(err);
      showNotification('Error al crear la categoría.', 'error');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct(prev => ({ ...prev, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const getCategoryName = (id) => {
    const cat = categories.find(c => c.categIdCategoria === id);
    return cat ? cat.catNombre : 'Desconocida';
  };

  const filteredProducts = products.filter(p =>
    Object.entries(p).some(([key, value]) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    ) ||
    getCategoryName(p.categIdCategoria).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      <Header />
      <BarraProductos />

      {message && (
        <div className={`fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 transition-opacity duration-300 ${
          messageType === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {message}
        </div>
      )}

      <main className="bg-vistas-home min-h-screen py-8 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-10">
          <h1 className="text-2xl font-semibold text-black mb-2 text-center">Gestión de Categorías y Productos</h1>
          <p className="text-justify text-black mb-8 text-xl">
            Gestión de los productos y sus categorías: crear nuevos productos y categorías, editar su información y eliminar registros existentes.
          </p><div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <input
              type="text"
              placeholder="Buscar"
              className="w-full sm:max-w-xs border border-gray-300 rounded px-4 py-2 text-black text-xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex space-x-4 mt-4 sm:mt-0">
              <button
                onClick={handleCreateNew}
                className="bg-[#801010] hover:bg-[#921913] text-white font-semibold py-2 px-4 rounded-md shadow-md flex items-center space-x-2 text-xl"
              >
                <PlusCircle size={20} />
                <span>Nuevo Producto</span>
              </button>
              <button
                onClick={() => setShowCategoryModal(true)}
                className="bg-[#801010] hover:bg-[#921913] text-white font-semibold py-2 px-4 rounded-md shadow-md flex items-center space-x-2 text-xl"
              >
                <PlusCircle size={20} />
                <span>Nueva Categoría</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto max-h-[500px] overflow-y-auto rounded-lg border border-gray-200">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 text-left text-lg font-medium text-black">ID</th>
                  <th className="px-6 py-3 text-left text-lg font-medium text-black">Nombre</th>
                  <th className="px-6 py-3 text-left text-lg font-medium text-black">Categoría</th>
                  <th className="px-6 py-3 text-left text-lg font-medium text-black">Precio</th>
                  <th className="px-6 py-3 text-left text-lg font-medium text-black">Descripción</th>
                  <th className="px-6 py-3 text-center text-lg font-medium text-black">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map(product => (
                  <tr key={product.prodIdProducto} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-base text-left text-black">{product.prodIdProducto}</td>
                    <td className="px-6 py-4 text-base text-left text-black">{product.prodNombre}</td>
                    <td className="px-6 py-4 text-base text-left text-black">{getCategoryName(product.categIdCategoria)}</td>
                    <td className="px-6 py-4 text-base text-left text-black">${parseFloat(product.prodPrecio).toFixed(2)}</td>
                    <td className="px-6 py-4 text-base text-left text-black">{product.prodDescripcion}</td>
                    <td className="px-6 py-4 text-base text-center">
                      <div className="flex justify-center space-x-3">
                        <button onClick={() => handleEdit(product)} className="text-blue-900 hover:text-blue-600">
                          <Edit size={18} />
                        </button>
                        <button onClick={() => handleDelete(product.prodIdProducto)} className="text-red-900 hover:text-red-600">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 flex justify-center items-center z-50">
              <div className="absolute inset-0 bg-gray-500/20 backdrop-blur-sm"></div>
              <div className="relative p-8 bg-white w-full max-w-lg mx-auto rounded-lg shadow-xl z-10">
                <h2 className="text-xl font-bold text-black mb-6 text-center">
                  {currentProduct.prodIdProducto ? 'Editar Producto' : 'Crear Nuevo Producto'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input type="text" name="prodNombre" placeholder="Nombre" value={currentProduct.prodNombre}
                    onChange={handleChange} className="w-full border px-3 py-2 rounded text-black" />
                  {formErrors.prodNombre && <p className="text-red-500 text-sm">{formErrors.prodNombre}</p>}

                  <select name="categIdCategoria" value={currentProduct.categIdCategoria}
                    onChange={handleChange} className="w-full border px-3 py-2 rounded text-black bg-white">
                    <option value="">Seleccione una categoría</option>
                    {categories.map(cat => (
                      <option key={cat.categIdCategoria} value={cat.categIdCategoria}>{cat.catNombre}</option>
                    ))}
                  </select>
                  {formErrors.categIdCategoria && <p className="text-red-500 text-sm">{formErrors.categIdCategoria}</p>}

                  <input type="number" name="prodPrecio" placeholder="Precio" value={currentProduct.prodPrecio}
                    onChange={handleChange} className="w-full border px-3 py-2 rounded text-black" />
                  {formErrors.prodPrecio && <p className="text-red-500 text-sm">{formErrors.prodPrecio}</p>}

                  <textarea name="prodDescripcion" placeholder="Descripción" value={currentProduct.prodDescripcion}
                    onChange={handleChange} className="w-full border px-3 py-2 rounded text-black" />
                  {formErrors.prodDescripcion && <p className="text-red-500 text-sm">{formErrors.prodDescripcion}</p>}

                  <select name="adminCodAdministrador" value={currentProduct.adminCodAdministrador}
                    onChange={handleChange} className="w-full border px-3 py-2 rounded text-black bg-white">
                    <option value="">Seleccione un administrador</option>
                    {admins.map(admin => (
                      <option key={admin.adminCodAdministrador} value={admin.adminCodAdministrador}>
                        {admin.adminNombre}
                      </option>
                    ))}
                  </select>
                  {formErrors.adminCodAdministrador && <p className="text-red-500 text-sm">{formErrors.adminCodAdministrador}</p>}

                  <div className="flex justify-end space-x-3">
                    <button type="button" onClick={() => setIsModalOpen(false)}
                      className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-md flex items-center space-x-2">
                      <XCircle size={20} />
                      <span>Cancelar</span>
                    </button>
                    <button type="submit" className="bg-[#801010] hover:bg-[#921913] text-white font-bold py-2 px-4 rounded-md flex items-center space-x-2">
                      <Save size={20} />
                      <span>{currentProduct.prodIdProducto ? 'Guardar' : 'Crear'}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {showCategoryModal && (
            <div className="fixed inset-0 flex justify-center items-center z-50">
              <div className="absolute inset-0 bg-gray-500/20 backdrop-blur-sm"></div>
              <div className="relative p-8 bg-white w-full max-w-md mx-auto rounded-lg shadow-xl z-10">
                <h2 className="text-xl font-bold text-black mb-6 text-center">Crear Nueva Categoría</h2>
                <form onSubmit={handleCategorySubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Nombre de la categoría"
                    value={newCategoryName}
                    onChange={(e) => { setNewCategoryName(e.target.value); setCategoryError(''); }}
                    className="w-full border px-3 py-2 rounded text-black"
                  />
                  {categoryError && <p className="text-red-500 text-sm">{categoryError}</p>}

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => { setShowCategoryModal(false); setNewCategoryName(''); setCategoryError(''); }}
                      className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-md flex items-center space-x-2"
                    >
                      <XCircle size={20} />
                      <span>Cancelar</span>
                    </button>
                    <button
                      type="submit"
                      className="bg-[#801010] hover:bg-[#921913] text-white font-bold py-2 px-4 rounded-md flex items-center space-x-2"
                    >
                      <Save size={20} />
                      <span>Crear</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {showConfirmModal && (
            <div className="fixed inset-0 flex justify-center items-center z-50">
              <div className="absolute inset-0 bg-gray-500/20 backdrop-blur-sm"></div>
              <div className="relative p-8 bg-white w-full max-w-sm mx-auto rounded-lg shadow-xl z-10">
                <h2 className="text-xl font-bold text-black mb-6 text-center">Confirmar Eliminación</h2>
                <p className="text-black text-center mb-6">¿Estás seguro de que quieres eliminar este producto?</p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => { setShowConfirmModal(false); setProductIdToDelete(null); }}
                    className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-md flex items-center space-x-2"
                  >
                    <XCircle size={20} />
                    <span>Cancelar</span>
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="bg-[#921913] hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md flex items-center space-x-2"
                  >
                    <Trash2 size={20} />
                    <span>Eliminar</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}