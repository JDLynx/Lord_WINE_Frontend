import React, { useState } from 'react';
<<<<<<< HEAD
import { Link } from 'react-router-dom'; // Importa Link de react-router-dom
=======
import { useNavigate } from 'react-router-dom';
>>>>>>> 03db5c3017f72dde36c4fd7a8859abc07c0448e7
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";
import "./Login.css";

export default function Login() {
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/api/administradores/");
            const data = await response.json();

            const admin = data.find(a =>
                a.adminCorreoElectronico === correo &&
                a.adminContrasena === contrasena
            );

            if (admin) {
<<<<<<< HEAD
                alert(`Bienvenido, ${admin.adminNombre}`);
                // Aquí podrías redirigir al dashboard del admin, por ejemplo
                // navigate('/admin-dashboard'); // Si usas useNavigate
=======
                navigate('/perfil');
>>>>>>> 03db5c3017f72dde36c4fd7a8859abc07c0448e7
            } else {
                setError('Correo o contraseña incorrectos.');
            }
        } catch (err) {
            setError('Error al conectar con el servidor.');
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
                        <div className="input-group">
                            <label htmlFor="username" className="input-label">Usuario o Correo:</label>
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

                        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

                        <button type="submit" className="submit-btn">Ingresar</button>
                    </form>
                </div>
                <p className="mt-5 text-center text-black">
                    ¿No tienes una cuenta? <Link to="/registro" className="text-red-600 font-bold hover:underline">Regístrate aquí</Link> {/* Usamos Link con 'to' */}
                </p>
            </main>
            <Footer />
        </div>
    );
}