import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    fetchAdministradores();
  }, []);

  const fetchAdministradores = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/administradores');
      const data = await response.json();
      setAdministrators(data);
    } catch (error) {
      console.error('Error al cargar administradores:', error);
    }
  };

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

    if (!data.rol?.trim()) {
      errors.rol = 'El rol es obligatorio.';
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

  const handleDelete = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este administrador?')) {
      try {
        await fetch(`http://localhost:3000/api/administradores/${id}`, {
          method: 'DELETE',
        });
        fetchAdministradores();
        alert('Administrador eliminado correctamente.');
      } catch (error) {
        console.error('Error al eliminar administrador:', error);
        alert('Error al eliminar el administrador.');
      }
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
        ? `http://localhost:3000/api/administradores/${currentAdmin.adminCodAdministrador}`
        : 'http://localhost:3000/api/administradores';

      const body = {
        adminNombre: currentAdmin.adminNombre.trim(),
        adminCorreoElectronico: currentAdmin.adminCorreoElectronico.trim(),
        adminIdAdministrador: parseInt(currentAdmin.adminIdAdministrador),
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
        throw new Error(errorData.message || 'Error en la solicitud');
      }

      alert(currentAdmin.adminCodAdministrador ? 'Administrador actualizado' : 'Administrador creado');
      fetchAdministradores();
      setIsModalOpen(false);
      setCurrentAdmin(null);
    } catch (error) {
      console.error('Error al guardar administrador:', error);
      alert(error.message || 'Error al guardar el administrador.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentAdmin(prev => ({ ...prev, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const filteredAdmins = administrators.filter(admin =>
    admin.adminNombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      <Header />
      <BarraProductos />
      <main className="bg-vistas-home min-h-screen py-8 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-10">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">Gestión de Administradores</h1>

          <div className="flex justify-between items-center mb-6">
            <input
              type="text"
              placeholder="Buscar por nombre..."
              className="w-full max-w-xs border border-gray-300 rounded px-4 py-2 text-black"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              onClick={handleCreateNew}
              className="ml-4 bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-md shadow-md flex items-center space-x-2"
            >
              <PlusCircle size={20} />
              <span>Nuevo Administrador</span>
            </button>
          </div>

          <div className="overflow-x-auto max-h-[500px] overflow-y-auto rounded-lg border">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Identificación</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Nombres</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Dirección</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Teléfono</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Correo electrónico</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-600">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredAdmins.map((admin) => (
                  <tr key={admin.adminCodAdministrador} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 text-black text-left">{admin.adminCodAdministrador}</td>
                    <td className="px-4 py-3 text-black text-left">{admin.adminIdAdministrador}</td>
                    <td className="px-4 py-3 text-black text-left whitespace-nowrap">{admin.adminNombre}</td>
                    <td className="px-4 py-3 text-black text-left whitespace-normal break-words max-w-xs">{admin.adminDireccion}</td>
                    <td className="px-4 py-3 text-black text-left">{admin.adminTelefono}</td>
                    <td className="px-4 py-3 text-black text-left">{admin.adminCorreoElectronico}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center gap-4">
                        <button onClick={() => handleEdit(admin)} className="text-blue-600 hover:text-blue-800">
                          <Edit size={18} />
                        </button>
                        <button onClick={() => handleDelete(admin.adminCodAdministrador)} className="text-red-600 hover:text-red-800">
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
                <h2 className="text-xl font-bold text-center mb-4 text-gray-800">
                  {currentAdmin.adminCodAdministrador ? 'Editar' : 'Nuevo'} Administrador
                </h2>
                <form onSubmit={handleSubmit}>
                  <input type="text" name="adminNombre" placeholder="Nombre" value={currentAdmin.adminNombre} onChange={handleChange}
                    className="w-full mb-3 border px-3 py-2 rounded text-black" />
                  {formErrors.adminNombre && <p className="text-red-500 text-sm">{formErrors.adminNombre}</p>}

                  <input type="number" name="adminIdAdministrador" placeholder="Identificación" value={currentAdmin.adminIdAdministrador} onChange={handleChange}
                    className="w-full mb-3 border px-3 py-2 rounded text-black" />
                  {formErrors.adminIdAdministrador && <p className="text-red-500 text-sm">{formErrors.adminIdAdministrador}</p>}

                  <input type="text" name="adminDireccion" placeholder="Dirección" value={currentAdmin.adminDireccion} onChange={handleChange}
                    className="w-full mb-3 border px-3 py-2 rounded text-black" />

                  <input type="text" name="adminTelefono" placeholder="Teléfono" value={currentAdmin.adminTelefono} onChange={handleChange}
                    className="w-full mb-3 border px-3 py-2 rounded text-black" />

                  <input type="email" name="adminCorreoElectronico" placeholder="Correo" value={currentAdmin.adminCorreoElectronico} onChange={handleChange}
                    className="w-full mb-3 border px-3 py-2 rounded text-black" />
                  {formErrors.adminCorreoElectronico && <p className="text-red-500 text-sm">{formErrors.adminCorreoElectronico}</p>}

                  {!currentAdmin.adminCodAdministrador && (
                    <>
                      <input type="password" name="adminContrasena" placeholder="Contraseña" value={currentAdmin.adminContrasena} onChange={handleChange}
                        className="w-full mb-3 border px-3 py-2 rounded text-black" />
                      {formErrors.adminContrasena && <p className="text-red-500 text-sm">{formErrors.adminContrasena}</p>}
                    </>
                  )}

                  <select name="rol" value={currentAdmin.rol} onChange={handleChange}
                    className="w-full mb-4 border px-3 py-2 rounded text-black">
                    <option value="">Seleccione un rol</option>
                    <option value="Administrador">Administrador</option>
                  </select>
                  {formErrors.rol && <p className="text-red-500 text-sm">{formErrors.rol}</p>}

                  <div className="flex justify-end gap-4">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 text-gray-800">
                      <XCircle size={18} className="inline mr-1" /> Cancelar
                    </button>
                    <button type="submit" className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800">
                      <Save size={18} className="inline mr-1" /> {currentAdmin.adminCodAdministrador ? 'Guardar' : 'Crear'}
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
  );
}