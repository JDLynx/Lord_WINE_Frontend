import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from '../components/BarraProductos';
import { User, Mail, Phone, Home, Edit, Shield } from 'lucide-react';

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
      console.log('EditarPerfilAdministrador: ID de administrador obtenido de localStorage:', adminCod);

      if (!adminCod) {
        setError('No se encontró el código de administrador en localStorage. Por favor, asegúrese de haber iniciado sesión.');
        setLoading(false);
        return;
      }

      try {
        const apiUrl = `http://localhost:3000/api/administradores/${adminCod}`;
        console.log('EditarPerfilAdministrador: Intentando obtener datos desde la URL:', apiUrl);
        const response = await fetch(apiUrl);

        console.log('EditarPerfilAdministrador: Estado de la respuesta de la API:', response.status, response.statusText);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('EditarPerfilAdministrador: Error en la respuesta de la API:', errorText);
          throw new Error(`Error al obtener datos del administrador: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const data = await response.json();
        console.log('EditarPerfilAdministrador: Datos recibidos de la API:', data);

        setAdminData({
          adminNombre: data.adminNombre || '',
          adminIdAdministrador: data.adminIdAdministrador || '',
          adminDireccion: data.adminDireccion || '',
          adminTelefono: data.adminTelefono || '',
          adminCorreoElectronico: data.adminCorreoElectronico || '',
        });
        console.log('EditarPerfilAdministrador: Datos del administrador asignados al estado:', {
          adminNombre: data.adminNombre || '',
          adminIdAdministrador: data.adminIdAdministrador || '',
          adminDireccion: data.adminDireccion || '',
          adminTelefono: data.adminTelefono || '',
          adminCorreoElectronico: data.adminCorreoElectronico || '',
        });

      } catch (error) {
        console.error("EditarPerfilAdministrador: Error al cargar datos del administrador:", error);
        setError(error.message || 'Error al obtener datos del administrador. Verifique la consola para más detalles.');
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

    console.log('EditarPerfilAdministrador: Simulando guardado de cambios del perfil de administrador (solo frontend):', adminData);
    
    setTimeout(() => {
      setSuccessMessage('¡Perfil de administrador actualizado exitosamente (simulado)!');
      setLoading(false);

      setTimeout(() => {
        navigate('/perfil');
      }, 1500);
      
    }, 1000);
  };

  return (
    <>
      <div className="flex flex-col min-h-screen overflow-x-hidden">
        <Header />
        <BarraProductos />

        <main
          className="flex-grow flex flex-col items-center w-full py-8 px-4 sm:px-8 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/img/Viñedo.jpg')" }}
        >
          <div className="max-w-4xl mx-auto w-full bg-white rounded-2xl shadow-lg p-8 sm:p-10">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center border-b pb-4 border-gray-200">
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
                {/* Campo Nombre */}
                <div className="col-span-1">
                  <label htmlFor="adminNombre" className="block text-sm font-medium text-gray-700 mb-1">
                    <User className="inline-block w-4 h-4 mr-2 text-red-500" />Nombre Completo
                  </label>
                  <input
                    type="text"
                    id="adminNombre"
                    name="adminNombre"
                    value={adminData.adminNombre}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-base text-gray-900"
                    required
                  />
                </div>

                <div className="col-span-1">
                  <label htmlFor="adminIdAdministrador" className="block text-sm font-medium text-gray-700 mb-1">
                    <User className="inline-block w-4 h-4 mr-2 text-red-500" />Identificación
                  </label>
                  <input
                    type="text"
                    id="adminIdAdministrador"
                    name="adminIdAdministrador"
                    value={adminData.adminIdAdministrador}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-base cursor-not-allowed text-gray-900"
                    readOnly // La identificación generalmente no se edita
                  />
                </div>

                <div className="col-span-1">
                  <label htmlFor="adminDireccion" className="block text-sm font-medium text-gray-700 mb-1">
                    <Home className="inline-block w-4 h-4 mr-2 text-red-500" />Dirección
                  </label>
                  <input
                    type="text"
                    id="adminDireccion"
                    name="adminDireccion"
                    value={adminData.adminDireccion}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-base text-gray-900"
                    required
                  />
                </div>

                <div className="col-span-1">
                  <label htmlFor="adminTelefono" className="block text-sm font-medium text-gray-700 mb-1">
                    <Phone className="inline-block w-4 h-4 mr-2 text-red-500" />Teléfono
                  </label>
                  <input
                    type="tel"
                    id="adminTelefono"
                    name="adminTelefono"
                    value={adminData.adminTelefono}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-base text-gray-900"
                    required
                  />
                </div>

                <div className="col-span-full">
                  <label htmlFor="adminCorreoElectronico" className="block text-sm font-medium text-gray-700 mb-1">
                    <Mail className="inline-block w-4 h-4 mr-2 text-red-500" />Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="adminCorreoElectronico"
                    name="adminCorreoElectronico"
                    value={adminData.adminCorreoElectronico}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-base text-gray-900"
                    required
                  />
                </div>

                <div className="col-span-full flex justify-center space-x-6 mt-6">
                  <button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center space-x-2 text-lg"
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
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center space-x-2 text-lg"
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
    </>
  );
}
