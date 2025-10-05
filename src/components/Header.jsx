import React, { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCartIcon, MapPinIcon, MagnifyingGlassIcon, UserIcon, HomeIcon, BriefcaseIcon, InformationCircleIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { Menu, X } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { usarBusqueda } from '../context/ContextoBusqueda';

const mainNavigationLinks = [
    { name: 'Inicio', href: '/', Icon: HomeIcon },
    { name: 'Servicios empresariales', href: '/servicios-empresariales', Icon: BriefcaseIcon },
    { name: 'Sobre nosotros', href: '/sobre-nosotros', Icon: InformationCircleIcon },
];

export default function Header() {
    // Uso del hook real para obtener y actualizar el estado de búsqueda
    const { searchQuery, setSearchQuery } = usarBusqueda();
    const navigate = useNavigate();
    // Obtención de user y logout desde el AuthContext
    const { user, logout } = useContext(AuthContext); 
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Manejador de cambio para el input de búsqueda que actualiza el estado global
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // FUNCIÓN DE CERRAR SESIÓN (handleLogout)
    const handleLogout = () => {
        logout(); // Llama a la función del AuthContext que elimina el token
        setIsMenuOpen(false);
        navigate("/login");
    };

    // FUNCIÓN DE IR A PERFIL (goToProfile)
    const goToProfile = () => {
        if (!user) return;

        // Redirección basada en el rol
        switch (user.role) {
            case "Administrador":
                navigate("/perfil-admin");
                break;
            case "Empleado":
                navigate("/perfil-empleado");
                break;
            case "Cliente":
                navigate("/perfil-cliente");
                break;
            default:
                navigate("/login");
        }
        setIsMenuOpen(false);
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // LÓGICA DE ICONOS DE USUARIO CON AUTENTICACIÓN
    const UserActions = ({ isMobile = false }) => {
        // Estilos base para elementos de acción
        const baseClasses = "flex items-center font-medium text-white transition duration-150";
        const mobileClasses = "text-base hover:bg-red-700 px-3 py-2 rounded-md w-full";
        const desktopClasses = "p-2 rounded-full hover:text-red-300";

        const iconClasses = isMobile ? 'w-5 h-5 mr-2' : 'w-6 h-6';

        return (
            <div className={`flex ${isMobile ? 'flex-col gap-2' : 'flex-row items-center gap-4'}`}>
                {!user ? (
                    // CASO 1: USUARIO NO LOGUEADO -> Ícono de Login
                    <Link
                        to="/login"
                        onClick={() => setIsMenuOpen(false)}
                        className={`${baseClasses} ${isMobile ? mobileClasses : desktopClasses}`}
                        aria-label="Iniciar sesión"
                    >
                        <UserIcon className={iconClasses} />
                        {isMobile && <span>Iniciar sesión</span>}
                    </Link>
                ) : (
                    // CASO 2: USUARIO LOGUEADO -> Íconos de Perfil y Logout
                    <>
                        {/* Botón de VER PERFIL */}
                        <button 
                            onClick={goToProfile}
                            className={`${baseClasses} ${isMobile ? mobileClasses : desktopClasses}`}
                            aria-label="Ver perfil"
                        >
                            <UserIcon className={iconClasses} />
                            {isMobile && <span>Ver perfil ({user.role})</span>}
                        </button>
                        
                        {/* Botón de CERRAR SESIÓN */}
                        <button 
                            onClick={handleLogout}
                            className={`${baseClasses} ${isMobile ? mobileClasses : desktopClasses}`}
                            aria-label="Cerrar sesión"
                        >
                            <ArrowRightStartOnRectangleIcon className={iconClasses} />
                            {isMobile && <span>Cerrar sesión</span>}
                        </button>
                    </>
                )}
            </div>
        );
    };

    return (
        <header className="bg-black sticky top-0 z-50">
            {/* Contenedor principal: Distribución Logo | Buscador | Íconos */}
            <div className='flex items-center justify-between w-full py-3 px-4'>
                
                {/* 1. LOGOS (Izquierda) */}
                <div className="flex gap-2 sm:gap-4 flex-shrink-0 items-center">
                    <Link to="/">
                        <img src="/img/Logo LORD WINE.png" alt="Logo de LORD WINE" className="h-12 sm:h-16 lg:h-[70px]" />
                    </Link>
                    <Link to="/" className="hidden sm:block">
                        <img src="/img/Lord WINE (1).png" alt="Logo persona LORD WINE" className="h-12 sm:h-16 lg:h-[70px]" />
                    </Link>
                </div>
                
                {/* 2. BUSCADOR (Centro) */}
                <div className='hidden sm:flex flex-grow justify-center'>
                    <div className='flex items-center p-2 bg-white rounded-xl shadow-inner border border-gray-200 w-full max-w-lg'>
                        <MagnifyingGlassIcon className='w-5 h-5 text-gray-400 mr-2 flex-shrink-0' />
                        <input
                            type="text"
                            placeholder="Buscar productos por nombre..."
                            // Enlazado al estado real de búsqueda
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="w-full text-gray-800 focus:outline-none placeholder-gray-500 text-sm"
                        />
                    </div>
                </div>

                {/* 3. ÍCONOS PRINCIPALES (Derecha) */}
                <div className='flex items-center gap-2 sm:gap-4 flex-shrink-0 ml-auto'>
                    
                    {/* NAVEGACIÓN Y ACCIONES DE USUARIO - ESCRITORIO */}
                    <div className="hidden md:flex items-center gap-4">
                        
                        {/* Enlaces de Navegación */}
                        {mainNavigationLinks.map((item) => (
                            <Link 
                                key={item.name}
                                to={item.href}
                                className="p-2 rounded-full text-white transition duration-150"
                                aria-label={item.name}
                            >
                                <item.Icon className='w-6 h-6' />
                            </Link>
                        ))}

                        {/* Íconos funcionales (Puntos de venta y Carrito) */}
                        <Link to="/puntos-venta" className="p-2 rounded-full text-white transition duration-150" aria-label="Puntos de Venta">
                            <MapPinIcon className='w-6 h-6' />
                        </Link>
                        <Link to="/carrito-compras" className="p-2 rounded-full text-white transition duration-150" aria-label="Carrito de Compras">
                            <ShoppingCartIcon className='w-6 h-6' />
                        </Link>

                        {/* Acciones de Usuario (Logueado o No) */}
                        <UserActions />
                    </div>

                    {/* Botón de Menú (Hamburguesa) */}
                    <button
                        onClick={toggleMenu}
                        className="p-2 text-white hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-white rounded-md md:hidden"
                        aria-expanded={isMenuOpen}
                        aria-label="Abrir menú principal"
                    >
                        {isMenuOpen ? (
                            <X className="block h-7 w-7" aria-hidden="true" />
                        ) : (
                            <Menu className="block h-7 w-7" aria-hidden="true" />
                        )}
                    </button>
                </div>
            </div>

            {/* MENÚ DESPLEGABLE (Dropdown Móvil y Tablet) */}
            {isMenuOpen && (
                <div className="md:hidden w-full bg-[#921913] shadow-xl border-t border-red-700 pb-3">
                    <div className="pt-2 pb-3 space-y-2 px-4">
                        
                        {/* BÚSQUEDA (Móvil) */}
                        <div className='flex items-center p-2 bg-white rounded-xl shadow-inner border border-gray-200 w-full mb-3 sm:hidden'>
                            <MagnifyingGlassIcon className='w-5 h-5 text-gray-400 mr-2 flex-shrink-0' />
                            <input
                                type="text"
                                placeholder="Buscar productos por nombre..."
                                // Enlazado al estado real de búsqueda
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="w-full text-gray-800 focus:outline-none placeholder-gray-500 text-sm"
                            />
                        </div>

                        {/* Enlaces de Navegación (Móvil) */}
                        {mainNavigationLinks.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className="flex items-center text-base text-white hover:bg-red-700 px-3 py-2 rounded-md font-medium transition duration-150"
                                onClick={toggleMenu}
                            >
                                <item.Icon className='w-5 h-5 mr-2' />
                                {item.name}
                            </Link>
                        ))}
                        
                        <hr className="border-red-600 my-2 mx-1" />

                        {/* Íconos y Acciones de Usuario (Móvil) */}
                        <div className="space-y-2">
                            {/* Se utiliza UserActions en modo móvil */}
                            <UserActions isMobile={true} />
                        </div>
                        
                        <hr className="border-red-600 my-2 mx-1" />

                        {/* Puntos de Venta (Móvil) */}
                        <Link to="/puntos-venta" className="flex items-center text-base font-medium text-white hover:bg-red-700 px-3 py-2 rounded-md transition duration-150" onClick={toggleMenu}>
                            <MapPinIcon className='w-5 h-5 mr-2' /> Puntos de Venta
                        </Link>
                        {/* Carrito de Compras (Móvil) */}
                        <Link to="/carrito-compras" className="flex items-center text-base font-medium text-white hover:bg-red-700 px-3 py-2 rounded-md transition duration-150" onClick={toggleMenu}>
                            <ShoppingCartIcon className='w-5 h-5 mr-2' /> Carrito de Compras
                        </Link>

                    </div>
                </div>
            )}
        </header>
    );
}
