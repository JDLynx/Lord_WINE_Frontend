import React, { useState, useEffect } from 'react';
// Importamos los íconos necesarios desde lucide-react
import { User, Mail, Shield, Edit, Key, Calendar, Home, Phone } from 'lucide-react';
// Importamos componentes reutilizables
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";
import EditarPerfil from '../components/EditarPerfil';
// Importamos los estilos específicos para este componente
import "./PerfilAdministrador.css";

export default function PerfilAdministrador()
{
  // Estado para controlar la visibilidad del modal de edición
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Estado que almacena los datos del perfil del administrador
  const [profileData, setProfileData] = useState(null);

  // useEffect se ejecuta una vez al cargar el componente
  useEffect(() =>
  {
    const fetchData = async () =>
    {
      // Obtenemos el ID del administrador desde localStorage
      const adminCod = localStorage.getItem('adminCodAdministrador');

      if (!adminCod) return;

      try
      {
        // Hacemos la solicitud al backend para obtener los datos del administrador
        const response = await fetch(`http://localhost:3000/api/administradores/${adminCod}`);
        const data = await response.json();

        // Guardamos los datos obtenidos en el estado
        setProfileData({
          adminCodAdministrador: data.adminCodAdministrador,
          adminIdAdministrador: data.adminIdAdministrador,
          adminNombre: data.adminNombre,
          adminDireccion: data.adminDireccion,
          adminTelefono: data.adminTelefono,
          adminCorreoElectronico: data.adminCorreoElectronico,
          role: "Administrador" // Asignamos el rol manualmente
        });

      }
      catch (error)
      {
        console.error("Error al cargar los datos del perfil:", error);
      }
    };

    fetchData();
  }, []);

  // Función para abrir el modal de edición
  const handleEditClick = () =>
  {
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () =>
  {
    setIsModalOpen(false);
  };

  // Función que se ejecuta al guardar cambios desde el modal
  const handleProfileSave = (updatedData) =>
  {
    // Actualizamos el estado con los nuevos datos
    setProfileData((prevData) => ({
      ...prevData,
      adminCodAdministrador: updatedData.adminCodAdministrador,
      adminIdAdministrador: updatedData.adminIdAdministrador,
      adminNombre: updatedData.adminNombre,
      adminDireccion: updatedData.adminDireccion,
      adminTelefono: updatedData.adminTelefono,
      adminCorreoElectronico: updatedData.adminCorreoElectronico,
    }));
  };

  return (
    <>
      <div className="page-container">
        {/* Encabezado y barra de navegación */}
        <Header />
        <BarraProductos />

        {/* Contenido principal */}
        <main className="bg-vistas-home min-h-screen py-8 px-4 sm:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Título de la página */}
            <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">Perfil del Administrador</h1>

            {/* Verificamos si los datos del perfil están disponibles */}
            {profileData && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

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
            )}

            {/* Botones de acción */}
            <div className="flex justify-center space-x-6 mt-12">
              {/* Botón para abrir el modal de edición */}
              <button
                onClick={handleEditClick}
                className="bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center space-x-2 text-lg"
              >
                <Edit className="w-5 h-5" />
                <span>Editar Perfil</span>
              </button>

              {/* Botón para cambiar contraseña (aún sin funcionalidad) */}
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center space-x-2 text-lg"
              >
                <Key className="w-5 h-5" />
                <span>Cambiar Contraseña</span>
              </button>
            </div>

          </div>
        </main>

        {/* Pie de página */}
        <Footer />

        {/* Modal de edición, visible solo si está activado y hay datos del perfil */}
        {isModalOpen && profileData && (
          <EditarPerfil
            onClose={handleCloseModal}
            currentProfileData={profileData}
            onSaveSuccess={handleProfileSave}
          />
        )}
      </div>
    </>
  );
}