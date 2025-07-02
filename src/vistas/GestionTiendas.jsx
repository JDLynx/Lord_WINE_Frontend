import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";
import { PlusCircle, Edit, Trash2, Save, XCircle } from 'lucide-react';

export default function GestionTiendas() {
  const [tiendas, setTiendas] = useState([]);
  const [filteredTiendas, setFilteredTiendas] = useState([]);
  const [admins, setAdmins] = useState({});
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTienda, setCurrentTienda] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    fetchTiendas();
    fetchAdministradores();
  }, []);

  useEffect(() => {
    setFilteredTiendas(
      tiendas.filter(t =>
        t.tiendNombre.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, tiendas]);

  const fetchTiendas = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/tiendas-fisicas');
      const data = await res.json();
      setTiendas(data);
    } catch (error) {
      console.error('Error al cargar tiendas:', error);
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
    setCurrentTienda({ tiendNombre: '', tiendDireccion: '', tiendTelefono: '', adminCodAdministrador: 1 });
    setIsModalOpen(true);
    setFormErrors({});
  };

  const handleEdit = (tienda) => {
    setCurrentTienda({ ...tienda });
    setIsModalOpen(true);
    setFormErrors({});
  };

  const handleDelete = async (id) => {
    if (confirm('¿Eliminar esta tienda?')) {
      try {
        await fetch(`http://localhost:3000/api/tiendas-fisicas/${id}`, { method: 'DELETE' });
        fetchTiendas();
      } catch (error) {
        console.error('Error al eliminar:', error);
      }
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
    } catch (error) {
      console.error('Error al guardar:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentTienda(prev => ({ ...prev, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: undefined }));
  };

  return (
    <div className="page-container">
      <Header />
      <BarraProductos />
      <main className="bg-vistas-home min-h-screen py-8 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-10">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-left">
            Gestión de Tiendas Físicas
          </h1>

          <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-1/2 border border-gray-300 px-4 py-2 rounded text-black"
            />
            <button
              onClick={handleCreateNew}
              className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-md shadow-md flex items-center space-x-2"
            >
              <PlusCircle size={20} />
              <span>Nueva Tienda</span>
            </button>
          </div>

          <div className="overflow-auto max-h-[60vh]">
            <table className="min-w-full text-left border-collapse">
              <thead className="bg-gray-100 text-black">
                <tr>
                  <th className="px-6 py-3 text-sm font-medium">ID</th>
                  <th className="px-6 py-3 text-sm font-medium">Nombre</th>
                  <th className="px-6 py-3 text-sm font-medium">Dirección</th>
                  <th className="px-6 py-3 text-sm font-medium">Teléfono</th>
                  <th className="px-6 py-3 text-sm font-medium">Admin ID</th>
                  <th className="px-6 py-3 text-sm font-medium">Admin Nombre</th>
                  <th className="px-6 py-3 text-sm font-medium text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredTiendas.map((t) => (
                  <tr key={t.tiendIdTiendaFisica} className="border-b hover:bg-gray-50 text-black">
                    <td className="px-6 py-4 whitespace-nowrap">{t.tiendIdTiendaFisica}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{t.tiendNombre}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{t.tiendDireccion}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{t.tiendTelefono}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{t.adminCodAdministrador}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {admins[t.adminCodAdministrador] || '-'}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => handleEdit(t)} className="text-blue-600 hover:text-blue-800">
                          <Edit size={18} />
                        </button>
                        <button onClick={() => handleDelete(t.tiendIdTiendaFisica)} className="text-red-600 hover:text-red-800">
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
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
                <h2 className="text-xl font-bold text-center mb-4 text-gray-800">
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

                  <input
                    type="number"
                    name="adminCodAdministrador"
                    placeholder="Código Admin"
                    value={currentTienda.adminCodAdministrador}
                    onChange={handleChange}
                    className="w-full mb-3 border px-3 py-2 rounded text-black"
                  />
                  {formErrors.adminCodAdministrador && (
                    <p className="text-red-500 text-sm">{formErrors.adminCodAdministrador}</p>
                  )}

                  <div className="flex justify-end gap-4 mt-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                    >
                      <XCircle size={18} className="inline mr-1" /> Cancelar
                    </button>
                    <button type="submit" className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800">
                      <Save size={18} className="inline mr-1" />
                      {currentTienda.tiendIdTiendaFisica ? 'Guardar' : 'Crear'}
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