import React, { useState, useEffect } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { User, Mail, Home, Phone, ShoppingBag, Store, Boxes, LayoutGrid, ClipboardList, Package, Users, Eye } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";
import { useNavigate } from 'react-router-dom';
import './PerfilEmpleado.css';

export default function PerfilEmpleado() {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployeeData = async () => {
      const employeeCod = localStorage.getItem('employeeCod');
      if (!employeeCod) {
        setError('No hay employeeCod en localStorage. Redirigiendo al login...');
        navigate("/login");
        setLoading(false);
        return;
      }

      try {
        const url = `http://localhost:3000/api/empleados/${employeeCod}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error al obtener datos del empleado (status ${response.status})`);
        }
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error(error);
        setError(error.message || "Error al obtener datos del empleado");
      } finally {
        setLoading(false);
      }
    };
    fetchEmployeeData();
  }, [navigate]);

  const handleManagementClick = (path) => {
    navigate(path);
  };
  
  const managementOptions = [
    { name: 'Clientes', description: 'Ver datos básicos para entrega y comunicación', icon: Users, path: '/clientes-empleado' },
    { name: 'Pedidos', description: 'Ver, actualizar estado y asignarse pedidos', icon: ClipboardList, path: '/pedidos-empleado' },
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
        <main
          className="flex-grow flex flex-col items-center w-full py-8 px-4 sm:px-8 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/img/Viñedo.jpg')" }}
        >
          <div className="max-w-6xl mx-auto w-full">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">Perfil Empleado</h1>

            {error && (
              <div className="text-center text-red-600 font-bold">{error}</div>
            )}

            {loading ? (
              <div className="flex flex-col items-center justify-center p-10">
                <AiOutlineLoading3Quarters className="w-12 h-12 text-red-600 animate-spin" />
                <p className="mt-4 text-gray-600 text-lg">Cargando información del perfil...</p>
              </div>
            ) : profileData ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center h-full">
                    <div className="w-32 h-32 bg-gradient-to-br from-red-600 to-red-800 rounded-full mx-auto mb-6 flex items-center justify-center shadow-md">
                      <User className="w-16 h-16 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{profileData.emplNombre}</h2>
                    <p className="text-red-700 font-semibold mb-4">Empleado</p>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <div className="bg-white rounded-2xl shadow-lg p-10 h-full">
                    <h3 className="text-xl font-bold text-gray-800 mb-8 border-b pb-4 border-gray-200">Información Personal</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-6">
                      <div className="flex items-start space-x-4">
                        <User className="w-6 h-6 text-red-500 mt-1" />
                        <div className="text-left">
                          <p className="text-sm text-gray-500">Código de Empleado</p>
                          <p className="font-semibold text-gray-800 text-lg">{profileData.emplCodEmpleado}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <User className="w-6 h-6 text-red-500 mt-1" />
                        <div className="text-left">
                          <p className="text-sm text-gray-500">Identificación</p>
                          <p className="font-semibold text-gray-800 text-lg">{profileData.emplIdEmpleado}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <User className="w-6 h-6 text-red-500 mt-1" />
                        <div className="text-left">
                          <p className="text-sm text-gray-500">Nombre Completo</p>
                          <p className="font-semibold text-gray-800 text-lg">{profileData.emplNombre}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <Home className="w-6 h-6 text-red-500 mt-1" />
                        <div className="text-left">
                          <p className="text-sm text-gray-500">Dirección</p>
                          <p className="font-semibold text-gray-800 text-lg">{profileData.emplDireccion}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <Phone className="w-6 h-6 text-red-500 mt-1" />
                        <div className="text-left">
                          <p className="text-sm text-gray-500">Teléfono</p>
                          <p className="font-semibold text-gray-800 text-lg">{profileData.emplTelefono}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <Mail className="w-6 h-6 text-red-500 mt-1" />
                        <div className="text-left">
                          <p className="text-sm text-gray-500">Correo Electrónico</p>
                          <p className="font-semibold text-gray-800 text-lg">{profileData.emplCorreoElectronico}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              !error && <div className="text-center text-gray-600 text-lg">No se encontraron datos para este empleado</div>
            )}

            {!loading && profileData && (
              <section className="mt-12 bg-white rounded-2xl shadow-lg p-10 max-w-6xl mx-auto">
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
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}