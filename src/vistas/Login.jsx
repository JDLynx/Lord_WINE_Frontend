import React, { useState } from 'react';
// Importamos el componente Link para navegar entre rutas
import { Link } from 'react-router-dom';
// Importamos el hook useNavigate para redirigir programáticamente
import { useNavigate } from 'react-router-dom';
// Componentes reutilizables de la aplicación
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";
// Estilos específicos para esta vista
import "./Login.css";

export default function Login() {
    // Estados para correo, contraseña y mensaje de error
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook de navegación

    // Función que se ejecuta al enviar el formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevenir comportamiento por defecto del formulario

        try {
            // Consultamos la lista de administradores desde la API
            const response = await fetch("http://localhost:3000/api/administradores/");
            const data = await response.json();

            // Buscamos si hay un administrador con el correo y contraseña ingresados
            const admin = data.find(a => a.adminCorreoElectronico === correo && a.adminContrasena === contrasena);

            if (admin) {
                // Si se encuentra, se guarda su ID en localStorage
                localStorage.setItem('adminCodAdministrador', admin.adminCodAdministrador);

                // Mostramos un mensaje de bienvenida con su nombre
                alert(`Bienvenido, ${admin.adminNombre}`);

                // Redirigimos al perfil del administrador
                navigate('/perfil');
            } else {
                // Si no coincide, mostramos mensaje de error
                setError('Correo o contraseña incorrectos.');
            }
        } catch (error) {
            // En caso de error en la conexión con el servidor
            setError('Error al conectar con el servidor.');
        }
    };

    return (
        <div className="page-container">
            {/* Encabezado de la página */}
            <Header />
            {/* Barra de navegación de productos */}
            <BarraProductos />
            <main className="bg-vistas">
                <div className="login-card">
                    {/* Título del formulario */}
                    <h2 className="login-title">Iniciar Sesión</h2>
                    {/* Formulario de inicio de sesión */}
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="username" className="input-label">Correo electrónico:</label>
                            <input
                                type="text"
                                className="input-field"
                                id="username"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="password" className="input-label">Contraseña:</label>
                            <input
                                type="password"
                                className="input-field"
                                id="password"
                                value={contrasena}
                                onChange={(e) => setContrasena(e.target.value)}
                                required
                            />
                        </div>

                        {/* Si hay error, se muestra en rojo */}
                        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

                        {/* Botón de envío del formulario */}
                        <button type="submit" className="submit-btn">Ingresar</button>
                    </form>
                </div>

                {/* Enlace para redirigir a la página de registro */}
                <p className="mt-5 text-center text-black">
                    ¿No tienes una cuenta?{' '}
                    <Link to="/registro" className="text-red-600 font-bold hover:underline">
                        Regístrate aquí
                    </Link>
                </p>
            </main>
            {/* Pie de página */}
            <Footer />
        </div>
    );
}