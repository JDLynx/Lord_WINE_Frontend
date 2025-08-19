import React, { useState, useEffect, useCallback } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from '../components/BarraProductos';
import {
  PlusCircle, Edit, Trash2, Save, XCircle,
} from 'lucide-react';

export default function GestionAdministradores() {
  const [administrators, setAdministrators] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [adminIdToDelete, setAdminIdToDelete] = useState(null);

  const showNotification = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000);
  };

  const fetchAdministradores = useCallback(async () => {
    try {
      const response = await fetch('https://lord-wine-backend.onrender.com/api/administradores');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAdministrators(data);
    } catch (error) {
      console.error('Error al cargar administradores:', error);
      showNotification('Error al cargar los administradores.', 'error');
    }
  }, []);

  useEffect(() => {
    fetchAdministradores();
  }, [fetchAdministradores]);

  const validateForm = (data) => {
    const errors = {};

    if (!data.adminNombre?.trim()) {
      errors.adminNombre = 'El nombre es obligatorio.';
    }

    if (!data.adminCorreoElectronico?.trim()) {
      errors.adminCorreoElectronico = 'El correo es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(data.adminCorreoElectronico)) {
      errors.adminCorreoElectronico = 'Formato de correo inválido.';
    }

    if (!data.adminIdAdministrador?.trim()) {
      errors.adminIdAdministrador = 'La identificación es obligatoria.';
    } else if (!/^\d+$/.test(data.adminIdAdministrador)) {
      errors.adminIdAdministrador = 'La identificación debe ser un número entero.';
    }

    if (!data.adminCodAdministrador && !data.adminContrasena?.trim()) {
      errors.adminContrasena = 'La contraseña es obligatoria.';
    } else if (!data.adminCodAdministrador && data.adminContrasena.length < 6) {
      errors.adminContrasena = 'La contraseña debe tener al menos 6 caracteres.';
    }

    return errors;
  };

  const handleCreateNew = () => {
    setCurrentAdmin({
      adminNombre: '',
      adminCorreoElectronico: '',
      adminIdAdministrador: '',
      adminDireccion: '',
      adminTelefono: '',
      adminContrasena: '',
      rol: '',
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleEdit = (admin) => {
    setCurrentAdmin({
      ...admin,
      adminContrasena: '',
      rol: '',
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setAdminIdToDelete(id);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`https://lord-wine-backend.onrender.com/api/administradores/${adminIdToDelete}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      await fetchAdministradores();
      showNotification('Administrador eliminado correctamente.', 'success');
    } catch (error) {
      console.error('Error al eliminar administrador:', error);
      showNotification(`Error al eliminar el administrador: ${error.message}`, 'error');
    } finally {
      setShowConfirmModal(false);
      setAdminIdToDelete(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(currentAdmin);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const method = currentAdmin.adminCodAdministrador ? 'PUT' : 'POST';
      const url = currentAdmin.adminCodAdministrador
        ? `https://lord-wine-backend.onrender.com/api/administradores/${currentAdmin.adminCodAdministrador}`
        : 'https://lord-wine-backend.onrender.com/api/administradores';

      const body = {
        adminNombre: currentAdmin.adminNombre.trim(),
        adminCorreoElectronico: currentAdmin.adminCorreoElectronico.trim(),
        adminIdAdministrador: currentAdmin.adminIdAdministrador.trim(),
        adminDireccion: currentAdmin.adminDireccion?.trim() || '',
        adminTelefono: currentAdmin.adminTelefono?.trim() || '',
        ...(method === 'POST' && {
          adminContrasena: currentAdmin.adminContrasena?.trim(),
        }),
      };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      await fetchAdministradores();
      setIsModalOpen(false);
      setCurrentAdmin(null);
    } catch (error) {
      console.error('Error al guardar administrador:', error);
      showNotification(`Error al guardar el administrador: ${error.message}`, 'error');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentAdmin(prev => ({ ...prev, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const filteredAdmins = administrators.filter(admin =>
    Object.values(admin).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="page-container min-h-screen flex flex-col">
      <Header />
      <BarraProductos />
      <main className="bg-vistas-home py-8 px-4 sm:px-8 flex-grow overflow-y-auto">
        <div className="w-full mx-auto bg-white rounded-2xl shadow-lg p-10 mt-8"> {/* Changed max-w-7xl to w-full */}
          <h1 className="text-2xl font-semibold text-black mb-2 text-center">Gestión de Administradores</h1>
          <p className="text-center text-black mb-8 text-xl">
            Aquí puedes gestionar los administradores del sistema: crear nuevos, editar su información y eliminar registros existentes.
          </p>

          {message && messageType === 'error' && (
            <div className={`fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 transition-opacity duration-300 ${
              messageType === 'error' ? 'bg-red-500 text-white' : ''
            }`}>
              {message}
            </div>
          )}

          <div className="flex justify-between items-center mb-6">
            <input
              type="text"
              placeholder="Buscar"
              className="w-full max-w-xs border border-gray-300 rounded px-4 py-2 text-black text-left text-lg focus:border-black focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              onClick={handleCreateNew}
              className="ml-4 bg-[#7c1010] hover:bg-[#921913] text-white font-bold py-2 px-4 rounded-md shadow-md flex items-center space-x-2"
            >
              <PlusCircle size={20} />
              <span className="text-lg">Nuevo Administrador</span>
            </button>
          </div>

          <div className="overflow-x-auto max-h-[500px] overflow-y-auto rounded-lg">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 text-left text-lg font-medium text-black">ID</th>
                  <th className="px-4 py-3 text-left text-lg font-medium text-black">Identificación</th>
                  <th className="px-4 py-3 text-left text-lg font-medium text-black">Nombres</th>
                  <th className="px-4 py-3 text-left text-lg font-medium text-black">Dirección</th>
                  <th className="px-4 py-3 text-left text-lg font-medium text-black">Teléfono</th>
                  <th className="px-4 py-3 text-left text-lg font-medium text-black">Correo electrónico</th>
                  <th className="px-4 py-3 text-center text-lg font-medium text-black">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredAdmins.map((admin) => (
                  <tr key={admin.adminCodAdministrador} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-black text-left text-base">{admin.adminCodAdministrador}</td>
                    <td className="px-4 py-3 text-black text-left text-base">{admin.adminIdAdministrador}</td>
                    <td className="px-4 py-3 text-black text-left whitespace-nowrap text-base">{admin.adminNombre}</td>
                    <td className="px-4 py-3 text-black text-left whitespace-normal break-words max-w-xs text-base">{admin.adminDireccion}</td>
                    <td className="px-4 py-3 text-black text-left text-base">{admin.adminTelefono}</td>
                    <td className="px-4 py-3 text-black text-left text-base">{admin.adminCorreoElectronico}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center gap-4">
                        <button onClick={() => handleEdit(admin)} className="text-[#1D4ED8] hover:text-blue-700">
                          <Edit size={18} />
                        </button>
                        <button onClick={() => handleDelete(admin.adminCodAdministrador)} className="text-[#801010] hover:text-[#921913]">
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
              <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative z-10">
                <h2 className="text-lg font-bold text-center mb-4 text-black">
                  {currentAdmin.adminCodAdministrador ? 'Editar' : 'Nuevo'} Administrador
                </h2>
                <form onSubmit={handleSubmit}>
                  <input type="text" name="adminNombre" placeholder="Nombre" value={currentAdmin.adminNombre} onChange={handleChange}
                    className="w-full mb-3 border px-3 py-2 rounded text-black" />
                  {formErrors.adminNombre && <p className="text-red-500 text-sm">{formErrors.adminNombre}</p>}

                  <input type="text" name="adminIdAdministrador" placeholder="Identificación" value={currentAdmin.adminIdAdministrador} onChange={handleChange}
                    className="w-full mb-3 border px-3 py-2 rounded text-black" />
                  {formErrors.adminIdAdministrador && <p className="text-red-500 text-sm">{formErrors.adminIdAdministrador}</p>}

                  <input type="text" name="adminDireccion" placeholder="Dirección" value={currentAdmin.adminDireccion} onChange={handleChange}
                    className="w-full mb-3 border px-3 py-2 rounded text-black" />

                  <input type="text" name="adminTelefono" placeholder="Teléfono" value={currentAdmin.adminTelefono} onChange={handleChange}
                    className="w-full mb-3 border px-3 py-2 rounded text-black" />

                  <input type="email" name="adminCorreoElectronico" placeholder="Correo electrónico" value={currentAdmin.adminCorreoElectronico} onChange={handleChange}
                    className="w-full mb-3 border px-3 py-2 rounded text-black" />
                  {formErrors.adminCorreoElectronico && <p className="text-red-500 text-sm">{formErrors.adminCorreoElectronico}</p>}

                  {!currentAdmin.adminCodAdministrador && (
                    <>
                      <input type="password" name="adminContrasena" placeholder="Contraseña" value={currentAdmin.adminContrasena} onChange={handleChange}
                        className="w-full mb-3 border px-3 py-2 rounded text-black" />
                      {formErrors.adminContrasena && <p className="text-red-500 text-sm">{formErrors.adminContrasena}</p>}
                    </>
                  )}

                  <div className="flex justify-end gap-4">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 text-black">
                      <XCircle size={18} className="inline mr-1" /> Cancelar
                    </button>
                    <button type="submit" className="bg-[#801010] text-white px-4 py-2 rounded hover:bg-[#921913]">
                      <Save size={18} className="inline mr-1" /> {currentAdmin.adminCodAdministrador ? 'Guardar' : 'Crear'}
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
                <p className="text-black text-center mb-6">¿Estás seguro de que quieres eliminar este administrador?</p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => { setShowConfirmModal(false); setAdminIdToDelete(null); }}
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