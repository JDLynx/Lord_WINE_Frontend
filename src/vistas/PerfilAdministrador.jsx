import React, { useState, useEffect } from 'react';
// Importamos los íconos necesarios desde lucide-react
import { User, Mail, Shield, Edit, Key, Calendar, Home, Phone, Settings, ShoppingBag, Store, Boxes, LayoutGrid, BarChart, Users, Building, Package, ClipboardList, TrendingUp } from 'lucide-react';
// Importamos componentes reutilizables
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";

// Importamos el hook de navegación de React Router DOM
import { useNavigate } from 'react-router-dom';

// Importamos los estilos específicos para este componente.
// Si ya no se usa .bg-vistas-home aquí, puedes considerar eliminar este import si no hay otros estilos.
import "./PerfilAdministrador.css"; 

export default function PerfilAdministrador() {
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();

  // useEffect se ejecuta una vez al cargar el componente
  useEffect(() => {
    const fetchData = async () => {
      const adminCod = localStorage.getItem('adminCodAdministrador');

      if (!adminCod) {
        console.error("No se encontró el adminCodAdministrador en localStorage.");
        // Optionally, redirect to login or show an error message to the user
        // navigate('/login');
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/api/administradores/${adminCod}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        setProfileData({
          adminCodAdministrador: data.adminCodAdministrador,
          adminIdAdministrador: data.adminIdAdministrador,
          adminNombre: data.adminNombre,
          adminDireccion: data.adminDireccion,
          adminTelefono: data.adminTelefono,
          adminCorreoElectronico: data.adminCorreoElectronico,
          role: "Administrador" // Asignamos el rol manualmente ya que en el modelo no existe
        });

      } catch (error) {
        console.error("Error al cargar los datos del perfil:", error);
        // Set an error state to display to the user if needed
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once on mount

  // Function to redirect to the new edit profile view (already exists)
  const handleEditClick = () => {
    navigate('/editar-perfil'); // This will navigate to your general profile edit page
  };

  // NEW: Function to redirect to the change password view
  const handleChangePasswordClick = () => {
    navigate('/cambiar-contrasena'); // This will navigate to your password change page
  };

  // NEW: Handler for the management options
  const handleManagementClick = (path) => {
    navigate(path);
  };

  const managementOptions = [
    { name: 'Administradores', description: 'Ver y administrar otros administradores', icon: Users, path: '/administradores' },
    { name: 'Empleados', description: 'Crear, editar, asignar a tiendas e inventarios', icon: User, path: '/empleados' },
    { name: 'Tiendas Físicas', description: 'Crear, administrar datos básicos', icon: Store, path: '/tiendas-fisicas' },
    { name: 'Categorías y Productos', description: 'Crear, actualizar y organizar productos', icon: Package, path: '/productos' },
    { name: 'Inventario General y Tienda', description: 'Administrar existencias', icon: Boxes, path: '/inventario' },
    { name: 'Servicios Empresariales', description: 'Crear, actualizar y establecer precios', icon: Settings, path: '/servicios' },
    { name: 'Pedidos', description: 'Ver todos, cambiar estados, asignar empleados', icon: ClipboardList, path: '/pedidos' },
    { name: 'Gestión Admin. Inventario General', description: 'Ver qué administrador gestiona cada inventario', icon: LayoutGrid, path: '/gestion-admin-inventario' },
    { name: 'Gestión Empleado Inventario Tienda', description: 'Asignar o cambiar responsables de inventario en tiendas', icon: ShoppingBag, path: '/gestion-empleado-inventario' },
    { name: 'Ventas y Reportes', description: 'Ver detalles de ventas, productos vendidos, stock', icon: TrendingUp, path: '/reportes' },
  ];

  return (
    <>
      <div className="flex flex-col min-h-screen overflow-x-hidden"> 
        <Header />
        <BarraProductos />

        {/* Contenido principal - Ahora con las propiedades de fondo y paddings en Tailwind */}
        <main 
          className="flex-grow flex flex-col items-center w-full py-8 px-4 sm:px-8 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/img/Viñedo.jpg')" }}
        >
          <div className="max-w-6xl mx-auto w-full"> {/* Añadido w-full para asegurar que el contenido interno ocupe el ancho disponible del max-w-6xl */}
            {/* Título de la página */}
            <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">Perfil del Administrador</h1>

            {/* Verificamos si los datos del perfil están disponibles */}
            {profileData ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12"> {/* Añadido mb-12 para dar espacio antes de los botones */}

                {/* Tarjeta lateral con avatar y nombre */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center h-full">
                    <div className="w-32 h-32 bg-gradient-to-br from-red-600 to-red-800 rounded-full mx-auto mb-6 flex items-center justify-center shadow-md">
                      <User className="w-16 h-16 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{profileData.adminNombre}</h2>
                    <p className="text-red-700 font-semibold mb-4">{profileData.role}</p>
                  </div>
                </div>

                {/* Sección de información personal */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-2xl shadow-lg p-10 h-full">
                    <h3 className="text-xl font-bold text-gray-800 mb-8 border-b pb-4 border-gray-200">Información Personal</h3>

                    {/* Información organizada en dos columnas en pantallas medianas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-6">

                      {/* Código de administrador */}
                      <div className="flex items-start space-x-4">
                        <Shield className="w-6 h-6 text-red-500 mt-1" />
                        <div className="text-left">
                          <p className="text-sm text-gray-500">Código de Administrador</p>
                          <p className="font-semibold text-gray-800 text-lg">{profileData.adminCodAdministrador}</p>
                        </div>
                      </div>

                      {/* Identificación */}
                      <div className="flex items-start space-x-4">
                        <User className="w-6 h-6 text-red-500 mt-1" />
                        <div className="text-left">
                          <p className="text-sm text-gray-500">Identificación</p>
                          <p className="font-semibold text-gray-800 text-lg">{profileData.adminIdAdministrador}</p>
                        </div>
                      </div>

                      {/* Nombre */}
                      <div className="flex items-start space-x-4">
                        <User className="w-6 h-6 text-red-500 mt-1" />
                        <div className="text-left">
                          <p className="text-sm text-gray-500">Nombre Completo</p>
                          <p className="font-semibold text-gray-800 text-lg">{profileData.adminNombre}</p>
                        </div>
                      </div>

                      {/* Dirección */}
                      <div className="flex items-start space-x-4">
                        <Home className="w-6 h-6 text-red-500 mt-1" />
                        <div className="text-left">
                          <p className="text-sm text-gray-500">Dirección</p>
                          <p className="font-semibold text-gray-800 text-lg">{profileData.adminDireccion}</p>
                        </div>
                      </div>

                      {/* Teléfono */}
                      <div className="flex items-start space-x-4">
                        <Phone className="w-6 h-6 text-red-500 mt-1" />
                        <div className="text-left">
                          <p className="text-sm text-gray-500">Teléfono</p>
                          <p className="font-semibold text-gray-800 text-lg">{profileData.adminTelefono}</p>
                        </div>
                      </div>

                      {/* Correo electrónico */}
                      <div className="flex items-start space-x-4">
                        <Mail className="w-6 h-6 text-red-500 mt-1" />
                        <div className="text-left">
                          <p className="text-sm text-gray-500">Correo Electrónico</p>
                          <p className="font-semibold text-gray-800 text-lg">{profileData.adminCorreoElectronico}</p>
                        </div>
                      </div>

                      {/* Rol */}
                      <div className="flex items-start space-x-4">
                        <Shield className="w-6 h-6 text-red-500 mt-1" />
                        <div className="text-left">
                          <p className="text-sm text-gray-500">Rol</p>
                          <p className="font-semibold text-gray-800 text-lg">{profileData.role}</p>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            ) : (
                <div className="text-center text-gray-600 text-lg">Cargando información del perfil...</div>
            )}

            {/* Botones de acción */}
            <div className="flex justify-center space-x-6 mt-12 mb-12"> {/* Añadido mb-12 para dar espacio después de los botones */}
              {/* Botón para redirigir a la vista de edición */}
              <button
                onClick={handleEditClick}
                className="bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center space-x-2 text-lg"
              >
                <Edit className="w-5 h-5" />
                <span>Editar Perfil</span>
              </button>

              {/* Botón para cambiar contraseña - NOW WITH FUNCTIONALITY! */}
              <button
                onClick={handleChangePasswordClick}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center space-x-2 text-lg"
              >
                <Key className="w-5 h-5" />
                <span>Cambiar Contraseña</span>
              </button>
            </div>

            {/* NEW: Sección "Qué podría ver y administrar" */}
            <section className="bg-white rounded-2xl shadow-lg p-10 max-w-6xl mx-auto"> 
              <h3 className="text-xl font-bold text-gray-800 mb-8 border-b pb-4 border-gray-200">Qué podría ver y administrar</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {managementOptions.map((option) => (
                  <button
                    key={option.name}
                    onClick={() => handleManagementClick(option.path)}
                    className="flex flex-col items-center justify-center p-4 sm:p-6 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition-all duration-200 ease-in-out transform hover:scale-105 text-center"
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

        {/* Pie de página */}
        <Footer />
      </div>
    </>
  );
}
