import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";
import { PlusCircle, Edit, Trash2, Save, XCircle } from 'lucide-react';

export default function GestionTiendas() {
  const [tiendas, setTiendas] = useState([]);
  const [search, setSearch] = useState('');
  const [admins, setAdmins] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTienda, setCurrentTienda] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [tiendaIdToDelete, setTiendaIdToDelete] = useState(null);

  const showNotification = (msg, type = 'success') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000);
  };

  useEffect(() => {
    fetchTiendas();
    fetchAdministradores();
  }, []);

  const fetchTiendas = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/tiendas-fisicas');
      const data = await res.json();
      setTiendas(data);
    } catch (error) {
      console.error('Error al cargar tiendas:', error);
      showNotification('Error al cargar las tiendas.', 'error');
    }
  };

  const fetchAdministradores = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/administradores');
      const data = await res.json();
      const map = {};
      data.forEach(a => map[a.adminCodAdministrador] = a.adminNombre);
      setAdmins(map);
    } catch (e) {
      console.error('Error al cargar administradores:', e);
      showNotification('Error al cargar administradores.', 'error');
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.tiendNombre?.trim()) errors.tiendNombre = 'El nombre es obligatorio.';
    if (!data.tiendDireccion?.trim()) errors.tiendDireccion = 'La dirección es obligatoria.';
    if (!data.tiendTelefono?.trim()) {
      errors.tiendTelefono = 'El teléfono es obligatorio.';
    } else if (!/^\d{7,10}$/.test(data.tiendTelefono)) {
      errors.tiendTelefono = 'Formato inválido (7 a 10 dígitos).';
    }
    if (!data.adminCodAdministrador) {
      errors.adminCodAdministrador = 'El código de administrador es obligatorio.';
    }
    return errors;
  };

  const handleCreateNew = () => {
    setCurrentTienda({ tiendNombre: '', tiendDireccion: '', tiendTelefono: '', adminCodAdministrador: '' });
    setIsModalOpen(true);
    setFormErrors({});
  };

  const handleEdit = (tienda) => {
    setCurrentTienda({ ...tienda });
    setIsModalOpen(true);
    setFormErrors({});
  };

  const handleDelete = (id) => {
    setTiendaIdToDelete(id);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/tiendas-fisicas/${tiendaIdToDelete}`, { method: 'DELETE' });
      if (!res.ok) {
        throw new Error('Error al eliminar la tienda.');
      }
      fetchTiendas();
      showNotification('Tienda eliminada correctamente.', 'success');
    } catch (error) {
      console.error('Error al eliminar:', error);
      showNotification('Error al eliminar la tienda.', 'error');
    } finally {
      setShowConfirmModal(false);
      setTiendaIdToDelete(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(currentTienda);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const url = currentTienda.tiendIdTiendaFisica
      ? `http://localhost:3000/api/tiendas-fisicas/${currentTienda.tiendIdTiendaFisica}`
      : 'http://localhost:3000/api/tiendas-fisicas';
    const method = currentTienda.tiendIdTiendaFisica ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentTienda),
      });

      if (!res.ok) throw new Error('Error en la petición');
      fetchTiendas();
      setIsModalOpen(false);
      showNotification(currentTienda.tiendIdTiendaFisica ? 'Tienda actualizada correctamente.' : 'Tienda creada correctamente.', 'success');
    } catch (error) {
      console.error('Error al guardar:', error);
      showNotification('Error al guardar la tienda.', 'error');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentTienda(prev => ({ ...prev, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const filteredTiendas = tiendas.filter((t) =>
    Object.values({
      ...t,
      adminNombre: admins[t.adminCodAdministrador]
    }).some(val =>
      typeof val === 'string' && val.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="page-container">
      <Header />
      <BarraProductos />
      <main className="bg-vistas-home min-h-screen py-8 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-10">
          <h1 className="text-2xl font-semibold text-black mb-2 text-center">
            Gestión de Tiendas Físicas
          </h1>
          <p className="text-justify text-black mb-8 text-xl">
            Gestión de las tiendas físicas del sistema: crear nuevas, editar su información y eliminar registros existentes.
          </p>

          {message && (
            <div className={`fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 transition-opacity duration-300 ${
              messageType === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
            }`}>
              {message}
            </div>
          )}

          <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-lg">
            <input
              type="text"
              placeholder="Buscar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-1/2 border border-gray-300 px-4 py-2 rounded text-black"
            />
            <button
              onClick={handleCreateNew}
              className="bg-[#801010] hover:bg-[#921913] text-white font-bold py-2 px-4 rounded-md shadow-md flex items-center space-x-2 text-lg"
            >
              <PlusCircle size={20} />
              <span>Nueva Tienda</span>
            </button>
          </div>

          <div className="overflow-auto max-h-[60vh]">
            <table className="min-w-full text-left border-collapse">
              <thead className="bg-gray-100 text-black sticky top-0">
                <tr>
                  <th className="px-6 py-3 text-lg font-medium">ID</th>
                  <th className="px-6 py-3 text-lg font-medium">Nombre</th>
                  <th className="px-6 py-3 text-lg font-medium">Dirección</th>
                  <th className="px-6 py-3 text-lg font-medium">Teléfono</th>
                  <th className="px-6 py-3 text-lg font-medium">Admin ID</th>
                  <th className="px-6 py-3 text-lg font-medium">Admin Nombre</th>
                  <th className="px-6 py-3 text-lg font-medium text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredTiendas.map((t) => (
                  <tr key={t.tiendIdTiendaFisica} className="hover:bg-gray-50 text-black">
                    <td className="px-6 py-4 whitespace-nowrap text-base">{t.tiendIdTiendaFisica}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-base">{t.tiendNombre}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-base">{t.tiendDireccion}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-base">{t.tiendTelefono}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-base">{t.adminCodAdministrador}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-base">
                      {admins[t.adminCodAdministrador] || '-'}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => handleEdit(t)} className="text-blue-700 hover:text-[#1D4ED8]">
                          <Edit size={18} />
                        </button>
                        <button onClick={() => handleDelete(t.tiendIdTiendaFisica)} className="text-[#801010] hover:text-[#921913]">
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
                <h2 className="text-xl font-semibold text-center mb-4 text-black">
                  {currentTienda.tiendIdTiendaFisica ? 'Editar Tienda' : 'Nueva Tienda'}
                </h2>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="tiendNombre"
                    placeholder="Nombre"
                    value={currentTienda.tiendNombre}
                    onChange={handleChange}
                    className="w-full mb-3 border px-3 py-2 rounded text-black"
                  />
                  {formErrors.tiendNombre && <p className="text-red-500 text-sm">{formErrors.tiendNombre}</p>}

                  <input
                    type="text"
                    name="tiendDireccion"
                    placeholder="Dirección"
                    value={currentTienda.tiendDireccion}
                    onChange={handleChange}
                    className="w-full mb-3 border px-3 py-2 rounded text-black"
                  />
                  {formErrors.tiendDireccion && <p className="text-red-500 text-sm">{formErrors.tiendDireccion}</p>}

                  <input
                    type="text"
                    name="tiendTelefono"
                    placeholder="Teléfono"
                    value={currentTienda.tiendTelefono}
                    onChange={handleChange}
                    className="w-full mb-3 border px-3 py-2 rounded text-black"
                  />
                  {formErrors.tiendTelefono && <p className="text-red-500 text-sm">{formErrors.tiendTelefono}</p>}

                  <select
                    name="adminCodAdministrador"
                    value={currentTienda.adminCodAdministrador}
                    onChange={handleChange}
                    className="w-full mb-3 border px-3 py-2 rounded text-black"
                  >
                    <option value="">Selecciona un administrador</option>
                    {Object.entries(admins).map(([id, nombre]) => (
                      <option key={id} value={id}>
                        {nombre} (ID: {id})
                      </option>
                    ))}
                  </select>
                  {formErrors.adminCodAdministrador && (
                    <p className="text-red-500 text-sm">{formErrors.adminCodAdministrador}</p>
                  )}

                  {currentTienda.adminCodAdministrador && (
                    <p className="text-sm text-gray-600 mb-2">
                      Admin seleccionado: {admins[currentTienda.adminCodAdministrador] || 'No encontrado'}
                    </p>
                  )}

                  <div className="flex justify-end gap-4 mt-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 text-black"
                    >
                      <XCircle size={18} className="inline mr-1" /> Cancelar
                    </button>
                    <button type="submit" className="bg-[#801010] text-white px-4 py-2 rounded hover:bg-[#921913]">
                      <Save size={18} className="inline mr-1" />
                      {currentTienda.tiendIdTiendaFisica ? 'Guardar' : 'Crear'}
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
                <p className="text-black text-center mb-6">¿Estás seguro de que quieres eliminar esta tienda?</p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => { setShowConfirmModal(false); setTiendaIdToDelete(null); }}
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