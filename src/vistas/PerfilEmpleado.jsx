import React, { useState, useEffect } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import {
  User, Mail, Home, Phone, Store, Boxes, LayoutGrid,
  ClipboardList, Package, Users, Eye, Edit, Key
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";
import { useNavigate } from 'react-router-dom';

export default function PerfilEmpleado() {
  const [profileData, setProfileData] = useState(null);
  const [tiendaId, setTiendaId] = useState(null);
  const [tiendaNombre, setTiendaNombre] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployeeData = async () => {
      const employeeCod = localStorage.getItem('employeeCod');
      if (!employeeCod) {
        setError('No hay employeeCod en localStorage. Redirigiendo al login...');
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(`https://lord-wine-backend.onrender.com/api/empleados/${employeeCod}`);
        if (!response.ok) throw new Error('Error al obtener datos del empleado');
        const data = await response.json();
        setProfileData(data);

        const relacionesResponse = await fetch(`https://lord-wine-backend.onrender.com/api/trabaja-empleado-tienda/`);
        if (!relacionesResponse.ok) throw new Error('Error al obtener relaciones');
        const relaciones = await relacionesResponse.json();

        const relacion = relaciones.find(rel => rel.emplCodEmpleado === parseInt(employeeCod));
        if (relacion) {
          setTiendaId(relacion.tiendIdTiendaFisica);

          const tiendasResponse = await fetch(`https://lord-wine-backend.onrender.com/api/tiendas-fisicas/`);
          if (!tiendasResponse.ok) throw new Error('Error al obtener tiendas físicas');
          const tiendas = await tiendasResponse.json();

          const tienda = tiendas.find(t => t.tiendIdTiendaFisica === relacion.tiendIdTiendaFisica);
          if (tienda) {
            setTiendaNombre(tienda.tiendNombre);
          }
        }

      } catch (err) {
        console.error("Error al cargar perfil del empleado:", err);
        setError('No se pudo cargar la información del empleado.');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, [navigate]);

  const handleEditClick = () => {
    navigate('/editar-perfil-empleado');
  };

  const handleChangePasswordClick = () => {
    navigate('/cambiar-contrasena-empleado');
  };

  const handleManagementClick = (path) => {
    navigate(path);
  };

  const managementOptions = [
    { name: 'Clientes', description: 'Gestión de clientes', icon: Users, path: '/clientes-empleado' },
    { name: 'Pedidos', description: 'Gestión de pedidos', icon: ClipboardList, path: '/pedidos-empleado' },
    { name: 'Inventario Tienda', description: 'Gestión de inventario tienda', icon: Boxes, path: '/inventario-tienda' }
  ];

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      <BarraProductos />
      <main
        className="flex-grow flex flex-col items-center w-full py-8 px-4 sm:px-8 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/img/Viñedo.jpg')" }}
      >
        <div className="max-w-6xl mx-auto w-full">
          <h1 className="text-3xl font-semibold text-black mb-8 text-center">Perfil Empleado</h1>

          {error && <div className="text-center text-red-600 font-bold">{error}</div>}

          {loading ? (
            <div className="flex flex-col items-center justify-center p-10">
              <AiOutlineLoading3Quarters className="w-12 h-12 text-[#921913] animate-spin" />
              <p className="mt-4 text-black text-lg">Cargando información del perfil...</p>
            </div>
          ) : profileData ? (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-[#921913] to-[#921913] rounded-full mb-6 flex items-center justify-center">
                      <User className="w-16 h-16 text-white" />
                    </div>
                    <h2 className="text-2xl font-semibold text-black">{profileData.emplNombre}</h2>
                    <p className="text-[#921913] font-semibold">Empleado</p>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-2xl shadow-lg p-10">
                    <h3 className="text-2xl font-semibold text-black mb-8 border-b pb-4 border-gray-200">Información Personal</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-6">
                      <InfoItem label="Código de Empleado" value={profileData.emplCodEmpleado} icon={User} />
                      <InfoItem label="Identificación" value={profileData.emplIdEmpleado} icon={User} />
                      <InfoItem label="Nombre Completo" value={profileData.emplNombre} icon={User} />
                      <InfoItem label="Dirección" value={profileData.emplDireccion} icon={Home} />
                      <InfoItem label="Teléfono" value={profileData.emplTelefono} icon={Phone} />
                      <InfoItem label="Correo Electrónico" value={profileData.emplCorreoElectronico} icon={Mail} />
                      {tiendaId && <InfoItem label="ID de Tienda Física" value={tiendaId} icon={Store} />}
                      {tiendaNombre && <InfoItem label="Nombre de la Tienda" value={tiendaNombre} icon={Store} />}
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
                  className="bg-gray-200 hover:bg-gray-300 text-black font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center space-x-2 text-lg"
                >
                  <Key className="w-5 h-5" />
                  <span>Cambiar Contraseña</span>
                </button>
              </div>

              <section className="mt-12 bg-white rounded-2xl shadow-lg p-10 max-w-6xl mx-auto">
                <h3 className="text-xl font-semibold text-black mb-8 border-b pb-4 border-gray-200">Qué podría ver y administrar</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {managementOptions.map((option) => (
                    <button
                      key={option.name}
                      onClick={() => handleManagementClick(option.path)}
                      className="flex flex-col items-center justify-center p-4 sm:p-6 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition-all duration-200 ease-in-out transform hover:scale-105 text-center"
                    >
                      <option.icon className="w-7 h-7 sm:w-8 sm:h-8 text-[#921913] mb-2 sm:mb-3" />
                      <span className="font-semibold text-black text-base sm:text-lg mb-1">{option.name}</span>
                      <p className="text-xs sm:text-sm text-black">{option.description}</p>
                    </button>
                  ))}
                </div>
              </section>
            </>
          ) : (
            !error && <div className="text-center text-gray-600 text-lg">No se encontraron datos para este empleado</div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function InfoItem({ label, value, icon: Icon }) {
  return (
    <div className="flex items-start space-x-4">
      <Icon className="w-6 h-6 text-[#921913] mt-1" />
      <div className="text-left">
        <p className="text-lg font-semibold text-black">{label}</p>
        <p className="text-black text-base">{value}</p>
      </div>
    </div>
  );
}