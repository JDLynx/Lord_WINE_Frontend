import React, { useState } from 'react';
import { User, Mail, Shield, Edit, Key, Calendar, Home, Phone } from 'lucide-react'; // Importamos Home y Phone para Dirección y Teléfono
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";
import EditarPerfil from '../components/EditarPerfil';
import "./PerfilAdministrador.css";

export default function PerfilAdministrador() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // **Estado para almacenar la información del perfil, usando los nombres de tu tabla**
  const [profileData, setProfileData] = useState({
    adminCodAdministrador: "1", // Ejemplo: Código del administrador
    adminIdAdministrador: "1061779346", // Ejemplo: ID del administrador
    adminNombre: "Juan David Molina Juspian",
    adminDireccion: "Calle 26EN # 2E - 27", // Ejemplo: Dirección
    adminTelefono: "3016514814", // Ejemplo: Teléfono
    adminCorreoElectronico: "jdavid.lynx@gmail.com",
    // No guardamos la contraseña aquí por seguridad, solo se maneja en el modal
    role: "Administrador", // Este es un campo adicional para la UI, no de la BD
  });

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Función que se llama cuando el modal guarda los cambios exitosamente
  // Recibirá solo los campos que pueden mostrarse después de la actualización (sin contraseña)
  const handleProfileSave = (updatedData) => {
    setProfileData((prevData) => ({
      ...prevData,
      adminCodAdministrador: updatedData.adminCodAdministrador,
      adminIdAdministrador: updatedData.adminIdAdministrador,
      adminNombre: updatedData.adminNombre,
      adminDireccion: updatedData.adminDireccion,
      adminTelefono: updatedData.adminTelefono,
      adminCorreoElectronico: updatedData.adminCorreoElectronico,
      // Los campos 'role' y 'lastAccess' se mantienen si no se editan en el modal
      // Si el rol también se edita en el modal, se añadiría aquí:
      // role: updatedData.role,
    }));
  };

  return (
    <>
      <div className="page-container">
        <Header />
        <BarraProductos />
        <main className="bg-vistas-home min-h-screen py-8 px-4 sm:px-8">

          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">Perfil del Administrador</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center h-full">
                  <div className="w-32 h-32 bg-gradient-to-br from-red-600 to-red-800 rounded-full mx-auto mb-6 flex items-center justify-center shadow-md">
                    <User className="w-16 h-16 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{profileData.adminNombre}</h2> {/* Muestra adminNombre */}
                  <p className="text-red-700 font-semibold mb-4">{profileData.role}</p>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-lg p-10 h-full">
                  <h3 className="text-xl font-bold text-gray-800 mb-8 border-b pb-4 border-gray-200">Información Personal</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-6">

                    {/* adminCodAdministrador */}
                    <div className="flex items-center space-x-4">
                      <Shield className="w-6 h-6 text-red-500" /> {/* Icono de escudo para código */}
                      <div>
                        <p className="text-sm text-gray-500">Código de Administrador</p>
                        <p className="font-semibold text-gray-800 text-lg">{profileData.adminCodAdministrador}</p>
                      </div>
                    </div>

                    {/* adminIdAdministrador */}
                    <div className="flex items-center space-x-4">
                      <User className="w-6 h-6 text-red-500" /> {/* Icono de usuario para ID */}
                      <div>
                        <p className="text-sm text-gray-500">Identificación</p>
                        <p className="font-semibold text-gray-800 text-lg">{profileData.adminIdAdministrador}</p>
                      </div>
                    </div>

                    {/* adminNombre */}
                    <div className="flex items-center space-x-4">
                      <User className="w-6 h-6 text-red-500" />
                      <div>
                        <p className="text-sm text-gray-500">Nombre Completo</p>
                        <p className="font-semibold text-gray-800 text-lg">{profileData.adminNombre}</p>
                      </div>
                    </div>

                    {/* adminDireccion */}
                    <div className="flex items-center space-x-4">
                      <Home className="w-6 h-6 text-red-500" /> {/* Icono de casa para dirección */}
                      <div>
                        <p className="text-sm text-gray-500">Dirección</p>
                        <p className="font-semibold text-gray-800 text-lg">{profileData.adminDireccion}</p>
                      </div>
                    </div>

                    {/* adminTelefono */}
                    <div className="flex items-center space-x-4">
                      <Phone className="w-6 h-6 text-red-500" /> {/* Icono de teléfono */}
                      <div>
                        <p className="text-sm text-gray-500">Teléfono</p>
                        <p className="font-semibold text-gray-800 text-lg">{profileData.adminTelefono}</p>
                      </div>
                    </div>

                    {/* adminCorreoElectronico */}
                    <div className="flex items-center space-x-4">
                      <Mail className="w-6 h-6 text-red-500" />
                      <div>
                        <p className="text-sm text-gray-500">Correo Electrónico</p>
                        <p className="font-semibold text-gray-800 text-lg">{profileData.adminCorreoElectronico}</p>
                      </div>
                    </div>

                    {/* Rol (si sigue siendo un campo de la UI) */}
                    <div className="flex items-center space-x-4">
                      <Shield className="w-6 h-6 text-red-500" />
                      <div>
                        <p className="text-sm text-gray-500">Rol</p>
                        <p className="font-semibold text-gray-800 text-lg">{profileData.role}</p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-6 mt-12">
              <button
                onClick={handleEditClick}
                className="bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center space-x-2 text-lg"
              >
                <Edit className="w-5 h-5" />
                <span>Editar Perfil</span>
              </button>
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center space-x-2 text-lg"
              >
                <Key className="w-5 h-5" />
                <span>Cambiar Contraseña</span>
              </button>
            </div>

          </div>

        </main>

        <Footer />

        {isModalOpen && (
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