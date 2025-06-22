import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";
import { PlusCircle, Edit, Trash2, Save, XCircle, Briefcase, DollarSign } from 'lucide-react';

export default function GestionServicios() {
  const [services, setServices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    // Simulate fetching services
    const simulatedServices = [
      { id: 'SERV001', name: 'Asesoría de Vinos', description: 'Asesoramiento personalizado para selección de vinos.', price: 50.00 },
      { id: 'SERV002', name: 'Cata de Productos', description: 'Experiencia de cata guiada en tienda.', price: 75.00 },
      { id: 'SERV003', name: 'Servicio de Logística', description: 'Gestión y envío de pedidos a gran escala.', price: 200.00 },
    ];
    setServices(simulatedServices);
  }, []);

  const validateForm = (data) => {
    const errors = {};
    if (!data.name || data.name.trim() === '') errors.name = 'El nombre es obligatorio.';
    if (!data.description || data.description.trim() === '') errors.description = 'La descripción es obligatoria.';
    if (isNaN(parseFloat(data.price)) || parseFloat(data.price) <= 0) errors.price = 'El precio debe ser un número positivo.';
    return errors;
  };

  const handleCreateNew = () => {
    setCurrentService({ id: '', name: '', description: '', price: '' });
    setIsModalOpen(true);
    setFormErrors({});
  };

  const handleEdit = (service) => {
    setCurrentService({ ...service });
    setIsModalOpen(true);
    setFormErrors({});
  };

  const handleDelete = (serviceId) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar el servicio con ID: ${serviceId}?`)) {
      setServices(services.filter(serv => serv.id !== serviceId));
      alert('Servicio eliminado (simulado).');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(currentService);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (currentService.id) {
      // Update existing service
      setServices(services.map(serv =>
        serv.id === currentService.id ? { ...currentService, price: parseFloat(currentService.price) } : serv
      ));
      alert('Servicio actualizado (simulado).');
    } else {
      // Create new service
      const newId = `SERV${String(services.length + 1).padStart(3, '0')}`;
      setServices([...services, { ...currentService, id: newId, price: parseFloat(currentService.price) }]);
      alert('Nuevo servicio creado (simulado).');
    }
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentService(prev => ({ ...prev, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: undefined }));
  };

  return (
    <>
      <div className="page-container">
        <Header />
        <BarraProductos />
        <main className="bg-vistas-home min-h-screen py-8 px-4 sm:px-8">
          <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-10">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">Gestión de Servicios Empresariales</h1>
            <p className="text-center text-gray-600 text-lg mb-8">
              Crea, actualiza y establece los precios de los servicios empresariales.
            </p>

            <div className="flex justify-end mb-6">
              <button
                onClick={handleCreateNew}
                className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-md shadow-md transition-colors duration-200 flex items-center space-x-2"
              >
                <PlusCircle size={20} />
                <span>Nuevo Servicio</span>
              </button>
            </div>

            {services.length > 0 ? (
              <div className="overflow-x-auto rounded-lg shadow-md">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-100 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Nombre</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Descripción</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Precio</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {services.map((service) => (
                      <tr key={service.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{service.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{service.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">{service.description}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${service.price.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-center space-x-3">
                            <button
                              onClick={() => handleEdit(service)}
                              className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                              title="Editar"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(service.id)}
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
              <p className="text-center text-gray-500 mt-8">No hay servicios registrados.</p>
            )}

            {/* Modal para Crear/Editar Servicio */}
            {isModalOpen && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
                <div className="relative p-8 bg-white w-full max-w-lg mx-auto rounded-lg shadow-xl">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    {currentService.id ? 'Editar Servicio' : 'Crear Nuevo Servicio'}
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nombre:</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={currentService?.name || ''}
                        onChange={handleChange}
                        className={`shadow appearance-none border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                      />
                      {formErrors.name && <p className="text-red-500 text-xs italic mt-1">{formErrors.name}</p>}
                    </div>
                    <div className="mb-4">
                      <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Descripción:</label>
                      <textarea
                        id="description"
                        name="description"
                        value={currentService?.description || ''}
                        onChange={handleChange}
                        rows="3"
                        className={`shadow appearance-none border ${formErrors.description ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                      ></textarea>
                      {formErrors.description && <p className="text-red-500 text-xs italic mt-1">{formErrors.description}</p>}
                    </div>
                    <div className="mb-6">
                      <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Precio:</label>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        value={currentService?.price || ''}
                        onChange={handleChange}
                        step="0.01"
                        className={`shadow appearance-none border ${formErrors.price ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                      />
                      {formErrors.price && <p className="text-red-500 text-xs italic mt-1">{formErrors.price}</p>}
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
                        <span>{currentService.id ? 'Guardar Cambios' : 'Crear'}</span>
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