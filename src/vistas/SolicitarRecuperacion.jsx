// src/vistas/SolicitarRecuperacion.jsx (Actualizado)

import React, { useState } from 'react';
import axios from 'axios';
import Header from "../components/Header";
import Footer from "../components/Footer";
import BarraProductos from "../components/BarraProductos";
import { Link, useNavigate } from "react-router-dom"; // Asegúrate de importar useNavigate
import { AiOutlineLoading } from "react-icons/ai";
import "./SolicitarRecuperacion.css";

export default function SolicitarRecuperacion() {
  const [correo, setCorreo] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const navigate = useNavigate(); // Inicializa el hook de navegación

  const showNotification = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setMessageType('');

    try {
      const response = await axios.post('http://localhost:3000/api/auth/solicitar-recuperacion', {
        correo,
      });

      // Muestra la notificación de éxito
      showNotification(response.data.mensaje || 'Si el correo existe, se ha enviado un código de verificación.', 'success');
      
      // Añade esta línea para navegar a la siguiente vista
      navigate('/restablecer-contrasena'); 

    } catch (error) {
      console.error("Error al solicitar recuperación:", error);
      showNotification(error.response?.data?.error || 'Error al procesar la solicitud.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <Header />
      <BarraProductos />
      <main className="bg-vistas">
        <div className="recuperar-card">
          <h2 className="recuperar-title">Recuperar Contraseña</h2>
          <p className="text-center text-gray-400 mt-2 mb-4">
            Ingresa tu correo electrónico para recibir un código de verificación.
          </p>

          {message && (
            <div className={`fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 transition-opacity duration-300 ${
              messageType === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
            }`}>
              {message}
            </div>
          )}

          {loading && (
            <div className="text-center my-4 flex justify-center">
              <AiOutlineLoading className="animate-spin text-red-600 w-8 h-8" />
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="recuperar-input-group">
              <label htmlFor="correo" className="recuperar-input-label">Correo Electrónico:</label>
              <input
                type="email"
                id="correo"
                name="correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
                className="recuperar-input-field"
              />
            </div>
            <button
              type="submit"
              className="recuperar-submit-btn"
              disabled={loading}
            >
              {loading ? 'Enviando...' : 'Enviar Código'}
            </button>
          </form>
          <div className="mt-5 text-center text-black">
            <Link to="/login" className="text-red-600 font-bold hover:underline">
              Volver al inicio de sesión
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}