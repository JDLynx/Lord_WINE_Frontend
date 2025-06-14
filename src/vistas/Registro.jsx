import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";
import "./Registro.css";

export default function Registro() {
    const [codigoUsuario, setCodigoUsuario] = useState('');
    const [identificacion, setIdentificacion] = useState('');
    const [nombreCompleto, setNombreCompleto] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correoElectronico, setCorreoElectronico] = useState('');
    const [nuevaContrasena, setNuevaContrasena] = useState('');
    const [confirmarContrasena, setConfirmarContrasena] = useState('');
    const [error, setError] = useState('');
    const [mensajeExito, setMensajeExito] = useState('');

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Limpiar errores previos
        setMensajeExito(''); // Limpiar mensajes de éxito previos

        // Validaciones básicas (puedes añadir más si es necesario)
        if (nuevaContrasena !== confirmarContrasena) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        // Si "Nueva Contraseña" es opcional y se deja en blanco, asegúrate de cómo lo maneja tu backend.
        // Aquí simplemente no la enviaríamos si está vacía, o la enviaríamos en blanco si el backend lo acepta.

        // Datos a enviar (ajusta los nombres de las propiedades según tu API)
        const userData = {
            // Asumo que el código de usuario no lo envía el frontend al registrar
            // Si tu backend lo requiere, podrías generarlo aquí o manejarlo
            // userId: codigoUsuario, // Si el campo es editable y se espera un valor
            identificacion: identificacion,
            nombreCompleto: nombreCompleto,
            direccion: direccion,
            telefono: telefono,
            correoElectronico: correoElectronico,
            // Solo envía la contraseña si no está vacía
            contrasena: nuevaContrasena, // En un entorno real, ¡nunca envíes contraseñas en texto plano!
                                         // Debes hashearla en el backend.
        };

        try {
            // Reemplaza esta URL con tu endpoint de registro real
            const response = await fetch("http://localhost:3000/api/usuarios/registro", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (response.ok) {
                setMensajeExito('¡Registro exitoso! Ahora puedes iniciar sesión.');
                // Opcional: Redirigir al usuario a la página de login
                // setTimeout(() => {
                //     window.location.href = '/login';
                // }, 2000);
                // Limpiar el formulario
                setCodigoUsuario('');
                setIdentificacion('');
                setNombreCompleto('');
                setDireccion('');
                setTelefono('');
                setCorreoElectronico('');
                setNuevaContrasena('');
                setConfirmarContrasena('');

            } else {
                setError(data.message || 'Error en el registro. Inténtalo de nuevo.');
            }
        } catch (err) {
            console.error("Error al registrar:", err);
            setError('Error al conectar con el servidor. Por favor, inténtalo más tarde.');
        }
    };

    return (
        <div className="page-container">
            <Header />
            <BarraProductos />
            <main className="bg-registro flex justify-center items-center py-8"> {/* Añadimos flexbox para centrar */}
                <div className="registro-card p-6 rounded-lg shadow-lg bg-white w-full max-w-md"> {/* Clases de Tailwind para el diseño de la tarjeta */}
                    <h2 className="registro-title text-2xl font-bold text-center mb-6">Registro de Usuario</h2> {/* Título centrado */}
                    <form onSubmit={handleSubmit}>
                        {/* Código del Usuario */}

                        {/* Identificación */}
                        <div className="input-group mb-4">
                            <label htmlFor="identificacion" className="input-label block text-gray-700 text-sm font-bold mb-2">Identificación:</label>
                            <input
                                type="text"
                                className="input-field shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="identificacion"
                                value={identificacion}
                                onChange={(e) => setIdentificacion(e.target.value)}
                                required
                            />
                        </div>

                        {/* Nombre Completo */}
                        <div className="input-group mb-4">
                            <label htmlFor="nombreCompleto" className="input-label block text-gray-700 text-sm font-bold mb-2">Nombre Completo:</label>
                            <input
                                type="text"
                                className="input-field shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="nombreCompleto"
                                value={nombreCompleto}
                                onChange={(e) => setNombreCompleto(e.target.value)}
                                required
                            />
                        </div>

                        {/* Dirección */}
                        <div className="input-group mb-4">
                            <label htmlFor="direccion" className="input-label block text-gray-700 text-sm font-bold mb-2">Dirección:</label>
                            <input
                                type="text"
                                className="input-field shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="direccion"
                                value={direccion}
                                onChange={(e) => setDireccion(e.target.value)}
                                required
                            />
                        </div>

                        {/* Teléfono */}
                        <div className="input-group mb-4">
                            <label htmlFor="telefono" className="input-label block text-gray-700 text-sm font-bold mb-2">Teléfono:</label>
                            <input
                                type="tel" // Tipo 'tel' para teléfonos
                                className="input-field shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="telefono"
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
                                required
                            />
                        </div>

                        {/* Correo Electrónico */}
                        <div className="input-group mb-4">
                            <label htmlFor="correoElectronico" className="input-label block text-gray-700 text-sm font-bold mb-2">Correo Electrónico:</label>
                            <input
                                type="email" // Tipo 'email' para correos electrónicos
                                className="input-field shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="correoElectronico"
                                value={correoElectronico}
                                onChange={(e) => setCorreoElectronico(e.target.value)}
                                required
                            />
                        </div>

                        {/* Nueva Contraseña */}
                        <div className="input-group mb-4">
                            <label htmlFor="nuevaContrasena" className="input-label block text-gray-700 text-sm font-bold mb-2">Contraseña:</label>
                            <input
                                type="password" // Tipo 'password'
                                className="input-field shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="nuevaContrasena"
                                value={nuevaContrasena}
                                onChange={(e) => setNuevaContrasena(e.target.value)}
                                // No es 'required' si es opcional
                            />
                        </div>

                        {/* Mensajes de error/éxito */}
                        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
                        {mensajeExito && <p className="text-green-500 text-xs italic mb-4">{mensajeExito}</p>}

                        {/* Botón de Registro */}
                        <button
                            type="submit"
                            className="submit-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        >
                            Registrarse
                        </button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
}