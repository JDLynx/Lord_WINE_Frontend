import React, { useState, useEffect } from 'react';
import { User, Mail, Shield, Edit, Key, Calendar, Home, Phone } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";
import "./PerfilAdministrador.css";

export default function PerfilAdministrador() {
    const [profileData, setProfileData] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // --- LÓGICA DE CARGA DE DATOS SIN BACKEND ---
        const loadProfileData = () => {
            // Intentar leer los datos del perfil actual que fueron "guardados" en localStorage
            const savedAdminData = JSON.parse(localStorage.getItem('currentAdminProfile'));

            // Si se navegó a esta página con un estado de actualización (desde EditarPerfil)
            // usamos esos datos, si no, usamos los de localStorage.
            if (location.state?.profileUpdated && location.state?.currentProfileData) {
                setProfileData({ ...location.state.currentProfileData, role: "Administrador" });
            } else if (savedAdminData) {
                // Si hay datos en localStorage, los usamos
                setProfileData({ ...savedAdminData, role: "Administrador" });
            } else {
                // Si no hay datos "guardados" ni pasados por la navegación,
                // podemos establecer unos datos por defecto para la primera carga.
                setProfileData({
                    adminCodAdministrador: 'COD001',
                    adminIdAdministrador: 'ID12345',
                    adminNombre: 'Administrador Demo',
                    adminDireccion: 'Calle Ficticia 123',
                    adminTelefono: '5551234567',
                    adminCorreoElectronico: 'admin@example.com',
                    role: "Administrador"
                });
            }
        };

        loadProfileData();
    }, [location.state]); // Dependencia clave: `location.state` para recargar al regresar de `EditarPerfil`

    const handleEditClick = () => {
        // Al navegar a editar, pasamos los datos actuales para que el formulario se pre-rellene.
        navigate('/editar-perfil-administrador', { state: { currentProfileData: profileData } });
    };

    return (
        <>
            <div className="page-container">
                <Header />
                <BarraProductos />

                <main className="bg-vistas-home min-h-screen py-8 px-4 sm:px-8">
                    <div className="max-w-6xl mx-auto">
                        <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">Perfil del Administrador</h1>

                        {profileData ? (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-1">
                                    <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center h-full">
                                        <div className="w-32 h-32 bg-gradient-to-br from-red-600 to-red-800 rounded-full mx-auto mb-6 flex items-center justify-center shadow-md">
                                            <User className="w-16 h-16 text-white" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{profileData.adminNombre}</h2>
                                        <p className="text-red-700 font-semibold mb-4">{profileData.role}</p>
                                    </div>
                                </div>

                                <div className="lg:col-span-2">
                                    <div className="bg-white rounded-2xl shadow-lg p-10 h-full">
                                        <h3 className="text-xl font-bold text-gray-800 mb-8 border-b pb-4 border-gray-200">Información Personal</h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-6">
                                            <div className="flex items-start space-x-4">
                                                <Shield className="w-6 h-6 text-red-500 mt-1" />
                                                <div className="text-left">
                                                    <p className="text-sm text-gray-500">Código de Administrador</p>
                                                    <p className="font-semibold text-gray-800 text-lg">{profileData.adminCodAdministrador}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start space-x-4">
                                                <User className="w-6 h-6 text-red-500 mt-1" />
                                                <div className="text-left">
                                                    <p className="text-sm text-gray-500">Identificación</p>
                                                    <p className="font-semibold text-gray-800 text-lg">{profileData.adminIdAdministrador}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start space-x-4">
                                                <User className="w-6 h-6 text-red-500 mt-1" />
                                                <div className="text-left">
                                                    <p className="text-sm text-gray-500">Nombre Completo</p>
                                                    <p className="font-semibold text-gray-800 text-lg">{profileData.adminNombre}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start space-x-4">
                                                <Home className="w-6 h-6 text-red-500 mt-1" />
                                                <div className="text-left">
                                                    <p className="text-sm text-gray-500">Dirección</p>
                                                    <p className="font-semibold text-gray-800 text-lg">{profileData.adminDireccion}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start space-x-4">
                                                <Phone className="w-6 h-6 text-red-500 mt-1" />
                                                <div className="text-left">
                                                    <p className="text-sm text-gray-500">Teléfono</p>
                                                    <p className="font-semibold text-gray-800 text-lg">{profileData.adminTelefono}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start space-x-4">
                                                <Mail className="w-6 h-6 text-red-500 mt-1" />
                                                <div className="text-left">
                                                    <p className="text-sm text-gray-500">Correo Electrónico</p>
                                                    <p className="font-semibold text-gray-800 text-lg">{profileData.adminCorreoElectronico}</p>
                                                </div>
                                            </div>

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
                            <p className="text-center text-gray-600 text-lg">Cargando datos del perfil...</p>
                        )}

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
            </div>
        </>
    );
}