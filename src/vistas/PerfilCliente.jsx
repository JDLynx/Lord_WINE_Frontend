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
        const response = await fetch(`https://lord-wine-backend.onrender.com/api/clientes/${user.id}`);
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
    { name: 'Carrito de Compras', description: 'Crear y administrar productos en su carrito', icon: ShoppingCart, path: '/carrito-compras' },
    { name: 'Pedidos', description: 'Ver historial de pedidos, estado y detalles', icon: ClipboardList, path: '/mis-pedidos' },
  ];

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      <BarraProductos />

      <main className="flex-grow flex flex-col items-center w-full py-8 px-4 sm:px-8 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/img/Viñedo.jpg')" }}>
        <div className="max-w-6xl mx-auto w-full">
          <h1 className="text-3xl font-semibold text-black mb-8 text-center">Perfil Cliente</h1>

          {error && <div className="text-center text-[#921913] font-semibold">{error}</div>}

          {loading ? (
            <div className="flex flex-col items-center justify-center p-10">
              <AiOutlineLoading3Quarters className="w-12 h-12 text-[#921913] animate-spin" />
              <p className="mt-4 text-gray-600 text-lg">Cargando información del perfil...</p>
            </div>
          ) : clientData ? (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center h-full">
                    <div className="w-32 h-32 bg-gradient-to-br from-red-500 to-[#921913] rounded-full mx-auto mb-6 flex items-center justify-center shadow-md">
                      <User className="w-16 h-16 text-white" />
                    </div>
                    <h2 className="text-2xl font-semibold text-black mb-2">{clientData.clNombre}</h2>
                    <p className="text-[#921913] font-semibold mb-4">Cliente</p>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <div className="bg-white rounded-2xl shadow-lg p-10 h-full">
                    <h3 className="text-2xl font-semibold text-black mb-8 border-b pb-4 border-gray-200">Información Personal</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-6">
                      <div className="flex items-start space-x-4">
                        <CreditCard className="w-6 h-6 text-[#921913] mt-1" />
                        <div className="text-left">
                          <p className="font-semibold text-lg text-black">Código de Cliente</p>
                          <p className=" text-black text-base">{clientData.clCodCliente}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <User className="w-6 h-6 text-[#921913] mt-1" />
                        <div className="text-left">
                          <p className="font-semibold text-lg text-black">Identificación</p>
                          <p className=" text-black text-base">{clientData.clIdCliente}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <Home className="w-6 h-6 text-[#921913] mt-1" />
                        <div className="text-left">
                          <p className="font-semibold text-base text-black">Dirección</p>
                          <p className=" text-black text-base">{clientData.clDireccion}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <Phone className="w-6 h-6 text-[#921913] mt-1" />
                        <div className="text-left">
                          <p className="font-semibold text-lg text-black">Teléfono</p>
                          <p className=" text-black text-base">{clientData.clTelefono}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <Mail className="w-6 h-6 text-[#921913] mt-1" />
                        <div className="text-left">
                          <p className="font-semibold text-lg text-black">Correo Electrónico</p>
                          <p className=" text-black text-base">{clientData.clCorreoElectronico}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center space-x-6 mt-12 mb-12">
                <button
                  onClick={handleEditClick}
                  className="bg-[#921913] hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center space-x-2 text-lg"
                >
                  <Edit className="w-5 h-5" />
                  <span>Editar Perfil</span>
                </button>
                <button
                  onClick={handleChangePasswordClick}
                  className="bg-white hover:bg-gray-100 text-black font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center space-x-2 text-lg"
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
                      className="flex flex-col items-center justify-center p-4 sm:p-6 bg-white rounded-lg shadow-sm hover:bg-gray-100 transition-all duration-200 ease-in-out transform hover:scale-105 text-center"
                    >
                      <option.icon className="w-7 h-7 text-[#921913] mb-2" />
                      <span className="font-semibold text-black text-lg mb-1">{option.name}</span>
                      <p className="text-base text-black">{option.description}</p>
                    </button>
                  ))}
                </div>
              </section>
            </>
          ) : (
            !error && <div className="text-center text-black text-lg">No se encontraron datos para este cliente</div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
