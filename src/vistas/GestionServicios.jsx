import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";
import { PlusCircle, Edit, Trash2, Save, XCircle } from 'lucide-react';

export default function GestionServicios() {
  const [services, setServices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [serviceToDeleteId, setServiceToDeleteId] = useState(null);

  const API_URL = 'https://lord-wine-backend.onrender.com/api/servicios-empresariales';

  const showNotification = (msg, type = 'success') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Error al cargar servicios empresariales:', error);
      showNotification('Error al cargar servicios empresariales.', 'error');
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.serNombre || data.serNombre.trim() === '') errors.serNombre = 'El nombre es obligatorio.';
    if (!data.serDescripcion || data.serDescripcion.trim() === '') errors.serDescripcion = 'La descripción es obligatoria.';

    if (isNaN(parseFloat(data.serPrecio)) || parseFloat(data.serPrecio) <= 0) {
      errors.serPrecio = 'El precio debe ser un número positivo.';
    }
    return errors;
  };

  const handleCreateNew = () => {
    setCurrentService({ serNombre: '', serDescripcion: '', serPrecio: '' });
    setIsModalOpen(true);
    setFormErrors({});
  };

  const handleEdit = (service) => {
    setCurrentService({ ...service });
    setIsModalOpen(true);
    setFormErrors({});
  };

  const handleDelete = (serviceId) => {
    setServiceToDeleteId(serviceId);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/${serviceToDeleteId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      await fetchServices();
    } catch (error) {
      console.error('Error al eliminar servicio:', error);
      showNotification(`Error al eliminar el servicio: ${error.message}`, 'error');
    } finally {
      setShowConfirmModal(false);
      setServiceToDeleteId(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(currentService);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const method = currentService.serIdServicioEmpresarial ? 'PUT' : 'POST';
      const url = currentService.serIdServicioEmpresarial
        ? `${API_URL}/${currentService.serIdServicioEmpresarial}`
        : API_URL;

      const body = {
        serNombre: currentService.serNombre.trim(),
        serDescripcion: currentService.serDescripcion.trim(),
        serPrecio: parseFloat(currentService.serPrecio),
      };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      await fetchServices();
      // showNotification(currentService.serIdServicioEmpresarial ? 'Servicio actualizado correctamente.' : 'Nuevo servicio creado correctamente.', 'success'); // Eliminada notificación de éxito
      setIsModalOpen(false);
      setCurrentService(null);
    } catch (error) {
      console.error('Error al guardar servicio:', error);
      showNotification(`Error al guardar el servicio: ${error.message}`, 'error');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentService(prev => ({ ...prev, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const filteredServices = services.filter(service =>
    Object.values(service).some(val =>
      typeof val === 'string' && val.toLowerCase().includes(searchTerm.toLowerCase())
    ) ||
    (typeof service.serIdServicioEmpresarial === 'number' && service.serIdServicioEmpresarial.toString().includes(searchTerm)) ||
    (typeof service.serPrecio === 'number' && service.serPrecio.toString().includes(searchTerm))
  );

  return (
    <>
      <div className="page-container min-h-screen flex flex-col">
        <Header />
        <BarraProductos />
        <main className="bg-vistas-home py-8 px-4 sm:px-8 flex-grow overflow-y-auto">
          <div className="w-full mx-auto bg-white rounded-2xl shadow-lg p-10 mt-8">
            <h1 className="text-2xl font-semibold text-black mb-2 text-center">Gestión de Servicios Empresariales</h1>
            <p className="text-center text-black mb-8 text-xl">
              Gestión de los servicios empresariales que ofrece tu negocio: crear nuevos servicios, editar sus detalles y precios, y eliminar los que ya no sean relevantes.
            </p>

            {message && (
              <div className={`fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 transition-opacity duration-300 ${
                messageType === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
              }`}>
                {message}
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <input
                type="text"
                placeholder="Buscar"
                className="w-full max-w-xs border border-gray-300 rounded px-4 py-2 text-black text-left text-lg focus:border-black focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                onClick={handleCreateNew}
                className="bg-[#801010] hover:bg-[#921913] text-white font-bold py-2 px-4 rounded-md shadow-md transition-colors duration-200 flex items-center space-x-2 text-lg"
              >
                <PlusCircle size={20} />
                <span>Nuevo Servicio</span>
              </button>
            </div>

            {filteredServices.length > 0 ? (
              <div className="overflow-x-auto rounded-lg shadow-md max-h-[500px] overflow-y-auto">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-100 border-b border-gray-200 sticky top-0 z-10">
                    <tr>
                      <th className="px-6 py-3 text-left text-lg font-medium text-black tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-lg font-medium text-black tracking-wider">Nombre</th>
                      <th className="px-6 py-3 text-left text-lg font-medium text-black tracking-wider">Descripción</th>
                      <th className="px-6 py-3 text-left text-lg font-medium text-black tracking-wider">Precio</th>
                      <th className="px-6 py-3 text-center text-lg font-medium text-black tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredServices.map((service) => (
                      <tr key={service.serIdServicioEmpresarial} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-base text-black text-left">{service.serIdServicioEmpresarial}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-base text-black text-left">{service.serNombre}</td>
                        <td className="px-6 py-4 text-base text-black text-left">{service.serDescripcion}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-base text-black text-left">${parseFloat(service.serPrecio).toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-base font-medium">
                          <div className="flex justify-center space-x-3">
                            <button
                              onClick={() => handleEdit(service)}
                              className="text-blue-900 hover:text-[#1D4ED8] transition-colors duration-200"
                              title="Editar"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(service.serIdServicioEmpresarial)}
                              className="text-red-900 hover:text-[#921913] transition-colors duration-200"
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
              <p className="text-center text-gray-500 mt-8">No hay servicios registrados que coincidan con la búsqueda.</p>
            )}

            {isModalOpen && (
              <div className="fixed inset-0 flex justify-center items-center z-50">
                <div className="absolute inset-0 bg-gray-500/20 backdrop-blur-sm"></div>
                <div className="relative p-8 bg-white w-full max-w-lg mx-auto rounded-lg shadow-xl z-10">
                  <h2 className="text-2xl font-bold text-black mb-6 text-center">
                    {currentService.serIdServicioEmpresarial ? 'Editar Servicio' : 'Crear Nuevo Servicio'}
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="serNombre" className="block text-black text-lg font-semibold mb-2">Nombre:</label>
                      <input
                        type="text"
                        id="serNombre"
                        name="serNombre"
                        value={currentService?.serNombre || ''}
                        onChange={handleChange}
                        className={`shadow appearance-none border ${formErrors.serNombre ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                      />
                      {formErrors.serNombre && <p className="text-red-500 text-xs italic mt-1">{formErrors.serNombre}</p>}
                    </div>
                    <div className="mb-4">
                      <label htmlFor="serDescripcion" className="block text-black text-lg font-semibold mb-2">Descripción:</label>
                      <textarea
                        id="serDescripcion"
                        name="serDescripcion"
                        value={currentService?.serDescripcion || ''}
                        onChange={handleChange}
                        rows="3"
                        className={`shadow appearance-none border ${formErrors.serDescripcion ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                      ></textarea>
                      {formErrors.serDescripcion && <p className="text-red-500 text-xs italic mt-1">{formErrors.serDescripcion}</p>}
                    </div>
                    <div className="mb-6">
                      <label htmlFor="serPrecio" className="block text-black text-lg font-semibold mb-2">Precio:</label>
                      <input
                        type="number"
                        id="serPrecio"
                        name="serPrecio"
                        value={currentService?.serPrecio || ''}
                        onChange={handleChange}
                        step="0.01"
                        className={`shadow appearance-none border ${formErrors.serPrecio ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                      />
                      {formErrors.serPrecio && <p className="text-red-500 text-xs italic mt-1">{formErrors.serPrecio}</p>}
                    </div>
                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded-md flex items-center space-x-2 transition-colors duration-200"
                      >
                        <XCircle size={20} />
                        <span>Cancelar</span>
                      </button>
                      <button
                        type="submit"
                        className="bg-[#921913] hover:bg-[#801010] text-white font-semibold py-2 px-4 rounded-md flex items-center space-x-2 transition-colors duration-200"
                      >
                        <Save size={20} />
                        <span>{currentService.serIdServicioEmpresarial ? 'Guardar Cambios' : 'Crear'}</span>
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
                  <p className="text-black text-center mb-6">
                    ¿Estás seguro de que quieres eliminar este servicio? Esta acción no se puede deshacer.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => { setShowConfirmModal(false); setServiceToDeleteId(null); }}
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
    </>
  );
}