import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Importación de componentes para la estructura de la pantalla
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";
// Importación de los estilos para la pantalla de login
import "./Login.css";

export default function Login()
{
    // Definición de los estados para guardar correo, contraseña y error
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState('');

    // Hook para navegar a otras rutas según el rol
    const navigate = useNavigate();

    // Función para procesar el envío del formulario de login
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Petición al backend para autenticar al usuario
            const response = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ correo, contrasena }),
            });
            
            const data = await response.json();

            // Si la respuesta es correcta, guarda datos en localStorage y redirige según el rol
            if (response.ok) {
                alert(`Bienvenido, ${data.rol}`);
                if (data.rol === 'Administrador') {
                    localStorage.setItem('adminCodAdministrador', data.id);
                    navigate("/perfil"); 
                } else if (data.rol === 'Empleado') {
                    localStorage.setItem('empleadoCodEmpleado', data.id);
                    navigate("/perfil-empleado"); 
                } else if (data.rol === 'Cliente') {
                    localStorage.setItem('clienteCodCliente', data.id);
                    navigate("/perfil-cliente"); 
                }
            } else {
                // Si falla, muestra el error proporcionado por la API
                setError(data.error || "Usuario o contraseña incorrectos.");
            }
        } catch (error) {
            // Si falla la conexión, muestra un error genérico
            setError("Error al conectar con el servidor.");
        }
    };

    return (
        <div className="page-container">
            <Header />
            <BarraProductos />
            <main className="bg-vistas">
                <div className="login-card">
                    <h2 className="login-title">Iniciar Sesión</h2>
                    <form onSubmit={handleSubmit}>
                        {/* Campo para ingresar el correo electrónico */}
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

                        {/* Campo para ingresar la contraseña */}
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

                        {/* Muestra el error en caso de que exista */}
                        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

                        <button type="submit" className="submit-btn">Ingresar</button>
                    </form>
                </div>

                <p className="mt-5 text-center text-black">
                    ¿No tienes una cuenta?{' '}
                    <Link to="/registro" className="text-red-600 font-bold hover:underline">
                        Regístrate aquí
                    </Link>
                </p>
            </main>
            <Footer />
        </div>
    );
}