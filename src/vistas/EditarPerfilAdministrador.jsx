import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from '../components/BarraProductos';
import { User, Mail, Phone, Home, Edit } from 'lucide-react';

export default function EditarPerfilAdministrador() {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState({
    adminNombre: '',
    adminIdAdministrador: '',
    adminDireccion: '',
    adminTelefono: '',
    adminCorreoElectronico: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchAdminData = async () => {
      const adminCod = localStorage.getItem('adminCodAdministrador');

      if (!adminCod) {
        setError('No se encontró el código de administrador en localStorage. Por favor, asegúrese de haber iniciado sesión.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://lord-wine-backend.onrender.com/api/administradores/${adminCod}`);

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error al obtener datos del administrador: ${response.status} - ${errorText}`);
        }

        const data = await response.json();

        setAdminData({
          adminNombre: data.adminNombre || '',
          adminIdAdministrador: data.adminIdAdministrador || '',
          adminDireccion: data.adminDireccion || '',
          adminTelefono: data.adminTelefono || '',
          adminCorreoElectronico: data.adminCorreoElectronico || '',
        });
      } catch (error) {
        console.error("Error al cargar datos del administrador:", error);
        setError(error.message || 'Error al obtener datos del administrador.');
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    const adminCod = localStorage.getItem('adminCodAdministrador');

    if (!adminCod) {
      setError('No se encontró el código de administrador. Intenta volver a iniciar sesión.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`https://lord-wine-backend.onrender.com/api/administradores/${adminCod}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error al actualizar el perfil');
      }

      setSuccessMessage('¡Perfil de administrador actualizado exitosamente!');

      setTimeout(() => {
        navigate('/perfil');
      }, 1500);
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
      setError(error.message || 'Ocurrió un error al actualizar el perfil.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      <BarraProductos />

      <main
        className="flex-grow flex flex-col items-center w-full py-8 px-4 sm:px-8 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/img/Viñedo.jpg')" }}
      >
        <div className="max-w-4xl mx-auto w-full bg-white rounded-2xl shadow-lg p-8 sm:p-10">
          <h1 className="text-2xl font-semibold text-black mb-8 text-center border-b pb-4 border-gray-200">
            Editar Perfil de Administrador
          </h1>

          {loading ? (
            <div className="flex flex-col items-center justify-center p-10">
              <AiOutlineLoading3Quarters className="w-12 h-12 text-red-600 animate-spin" />
              <p className="mt-4 text-gray-600 text-lg">Cargando datos para edición...</p>
            </div>
          ) : error ? (
            <div className="text-center text-red-600 font-bold mb-4">{error}</div>
          ) : successMessage ? (
            <div className="text-center text-green-600 font-bold mb-4">{successMessage}</div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
              <div className="col-span-1">
                <label htmlFor="adminNombre" className="block text-lg font-medium text-black mb-1">
                  <User className="inline-block w-4 h-4 mr-2 text-[#921913]" />Nombre Completo
                </label>
                <input
                  type="text"
                  id="adminNombre"
                  name="adminNombre"
                  value={adminData.adminNombre}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-base text-black"
                  required
                />
              </div>

              <div className="col-span-1">
                <label htmlFor="adminIdAdministrador" className="block text-lg font-medium text-black mb-1">
                  <User className="inline-block w-4 h-4 mr-2 text-[#921913]" />Identificación
                </label>
                <input
                  type="text"
                  id="adminIdAdministrador"
                  name="adminIdAdministrador"
                  value={adminData.adminIdAdministrador}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-base cursor-not-allowed text-black"
                  readOnly
                />
              </div>

              <div className="col-span-1">
                <label htmlFor="adminDireccion" className="block text-lg font-medium text-black mb-1">
                  <Home className="inline-block w-4 h-4 mr-2 text-[#921913]" />Dirección
                </label>
                <input
                  type="text"
                  id="adminDireccion"
                  name="adminDireccion"
                  value={adminData.adminDireccion}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-base text-black"
                  required
                />
              </div>

              <div className="col-span-1">
                <label htmlFor="adminTelefono" className="block text-lg font-medium text-black mb-1">
                  <Phone className="inline-block w-4 h-4 mr-2 text-[#921913]" />Teléfono
                </label>
                <input
                  type="tel"
                  id="adminTelefono"
                  name="adminTelefono"
                  value={adminData.adminTelefono}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-base text-black"
                  required
                />
              </div>

              <div className="col-span-full">
                <label htmlFor="adminCorreoElectronico" className="block text-lg font-medium text-black mb-1">
                  <Mail className="inline-block w-4 h-4 mr-2 text-[#921913]" />Correo Electrónico
                </label>
                <input
                  type="email"
                  id="adminCorreoElectronico"
                  name="adminCorreoElectronico"
                  value={adminData.adminCorreoElectronico}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-base cursor-not-allowed text-black"
                  readOnly
                />
              </div>

              <div className="col-span-full flex justify-center space-x-6 mt-6">
                <button
                  type="submit"
                  className="bg-[#921913] hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center space-x-2 text-lg"
                  disabled={loading}
                >
                  {loading ? (
                    <AiOutlineLoading3Quarters className="w-5 h-5 animate-spin" />
                  ) : (
                    <Edit className="w-5 h-5" />
                  )}
                  <span>{loading ? 'Guardando...' : 'Guardar Cambios'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/perfil')}
                  className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center space-x-2 text-lg"
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}