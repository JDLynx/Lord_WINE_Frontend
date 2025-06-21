import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";
import "./Registro.css";
import { useNavigate } from 'react-router-dom';

export default function Registro() {
    const [clIdCliente, setClIdCliente] = useState('');
    const [clNombre, setClNombre] = useState('');
    const [clDireccion, setClDireccion] = useState('');
    const [clTelefono, setClTelefono] = useState('');
    const [clCorreoElectronico, setClCorreoElectronico] = useState('');
    const [clContrasena, setClContrasena] = useState('');
    const [confirmarContrasena, setConfirmarContrasena] = useState('');
    const [error, setError] = useState('');
    const [mensaje, setMensajeExito] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMensajeExito('');

        if (clContrasena !== confirmarContrasena) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/clientes/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    clIdCliente,
                    clNombre,
                    clDireccion,
                    clTelefono,
                    clCorreoElectronico,
                    clContrasena,
                }),
            });
            
            const data = await response.json();
            console.log(data);

            if (response.ok) {
                setMensajeExito("Registro exitoso. Redirigiendo al inicio de sesión...");
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } else {
                if (data.error) {
                    if (typeof data.error === "string") {
                        setError(data.error);
                    } else if (Array.isArray(data.error)) {
                        setError(data.error.join(", "));
                    } else {
                        setError(data.error?.mensaje || "Error desconocido al registrarse.");
                    }
                } else if (data.errors) {
                    const mensajes = data.errors.map((err) => `${err.path}: ${err.message}`);
                    setError(mensajes.join(", "));
                } else if (data.detalles) {
                    setError(data.detalles);
                } else {
                    setError("Error desconocido al registrarse.");
                }
            }
        } catch {
            setError("Error en la conexión con el servidor.");
        }
    };

    return (
        <>
            <Header />
            <BarraProductos />
            <div className="bg-registro">
                <div className="registro-card">
                    <h2 className="registro-title">Crea tu cuenta</h2>
                    {error && <p className="error">{error}</p>}
                    {mensaje && <p className="exito">{mensaje}</p>}

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="Número de identificación"
                                value={clIdCliente}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^[0-9]*$/.test(value)) {
                                        setClIdCliente(value);
                                    }
                                }}
                                className="input-field"
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="Nombre completo"
                                value={clNombre}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(value)) {
                                        setClNombre(value);
                                    }
                                }}
                                className="input-field"
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="Dirección de residencia"
                                value={clDireccion}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s#.,-]*$/.test(value)) {
                                        setClDireccion(value);
                                    }
                                }}
                                className="input-field"
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="Teléfono o celular"
                                value={clTelefono}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^[0-9]*$/.test(value)) {
                                        setClTelefono(value);
                                    }
                                }}
                                className="input-field"
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="email"
                                placeholder="Correo electrónico"
                                value={clCorreoElectronico}
                                onChange={(e) => setClCorreoElectronico(e.target.value)}
                                className="input-field"
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="password"
                                placeholder="Contraseña"
                                value={clContrasena}
                                onChange={(e) => setClContrasena(e.target.value)}
                                className="input-field"
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="password"
                                placeholder="Confirmar contraseña"
                                value={confirmarContrasena}
                                onChange={(e) => setConfirmarContrasena(e.target.value)}
                                className="input-field"
                                required
                            />
                        </div>
                        <button type="submit" className="submit-btn">Registrarse</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}
