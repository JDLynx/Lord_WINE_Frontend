import React, { useState } from 'react';
import { User, Mail, Shield, Edit, Key, Calendar, Home, Phone } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";
import EditarPerfil from '../components/EditarPerfil'; // Asegúrate de que este componente existe
import "./PerfilAdministrador.css"; // Este CSS debería ser mínimo, idealmente para cosas globales o bg.

export default function PerfilAdministrador() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [profileData, setProfileData] = useState({
    adminCodAdministrador: "1",
    adminIdAdministrador: "1061779346",
    adminNombre: "Juan David Molina Juspian",
    adminDireccion: "Calle 26EN # 2E - 27",
    adminTelefono: "3016514814",
    adminCorreoElectronico: "jdavid.lynx@gmail.com",
    role: "Administrador",
  });

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleProfileSave = (updatedData) => {
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

  // --- NUEVA ESTRUCTURA PARA LOS ITEMS DE INFORMACIÓN ---
  // Componente auxiliar para cada ítem de información
  // Cada ítem usa flexbox para el icono y el texto, y asegura text-left
  const InfoItem = ({ icon, label, value }) => (
    <div className="flex items-start space-x-4 mb-6"> {/* items-start para alinear arriba, mb-6 para espacio vertical */}
      <div className="flex-shrink-0"> {/* Evita que el icono se encoja */}
        {icon}
      </div>
      <div className="flex-grow text-left"> {/* Ocupa el espacio restante y fuerza text-left */}
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-semibold text-gray-800 text-lg break-words">{value}</p> {/* break-words para textos largos */}
      </div>
    </div>
  );
  // --- FIN NUEVA ESTRUCTURA ---

  return (
    <>
      <div className="page-container">
        <Header />
        <BarraProductos />
        <main className="bg-vistas-home min-h-screen py-8 px-4 sm:px-8">

          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">Perfil del Administrador</h1>

            <div className="flex flex-col lg:flex-row gap-8"> {/* Usamos flexbox para las columnas principales */}
              {/* Tarjeta del Perfil - Columna Izquierda */}
              <div className="lg:w-1/3"> {/* Aproximadamente 1/3 del ancho en pantallas grandes */}
                <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center h-full">
                  <div className="w-32 h-32 bg-gradient-to-br from-red-600 to-red-800 rounded-full mx-auto mb-6 flex items-center justify-center shadow-md">
                    <User className="w-16 h-16 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{profileData.adminNombre}</h2>
                  <p className="text-red-700 font-semibold mb-4">{profileData.role}</p>
                </div>
              </div>

              {/* Tarjeta de Información Personal - Columna Derecha */}
              <div className="lg:w-2/3"> {/* Aproximadamente 2/3 del ancho en pantallas grandes */}
                <div className="bg-white rounded-2xl shadow-lg p-10 h-full">
                  <h3 className="text-xl font-bold text-gray-800 mb-8 border-b pb-4 border-gray-200">Información Personal</h3>

                  {/* NUEVA ESTRUCTURA: Usamos flexbox con 'flex-wrap' para los campos de información */}
                  {/* Esto los apilará en móviles y los pondrá en múltiples columnas en pantallas más grandes */}
                  <div className="flex flex-wrap -mx-3"> {/* -mx-3 para compensar el padding horizontal de los items */}

                    {/* Cada campo ahora tiene un ancho específico dentro de este flex container */}
                    <div className="w-full md:w-1/2 px-3"> {/* Cada item ocupa 1/2 ancho en md+, 100% en móvil */}
                      <InfoItem
                        icon={<Shield className="w-6 h-6 text-red-500" />}
                        label="Código de Administrador"
                        value={profileData.adminCodAdministrador}
                      />
                    </div>

                    <div className="w-full md:w-1/2 px-3">
                      <InfoItem
                        icon={<User className="w-6 h-6 text-red-500" />}
                        label="Identificación"
                        value={profileData.adminIdAdministrador}
                      />
                    </div>

                    <div className="w-full md:w-1/2 px-3">
                      <InfoItem
                        icon={<User className="w-6 h-6 text-red-500" />}
                        label="Nombre Completo"
                        value={profileData.adminNombre}
                      />
                    </div>

                    <div className="w-full md:w-1/2 px-3">
                      <InfoItem
                        icon={<Home className="w-6 h-6 text-red-500" />}
                        label="Dirección"
                        value={profileData.adminDireccion}
                      />
                    </div>

                    <div className="w-full md:w-1/2 px-3">
                      <InfoItem
                        icon={<Phone className="w-6 h-6 text-red-500" />}
                        label="Teléfono"
                        value={profileData.adminTelefono}
                      />
                    </div>

                    <div className="w-full md:w-1/2 px-3">
                      <InfoItem
                        icon={<Mail className="w-6 h-6 text-red-500" />}
                      label="Correo Electrónico"
                        value={profileData.adminCorreoElectronico}
                      />
                    </div>

                    <div className="w-full md:w-1/2 px-3">
                      <InfoItem
                        icon={<Shield className="w-6 h-6 text-red-500" />}
                        label="Rol"
                        value={profileData.role}
                      />
                    </div>

                  </div>
                </div>
              </div>
            </div>

            {/* Botones de Acción - Estos no necesitan cambios, ya están centrados y funcionan */}
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