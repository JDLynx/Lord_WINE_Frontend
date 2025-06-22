import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";
import { PlusCircle, Edit, Trash2, Save, XCircle, Store, MapPin, Phone } from 'lucide-react';

export default function GestionTiendas() {
  const [tiendas, setTiendas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTienda, setCurrentTienda] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    // Simular carga de datos
    const simulatedData = [
      { id: 'TIEN001', nombre: 'Tienda Centro', direccion: 'Calle Falsa 123, Popayán', telefono: '555-1234' },
      { id: 'TIEN002', nombre: 'Tienda Norte', direccion: 'Av. Siempre Viva 456, Popayán', telefono: '555-5678' },
      { id: 'TIEN003', nombre: 'Tienda Sur', direccion: 'Carrera 10 #20-30, Popayán', telefono: '555-9012' },
    ];
    setTiendas(simulatedData);
  }, []);

  const validateForm = (data) => {
    const errors = {};
    if (!data.nombre || data.nombre.trim() === '') errors.nombre = 'El nombre es obligatorio.';
    if (!data.direccion || data.direccion.trim() === '') errors.direccion = 'La dirección es obligatoria.';
    if (!data.telefono || data.telefono.trim() === '') {
      errors.telefono = 'El teléfono es obligatorio.';
    } else if (!/^\d{7,10}$/.test(data.telefono)) { // Basic phone validation
      errors.telefono = 'El formato del teléfono es inválido (7-10 dígitos).';
    }
    return errors;
  };

  const handleCreateNew = () => {
    setCurrentTienda({ id: '', nombre: '', direccion: '', telefono: '' });
    setIsModalOpen(true);
    setFormErrors({});
  };

  const handleEdit = (tienda) => {
    setCurrentTienda({ ...tienda });
    setIsModalOpen(true);
    setFormErrors({});
  };

  const handleDelete = (tiendaId) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar la tienda con ID: ${tiendaId}?`)) {
      setTiendas(tiendas.filter(tienda => tienda.id !== tiendaId));
      alert('Tienda eliminada (simulada).');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(currentTienda);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (currentTienda.id) {
      // Actualizar existente
      setTiendas(tiendas.map(tienda =>
        tienda.id === currentTienda.id ? currentTienda : tienda
      ));
      alert('Tienda actualizada (simulada).');
    } else {
      // Crear nueva
      const newId = `TIEN${String(tiendas.length + 1).padStart(3, '0')}`;
      setTiendas([...tiendas, { ...currentTienda, id: newId }]);
      alert('Nueva tienda creada (simulada).');
    }
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentTienda(prev => ({ ...prev, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: undefined }));
  };

  return (
    <>
      <div className="page-container">
        <Header />
        <BarraProductos />
        <main className="bg-vistas-home min-h-screen py-8 px-4 sm:px-8">
          <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-10">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">Gestión de Tiendas Físicas</h1>
            <p className="text-center text-gray-600 text-lg mb-8">
              Crea, administra y visualiza tus tiendas físicas.
            </p>

            <div className="flex justify-end mb-6">
              <button
                onClick={handleCreateNew}
                className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-md shadow-md transition-colors duration-200 flex items-center space-x-2"
              >
                <PlusCircle size={20} />
                <span>Nueva Tienda</span>
              </button>
            </div>

            {tiendas.length > 0 ? (
              <div className="overflow-x-auto rounded-lg shadow-md">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-100 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Nombre</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Dirección</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Teléfono</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {tiendas.map((tienda) => (
                      <tr key={tienda.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{tienda.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{tienda.nombre}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{tienda.direccion}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{tienda.telefono}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-center space-x-3">
                            <button
                              onClick={() => handleEdit(tienda)}
                              className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                              title="Editar"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(tienda.id)}
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
              <p className="text-center text-gray-500 mt-8">No hay tiendas registradas.</p>
            )}

            {/* Modal para Crear/Editar Tienda */}
            {isModalOpen && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
                <div className="relative p-8 bg-white w-full max-w-md mx-auto rounded-lg shadow-xl">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    {currentTienda.id ? 'Editar Tienda' : 'Crear Nueva Tienda'}
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="nombre" className="block text-gray-700 text-sm font-bold mb-2">Nombre:</label>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={currentTienda?.nombre || ''}
                        onChange={handleChange}
                        className={`shadow appearance-none border ${formErrors.nombre ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                      />
                      {formErrors.nombre && <p className="text-red-500 text-xs italic mt-1">{formErrors.nombre}</p>}
                    </div>
                    <div className="mb-4">
                      <label htmlFor="direccion" className="block text-gray-700 text-sm font-bold mb-2">Dirección:</label>
                      <input
                        type="text"
                        id="direccion"
                        name="direccion"
                        value={currentTienda?.direccion || ''}
                        onChange={handleChange}
                        className={`shadow appearance-none border ${formErrors.direccion ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                      />
                      {formErrors.direccion && <p className="text-red-500 text-xs italic mt-1">{formErrors.direccion}</p>}
                    </div>
                    <div className="mb-6">
                      <label htmlFor="telefono" className="block text-gray-700 text-sm font-bold mb-2">Teléfono:</label>
                      <input
                        type="text"
                        id="telefono"
                        name="telefono"
                        value={currentTienda?.telefono || ''}
                        onChange={handleChange}
                        className={`shadow appearance-none border ${formErrors.telefono ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                      />
                      {formErrors.telefono && <p className="text-red-500 text-xs italic mt-1">{formErrors.telefono}</p>}
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
                        <span>{currentTienda.id ? 'Guardar Cambios' : 'Crear'}</span>
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