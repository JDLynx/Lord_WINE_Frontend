import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { User, Mail, Phone, Home, CreditCard, ShoppingCart, ClipboardList, Package, Briefcase, Store, Edit, Key } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from '../components/BarraProductos';
import { AuthContext } from '../context/AuthContext';

export default function PerfilCliente() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [clientData, setClientData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== "Cliente") {
      setError("No hay sesión activa como cliente.");
      setLoading(false);
      return;
    }

    const fetchClientData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/clientes/${user.id}`);
        if (!response.ok) throw new Error('Error al obtener datos del cliente');
        const data = await response.json();
        setClientData(data);
      } catch (err) {
        setError(err.message || 'Error al obtener datos del cliente');
      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, [user]);

  const handleEditClick = () => navigate('/editar-perfil-cliente');
  const handleChangePasswordClick = () => navigate('/cambiar-contrasena-cliente');
  const handleManagementClick = (path) => navigate(path);

  const managementOptions = [
    { name: 'Su Perfil', description: 'Ver y actualizar sus datos básicos', icon: User, path: '/mi-perfil' },
    { name: 'Carrito de Compras', description: 'Crear y administrar productos en su carrito', icon: ShoppingCart, path: '/carrito-compras' },
    { name: 'Pedidos', description: 'Ver historial de pedidos, estado y detalles', icon: ClipboardList, path: '/mis-pedidos' },
    { name: 'Productos y Categorías', description: 'Ver catálogo general de productos', icon: Package, path: '/catalogo-productos' },
    { name: 'Servicios Empresariales', description: 'Ver servicios disponibles', icon: Briefcase, path: '/mis-servicios-empresariales' },
    { name: 'Tiendas Físicas', description: 'Consultar ubicaciones para retiro en tienda', icon: Store, path: '/mis-tiendas-fisicas' },
  ];

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      <BarraProductos />

      <main className="flex-grow flex flex-col items-center w-full py-8 px-4 sm:px-8 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/img/Viñedo.jpg')" }}>
        <div className="max-w-6xl mx-auto w-full">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">Perfil Cliente</h1>

          {error && <div className="text-center text-red-600 font-bold">{error}</div>}

          {loading ? (
            <div className="flex flex-col items-center justify-center p-10">
              <AiOutlineLoading3Quarters className="w-12 h-12 text-red-600 animate-spin" />
              <p className="mt-4 text-gray-600 text-lg">Cargando información del perfil...</p>
            </div>
          ) : clientData ? (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center h-full">
                    <div className="w-32 h-32 bg-gradient-to-br from-red-500 to-red-700 rounded-full mx-auto mb-6 flex items-center justify-center shadow-md">
                      <User className="w-16 h-16 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{clientData.clNombre}</h2>
                    <p className="text-red-700 font-semibold mb-4">Cliente</p>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <div className="bg-white rounded-2xl shadow-lg p-10 h-full">
                    <h3 className="text-xl font-bold text-gray-800 mb-8 border-b pb-4 border-gray-200">Información Personal</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-6">
                      <div className="flex items-start space-x-4">
                        <CreditCard className="w-6 h-6 text-red-500 mt-1" />
                        <div className="text-left">
                          <p className="text-sm text-gray-500">Código de Cliente</p>
                          <p className="font-semibold text-gray-800 text-lg">{clientData.clCodCliente}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <User className="w-6 h-6 text-red-500 mt-1" />
                        <div className="text-left">
                          <p className="text-sm text-gray-500">Identificación</p>
                          <p className="font-semibold text-gray-800 text-lg">{clientData.clIdCliente}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <Home className="w-6 h-6 text-red-500 mt-1" />
                        <div className="text-left">
                          <p className="text-sm text-gray-500">Dirección</p>
                          <p className="font-semibold text-gray-800 text-lg">{clientData.clDireccion}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <Phone className="w-6 h-6 text-red-500 mt-1" />
                        <div className="text-left">
                          <p className="text-sm text-gray-500">Teléfono</p>
                          <p className="font-semibold text-gray-800 text-lg">{clientData.clTelefono}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <Mail className="w-6 h-6 text-red-500 mt-1" />
                        <div className="text-left">
                          <p className="text-sm text-gray-500">Correo Electrónico</p>
                          <p className="font-semibold text-gray-800 text-lg">{clientData.clCorreoElectronico}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center space-x-6 mt-12 mb-12">
                <button
                  onClick={handleEditClick}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center space-x-2 text-lg"
                >
                  <Edit className="w-5 h-5" />
                  <span>Editar Perfil</span>
                </button>
                <button
                  onClick={handleChangePasswordClick}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center space-x-2 text-lg"
                >
                  <Key className="w-5 h-5" />
                  <span>Cambiar Contraseña</span>
                </button>
              </div>

              <section className="bg-white rounded-2xl shadow-lg p-10 max-w-6xl mx-auto">
                <h3 className="text-xl font-bold text-gray-800 mb-8 border-b pb-4 border-gray-200">Qué podría ver y administrar</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                  {managementOptions.map((option) => (
                    <button
                      key={option.name}
                      onClick={() => handleManagementClick(option.path)}
                      className="flex flex-col items-center justify-center p-4 sm:p-6 bg-red-50 rounded-lg shadow-sm hover:bg-red-100 transition-all duration-200 ease-in-out transform hover:scale-105 text-center"
                    >
                      <option.icon className="w-7 h-7 text-red-600 mb-2" />
                      <span className="font-semibold text-gray-900 text-base mb-1">{option.name}</span>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </button>
                  ))}
                </div>
              </section>
            </>
          ) : (
            !error && <div className="text-center text-gray-600 text-lg">No se encontraron datos para este cliente</div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}