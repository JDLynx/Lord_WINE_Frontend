import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Importamos los íconos necesarios desde lucide-react para el perfil y las funcionalidades
import {
  User, Mail, Phone, Home, CreditCard, // Para la información del perfil
  ShoppingCart, ClipboardList, Package, Briefcase, Store, Edit, Key // Para las funcionalidades y botones
} from 'lucide-react';

// Importamos componentes reutilizables
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from '../components/BarraProductos';

export default function PerfilCliente() {
  const navigate = useNavigate();
  // Estado para simular los datos del cliente (sin conexión a backend)
  const [clientData, setClientData] = useState(null);

  useEffect(() => {
    // Simular la carga de datos del cliente
    const simulatedClient = {
      clientCod: 'CLI001',
      clientId: '123456789',
      clientNombre: 'Sofía Isabel Ramírez',
      clientDireccion: 'Avenida Siempre Viva 742, Springfield',
      clientTelefono: '3159876543',
      clientCorreoElectronico: 'sofia.ramirez@example.com',
      lastLogin: '2025-06-22',
      role: 'Cliente'
    };

    // Usamos un setTimeout para simular una carga asíncrona de datos
    setTimeout(() => {
      setClientData(simulatedClient);
    }, 500); // Retraso de 500ms
  }, []);

  // Función para redirigir a la vista de edición de perfil del cliente
  const handleEditClick = () => {
    navigate('/editar-perfil-cliente'); // Ruta a crear para edición de perfil de cliente
  };

  // Función para redirigir a la vista de cambio de contraseña del cliente
  const handleChangePasswordClick = () => {
    navigate('/cambiar-contrasena-cliente'); // Ruta a crear para cambio de contraseña de cliente
  };

  // Handler para las opciones de gestión
  const handleManagementClick = (path) => {
    navigate(path);
  };

  // Definición de las opciones de gestión del cliente según la imagen
  const managementOptions = [
    { name: 'Su Perfil', description: 'Ver y actualizar sus datos básicos', icon: User, path: '/mi-perfil' },
    { name: 'Carrito de Compras', description: 'Crear y administrar productos en su carrito', icon: ShoppingCart, path: '/mi-carrito' },
    { name: 'Pedidos', description: 'Ver historial de pedidos, estado y detalles', icon: ClipboardList, path: '/mis-pedidos' },
    { name: 'Productos y Categorías', description: 'Ver catálogo general de productos', icon: Package, path: '/catalogo-productos' },
    { name: 'Servicios Empresariales', description: 'Ver servicios disponibles', icon: Briefcase, path: '/mis-servicios-empresariales' },
    { name: 'Tiendas Físicas', description: 'Consultar ubicaciones para retiro en tienda', icon: Store, path: '/mis-tiendas-fisicas' },
  ];

  return (
    <>
      <div className="flex flex-col min-h-screen overflow-x-hidden">
        <Header />
        <BarraProductos />

        <main
          className="flex-grow flex flex-col items-center w-full py-8 px-4 sm:px-8 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/img/Viñedo.jpg')" }} // Asegúrate de que esta ruta sea correcta
        >
          <div className="max-w-6xl mx-auto w-full">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">Perfil del Cliente</h1>

            {clientData ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {/* Tarjeta lateral con avatar y nombre */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center h-full">
                    <div className="w-32 h-32 bg-gradient-to-br from-red-500 to-red-700 rounded-full mx-auto mb-6 flex items-center justify-center shadow-md">
                      <User className="w-16 h-16 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{clientData.clientNombre}</h2>
                    <p className="text-red-700 font-semibold mb-4">{clientData.role}</p>
                    <p className="text-gray-600 text-sm mt-2 text-center">
                      <CreditCard className="inline-block w-4 h-4 mr-1 text-red-500" />
                      Último inicio: {clientData.lastLogin}
                    </p>
                  </div>
                </div>

                {/* Sección de información personal */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-2xl shadow-lg p-10 h-full">
                    <h3 className="text-xl font-bold text-gray-800 mb-8 border-b pb-4 border-gray-200">Información Personal</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-6">
                      <div className="flex items-start space-x-4">
                        <CreditCard className="w-6 h-6 text-red-500 mt-1" />
                        <div className="text-left">
                          <p className="text-sm text-gray-500">Código de Cliente</p>
                          <p className="font-semibold text-gray-800 text-lg">{clientData.clientCod}</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <User className="w-6 h-6 text-red-500 mt-1" />
                        <div className="text-left">
                          <p className="text-sm text-gray-500">Identificación</p>
                          <p className="font-semibold text-gray-800 text-lg">{clientData.clientId}</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <Home className="w-6 h-6 text-red-500 mt-1" />
                        <div className="text-left">
                          <p className="text-sm text-gray-500">Dirección</p>
                          <p className="font-semibold text-gray-800 text-lg">{clientData.clientDireccion}</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <Phone className="w-6 h-6 text-red-500 mt-1" />
                        <div className="text-left">
                          <p className="text-sm text-gray-500">Teléfono</p>
                          <p className="font-semibold text-gray-800 text-lg">{clientData.clientTelefono}</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <Mail className="w-6 h-6 text-red-500 mt-1" />
                        <div className="text-left">
                          <p className="text-sm text-gray-500">Correo Electrónico</p>
                          <p className="font-semibold text-gray-800 text-lg">{clientData.clientCorreoElectronico}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
                <div className="text-center text-gray-600 text-lg">Cargando información del perfil...</div>
            )}

            {/* Botones de acción - para el cliente */}
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

            {/* Sección "Qué podría ver y administrar" para el cliente */}
            <section className="bg-white rounded-2xl shadow-lg p-10 max-w-6xl mx-auto">
              <h3 className="text-xl font-bold text-gray-800 mb-8 border-b pb-4 border-gray-200">Qué podría ver y administrar</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
                {managementOptions.map((option) => (
                  <button
                    key={option.name}
                    onClick={() => handleManagementClick(option.path)}
                    className="flex flex-col items-center justify-center p-4 sm:p-6 bg-red-50 rounded-lg shadow-sm hover:bg-red-100 transition-all duration-200 ease-in-out transform hover:scale-105 text-center"
                  >
                    <option.icon className="w-7 h-7 sm:w-8 sm:h-8 text-red-600 mb-2 sm:mb-3" />
                    <span className="font-semibold text-gray-900 text-base sm:text-lg mb-1">{option.name}</span>
                    <p className="text-xs sm:text-sm text-gray-600">{option.description}</p>
                  </button>
                ))}
              </div>
            </section>

          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}