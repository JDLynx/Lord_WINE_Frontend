import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";
import "./Login.css";

export default function Login() {
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState('');

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
                alert(`Bienvenido, ${admin.adminNombre}`);
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
            </main>
            <Footer />
        </div>
    );
}
