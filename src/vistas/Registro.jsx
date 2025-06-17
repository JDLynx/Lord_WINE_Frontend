// Importa React y useState para gestionar el estado del componente
import React, { useState } from 'react';

// Importa componentes reutilizables de la aplicación
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";

// Importa los estilos específicos para el formulario de registro
import "./Registro.css";

// Importa useNavigate para redireccionar después del registro
import { useNavigate } from 'react-router-dom';

// Componente principal de registro de administradores
export default function Registro() {
    // Estados para guardar los datos del formulario
    const [adminIdAdministrador, setIdentificacion] = useState('');
    const [adminNombre, setNombreCompleto] = useState('');
    const [adminDireccion, setDireccion] = useState('');
    const [adminTelefono, setTelefono] = useState('');
    const [adminCorreoElectronico, setCorreoElectronico] = useState('');
    const [adminContrasena, setContrasena] = useState('');
    const [confirmarContrasena, setConfirmarContrasena] = useState('');

    // Estado para mostrar mensajes de error o éxito
    const [error, setError] = useState('');
    const [mensaje, setMensajeExito] = useState('');

    // Hook de navegación para redirigir a otra ruta
    const navigate = useNavigate();

    // Función que se ejecuta al enviar el formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene que la página se recargue al enviar el formulario
        setError('');       // Limpia errores anteriores
        setMensajeExito('');// Limpia mensajes anteriores

        // Validación: las contraseñas deben coincidir
        if (adminContrasena !== confirmarContrasena) {
            setError('Las contraseñas no coinciden.');
            return; // Detiene el envío del formulario
        }

        try {
            // Envío de datos al servidor mediante una solicitud POST
            const response = await fetch("http://localhost:3000/api/administradores/", {
                method: "POST", // Método HTTP
                headers: {
                    "Content-Type": "application/json", // Tipo de contenido enviado
                },
                body: JSON.stringify({ // Convierte los datos del formulario a JSON
                    adminIdAdministrador,
                    adminNombre,
                    adminDireccion,
                    adminTelefono,
                    adminCorreoElectronico,
                    adminContrasena
                }),
            });

            // Obtiene la respuesta del servidor en formato JSON
            const data = await response.json();

            // Si la respuesta fue exitosa
            if (response.ok) {
                // Muestra mensaje de éxito
                setMensajeExito("Registro exitoso. Redirigiendo al inicio de sesión...");
                // Redirige al login después de 2 segundos
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } else {
                // Muestra el mensaje de error proporcionado por el servidor
                setError(data.error || "Ocurrió un error al registrarse.");
            }
        } catch (err) {
            // Error al conectarse con el servidor
            setError("Error en la conexión con el servidor.");
        }
    };

    // Renderizado del formulario
    return (
        <>
            {/* Encabezado y barra de navegación */}
            <Header />
            <BarraProductos />

            {/* Contenedor principal del formulario */}
            <div className="bg-registro">
                <div className="registro-card">
                    <h2 className="registro-title">Registro de Administrador</h2>

                    {/* Mensajes de error o éxito */}
                    {error && <p className="error">{error}</p>}
                    {mensaje && <p className="exito">{mensaje}</p>}

                    {/* Formulario con campos de entrada */}
                    <form onSubmit={handleSubmit}>
                        {/* Campo ID */}
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="ID"
                                value={adminIdAdministrador}
                                onChange={(e) => setIdentificacion(e.target.value)}
                                className="input-field"
                                required
                            />
                        </div>

                        {/* Campo Nombre */}
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="Nombre completo"
                                value={adminNombre}
                                onChange={(e) => setNombreCompleto(e.target.value)}
                                className="input-field"
                                required
                            />
                        </div>

                        {/* Campo Dirección */}
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="Dirección"
                                value={adminDireccion}
                                onChange={(e) => setDireccion(e.target.value)}
                                className="input-field"
                                required
                            />
                        </div>

                        {/* Campo Teléfono */}
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="Teléfono"
                                value={adminTelefono}
                                onChange={(e) => setTelefono(e.target.value)}
                                className="input-field"
                                required
                            />
                        </div>

                        {/* Campo Correo Electrónico */}
                        <div className="input-group">
                            <input
                                type="email"
                                placeholder="Correo electrónico"
                                value={adminCorreoElectronico}
                                onChange={(e) => setCorreoElectronico(e.target.value)}
                                className="input-field"
                                required
                            />
                        </div>

                        {/* Campo Contraseña */}
                        <div className="input-group">
                            <input
                                type="password"
                                placeholder="Contraseña"
                                value={adminContrasena}
                                onChange={(e) => setContrasena(e.target.value)}
                                className="input-field"
                                required
                            />
                        </div>

                        {/* Campo Confirmar Contraseña */}
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

                        {/* Botón de envío */}
                        <button type="submit" className="submit-btn">
                            Registrarse
                        </button>
                    </form>
                </div>
            </div>

            {/* Pie de página */}
            <Footer />
        </>
    );
}