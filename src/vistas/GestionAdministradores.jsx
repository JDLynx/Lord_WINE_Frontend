import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";
import { PlusCircle, Edit, Trash2, Save, XCircle, User, Mail, Shield } from 'lucide-react'; // Added User, Mail, Shield for clarity

export default function GestionAdministradores() {
  const [administrators, setAdministrators] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState(null); // Admin being edited or created
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    // Simulate fetching data on component mount
    const simulatedData = [
      { id: 'ADM001', nombre: 'Juan Pérez', correo: 'juan.perez@example.com', rol: 'SuperAdmin' },
      { id: 'ADM002', nombre: 'María García', correo: 'maria.garcia@example.com', rol: 'AdminInventario' },
      { id: 'ADM003', nombre: 'Carlos Ruiz', correo: 'carlos.ruiz@example.com', rol: 'AdminPedidos' },
      { id: 'ADM004', nombre: 'Laura Fuentes', correo: 'laura.fuentes@example.com', rol: 'AdminGeneral' },
    ];
    setAdministrators(simulatedData);
  }, []);

  const validateForm = (data) => {
    const errors = {};
    if (!data.nombre || data.nombre.trim() === '') errors.nombre = 'El nombre es obligatorio.';
    if (!data.correo) {
      errors.correo = 'El correo es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(data.correo)) {
      errors.correo = 'El formato del correo es inválido.';
    }
    if (!data.rol || data.rol.trim() === '') errors.rol = 'El rol es obligatorio.';
    return errors;
  };

  const handleCreateNew = () => {
    setCurrentAdmin({ id: '', nombre: '', correo: '', rol: '' });
    setIsModalOpen(true);
    setFormErrors({});
  };

  const handleEdit = (admin) => {
    setCurrentAdmin({ ...admin }); // Create a copy to edit
    setIsModalOpen(true);
    setFormErrors({});
  };

  const handleDelete = (adminId) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar al administrador con ID: ${adminId}?`)) {
      setAdministrators(administrators.filter(admin => admin.id !== adminId));
      alert('Administrador eliminado (simulado).');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(currentAdmin);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (currentAdmin.id) {
      // Update existing admin
      setAdministrators(administrators.map(admin =>
        admin.id === currentAdmin.id ? currentAdmin : admin
      ));
      alert('Administrador actualizado (simulado).');
    } else {
      // Create new admin
      const newId = `ADM${String(administrators.length + 1).padStart(3, '0')}`;
      setAdministrators([...administrators, { ...currentAdmin, id: newId }]);
      alert('Nuevo administrador creado (simulado).');
    }
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentAdmin(prev => ({ ...prev, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: undefined }));
  };

  return (
    <>
      <div className="page-container">
        <Header />
        <BarraProductos />
        <main className="bg-vistas-home min-h-screen py-8 px-4 sm:px-8">
          <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-10">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">Gestión de Administradores</h1>
            <p className="text-center text-gray-600 text-lg mb-8">
              Aquí podrás ver, crear, editar y eliminar otros administradores del sistema.
            </p>

            <div className="flex justify-end mb-6">
              <button
                onClick={handleCreateNew}
                className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-md shadow-md transition-colors duration-200 flex items-center space-x-2"
              >
                <PlusCircle size={20} />
                <span>Nuevo Administrador</span>
              </button>
            </div>

            {administrators.length > 0 ? (
              <div className="overflow-x-auto rounded-lg shadow-md">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-100 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Nombre</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Correo</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Rol</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {administrators.map((admin) => (
                      <tr key={admin.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{admin.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{admin.nombre}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{admin.correo}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{admin.rol}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-center space-x-3">
                            <button
                              onClick={() => handleEdit(admin)}
                              className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                              title="Editar"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(admin.id)}
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
              <p className="text-center text-gray-500 mt-8">No hay administradores registrados.</p>
            )}

            {/* Modal para Crear/Editar Administrador */}
            {isModalOpen && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
                <div className="relative p-8 bg-white w-full max-w-md mx-auto rounded-lg shadow-xl">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    {currentAdmin.id ? 'Editar Administrador' : 'Crear Nuevo Administrador'}
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="nombre" className="block text-gray-700 text-sm font-bold mb-2">Nombre:</label>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={currentAdmin?.nombre || ''}
                        onChange={handleChange}
                        className={`shadow appearance-none border ${formErrors.nombre ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                      />
                      {formErrors.nombre && <p className="text-red-500 text-xs italic mt-1">{formErrors.nombre}</p>}
                    </div>
                    <div className="mb-4">
                      <label htmlFor="correo" className="block text-gray-700 text-sm font-bold mb-2">Correo:</label>
                      <input
                        type="email"
                        id="correo"
                        name="correo"
                        value={currentAdmin?.correo || ''}
                        onChange={handleChange}
                        className={`shadow appearance-none border ${formErrors.correo ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                      />
                      {formErrors.correo && <p className="text-red-500 text-xs italic mt-1">{formErrors.correo}</p>}
                    </div>
                    <div className="mb-6">
                      <label htmlFor="rol" className="block text-gray-700 text-sm font-bold mb-2">Rol:</label>
                      <select
                        id="rol"
                        name="rol"
                        value={currentAdmin?.rol || ''}
                        onChange={handleChange}
                        className={`shadow appearance-none border ${formErrors.rol ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                      >
                        <option value="">Selecciona un rol</option>
                        <option value="SuperAdmin">Super Administrador</option>
                        <option value="AdminInventario">Administrador de Inventario</option>
                        <option value="AdminPedidos">Administrador de Pedidos</option>
                        <option value="AdminGeneral">Administrador General</option>
                      </select>
                      {formErrors.rol && <p className="text-red-500 text-xs italic mt-1">{formErrors.rol}</p>}
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
                        <span>{currentAdmin.id ? 'Guardar Cambios' : 'Crear'}</span>
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