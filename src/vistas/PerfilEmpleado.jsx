import React, { useState, useEffect } from 'react';
// Importamos los íconos necesarios desde lucide-react
import { User, Mail, Home, Phone, ShoppingBag, Store, Boxes, LayoutGrid, ClipboardList, Package, Users, Eye } from 'lucide-react'; 
// Importamos componentes reutilizables
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";

// Importamos el hook de navegación de React Router DOM
import { useNavigate } from 'react-router-dom';

// Importamos los estilos específicos para este componente (si es necesario)
import "./PerfilEmpleado.css"; 

export default function PerfilEmpleado() {
    const [profileData, setProfileData] = useState(null);
    const navigate = useNavigate();

    // useEffect se ejecuta una vez al cargar el componente
    useEffect(() => {
        // Simulamos la carga de datos del perfil del empleado
        // En una aplicación real, esto sería una llamada a tu backend:
        // const employeeCod = localStorage.getItem('employeeCod');
        // if (employeeCod) { fetch(`http://localhost:3000/api/empleados/${employeeCod}`) ... }
        
        // Datos simulados para el perfil del empleado
        const simulatedData = {
        employeeCod: 'EMP001',
        employeeId: '1061779345',
        employeeName: 'Ana María Velásquez',
        employeeAddress: 'Calle 10 #5-20, Popayán',
        employeePhone: '3101234567',
        employeeEmail: 'ana.maria@example.com',
        role: "Responsable de Operación en Tienda",
        storeAssigned: "Tienda Centro" // Simulate assigned store for inventory/product views
        };
        
        // Simulamos un pequeño retraso para la carga de datos
        setTimeout(() => {
        setProfileData(simulatedData);
        }, 500); 

    }, []); // Empty dependency array means this runs once on mount

    // Handler para las opciones de gestión
    const handleManagementClick = (path) => {
        navigate(path);
    };

    const managementOptions = [
        { name: 'Clientes', description: 'Ver datos básicos para entrega y comunicación', icon: Users, path: '/clientes-empleado' },
        { name: 'Pedidos', description: 'Ver, actualizar estado, asignarse pedidos', icon: ClipboardList, path: '/pedidos-empleado' },
        { name: 'Inventario de Tienda', description: 'Ver inventario de la tienda donde trabaja', icon: Boxes, path: '/inventario-tienda' },
        { name: 'Gestión Empleado Inventario Tienda', description: 'Ver qué inventario gestiona junto a otros empleados', icon: LayoutGrid, path: '/gestion-empleado-inventario-tienda' },
        { name: 'Productos en Tienda', description: 'Ver productos disponibles', icon: Package, path: '/productos-tienda' },
        { name: 'Detalles de Pedidos', description: 'Ver detalles para preparación y entrega', icon: Eye, path: '/detalles-pedidos-empleado' },
    ];

    return (
        <>
        <div className="flex flex-col min-h-screen overflow-x-hidden"> 
            <Header />
            <BarraProductos />

            {/* Contenido principal con imagen de fondo */}
            <main 
            className="flex-grow flex flex-col items-center w-full py-8 px-4 sm:px-8 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/img/Viñedo.jpg')" }} // Using a generic vineyard image from your project context
            >
            <div className="max-w-6xl mx-auto w-full"> 
                {/* Título de la página */}
                <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">Perfil del Empleado</h1>

                {/* Verificamos si los datos del perfil están disponibles */}
                {profileData ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">

                    {/* Tarjeta lateral con avatar y nombre */}
                    <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center h-full">
                        <div className="w-32 h-32 bg-gradient-to-br from-red-600 to-red-800 rounded-full mx-auto mb-6 flex items-center justify-center shadow-md"> {/* Changed color to red for employee */}
                        <User className="w-16 h-16 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{profileData.employeeName}</h2>
                        <p className="text-red-700 font-semibold mb-4">{profileData.role}</p> {/* Changed color for role */}
                        {profileData.storeAssigned && (
                        <p className="text-gray-600 font-medium text-lg flex items-center space-x-2">
                            <Store className="w-5 h-5 text-gray-500" />
                            <span>Tienda: {profileData.storeAssigned}</span>
                        </p>
                        )}
                    </div>
                    </div>

                    {/* Sección de información personal */}
                    <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl shadow-lg p-10 h-full">
                        <h3 className="text-xl font-bold text-gray-800 mb-8 border-b pb-4 border-gray-200">Información Personal</h3>

                        {/* Información organizada en dos columnas en pantallas medianas */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-6">

                        {/* Código de Empleado */}
                        <div className="flex items-start space-x-4">
                            <User className="w-6 h-6 text-red-500 mt-1" />
                            <div className="text-left">
                            <p className="text-sm text-gray-500">Código de Empleado</p>
                            <p className="font-semibold text-gray-800 text-lg">{profileData.employeeCod}</p>
                            </div>
                        </div>

                        {/* Identificación */}
                        <div className="flex items-start space-x-4">
                            <User className="w-6 h-6 text-red-500 mt-1" />
                            <div className="text-left">
                            <p className="text-sm text-gray-500">Identificación</p>
                            <p className="font-semibold text-gray-800 text-lg">{profileData.employeeId}</p>
                            </div>
                        </div>

                        {/* Nombre */}
                        <div className="flex items-start space-x-4">
                            <User className="w-6 h-6 text-red-500 mt-1" />
                            <div className="text-left">
                            <p className="text-sm text-gray-500">Nombre Completo</p>
                            <p className="font-semibold text-gray-800 text-lg">{profileData.employeeName}</p>
                            </div>
                        </div>

                        {/* Dirección */}
                        <div className="flex items-start space-x-4">
                            <Home className="w-6 h-6 text-red-500 mt-1" />
                            <div className="text-left">
                            <p className="text-sm text-gray-500">Dirección</p>
                            <p className="font-semibold text-gray-800 text-lg">{profileData.employeeAddress}</p>
                            </div>
                        </div>

                        {/* Teléfono */}
                        <div className="flex items-start space-x-4">
                            <Phone className="w-6 h-6 text-red-500 mt-1" />
                            <div className="text-left">
                            <p className="text-sm text-gray-500">Teléfono</p>
                            <p className="font-semibold text-gray-800 text-lg">{profileData.employeePhone}</p>
                            </div>
                        </div>

                        {/* Correo electrónico */}
                        <div className="flex items-start space-x-4">
                            <Mail className="w-6 h-6 text-red-500 mt-1" />
                            <div className="text-left">
                            <p className="text-sm text-gray-500">Correo Electrónico</p>
                            <p className="font-semibold text-gray-800 text-lg">{profileData.employeeEmail}</p>
                            </div>
                        </div>

                        {/* Rol */}
                        <div className="flex items-start space-x-4">
                            <Store className="w-6 h-6 text-red-500 mt-1" />
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

                {/* NEW: Sección "Qué podría ver y administrar" para el empleado */}
                <section className="mt-12 bg-white rounded-2xl shadow-lg p-10 max-w-6xl mx-auto"> 
                <h3 className="text-xl font-bold text-gray-800 mb-8 border-b pb-4 border-gray-200">Qué podría ver y administrar</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {managementOptions.map((option) => (
                    <button
                        key={option.name}
                        onClick={() => handleManagementClick(option.path)}
                        className="flex flex-col items-center justify-center p-4 sm:p-6 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition-all duration-200 ease-in-out transform hover:scale-105 text-center"
                    >
                        <option.icon className="w-7 h-7 sm:w-8 sm:h-8 text-red-600 mb-2 sm:mb-3" /> {/* Changed color to red for employee icons */}
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