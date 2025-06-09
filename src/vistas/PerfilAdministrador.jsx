import React from 'react'
import { User, Mail, Shield, Edit, Key, Calendar } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";
import "./PerfilAdministrador.css";

export default function PerfilAdministrador() {
  return (
    <>
        <div className="page-container">
                <Header />
                <BarraProductos />
            <main class=" min-h-screen py-8 px-4 sm:px-8">

                <div className="max-w-5xl mx-auto">
                    <h1 className="text-2xl font-bold text-gray-800 mb-8">Perfil del Administrador</h1>
        
                    {/* Información del perfil */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Avatar y datos básicos */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-md p-6 text-center">
                        <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <User className="w-12 h-12 text-white" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Juan Pérez</h2>
                        <p className="text-gray-600 mb-4">Administrador General</p>
                        <div className="space-y-2">
                            <button className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg w-full transition-colors flex items-center justify-center space-x-2">
                            <Edit className="w-4 h-4" />
                            <span>Editar Perfil</span>
                            </button>
                            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg w-full transition-colors flex items-center justify-center space-x-2">
                            <Key className="w-4 h-4" />
                            <span>Cambiar Contraseña</span>
                            </button>
                        </div>
                        </div>
                    </div>

                    {/* Información detallada */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-md p-8">
                        <h3 className="text-lg font-semibold text-gray-800 mb-6">Información Personal</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-center space-x-3">
                            <User className="w-5 h-5 text-gray-400" />
                            <div>
                                <p className="text-sm text-gray-500">Nombre Completo</p>
                                <p className="font-medium text-gray-800">Juan Pérez González</p>
                            </div>
                            </div>
                            <div className="flex items-center space-x-3">
                            <Mail className="w-5 h-5 text-gray-400" />
                            <div>
                                <p className="text-sm text-gray-500">Correo Electrónico</p>
                                <p className="font-medium text-gray-800">juanperez@lordwine.com</p>
                            </div>
                            </div>
                            <div className="flex items-center space-x-3">
                            <Shield className="w-5 h-5 text-gray-400" />
                            <div>
                                <p className="text-sm text-gray-500">Rol</p>
                                <p className="font-medium text-gray-800">Administrador General</p>
                            </div>
                            </div>
                            <div className="flex items-center space-x-3">
                            <Calendar className="w-5 h-5 text-gray-400" />
                            <div>
                                <p className="text-sm text-gray-500">Último Acceso</p>
                                <p className="font-medium text-gray-800">Hoy, 2:30 PM</p>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>

            </main>

            <Footer />
            
        </div>
        </>
  )
}
