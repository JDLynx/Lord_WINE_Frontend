// src/vistas/RestablecerContrasena.jsx

import React, { useState } from 'react';
import axios from 'axios';
import Header from "../components/Header";
import Footer from "../components/Footer";
import BarraProductos from "../components/BarraProductos";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLoading } from "react-icons/ai";
import "./RestablecerContrasena.css";

export default function RestablecerContrasena() {
  const [formData, setFormData] = useState({
    correo: '',
    token: '',
    nuevaContrasena: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const showNotification = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setMessageType('');

    try {
      const response = await axios.post('http://localhost:3000/api/auth/restablecer-contrasena', formData);

      showNotification(response.data.mensaje || 'Contraseña actualizada exitosamente.', 'success');
      setFormData({ correo: '', token: '', nuevaContrasena: '' });
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      console.error("Error al restablecer contraseña:", error);
      showNotification(error.response?.data?.error || 'Token inválido o expirado.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <Header />
      <BarraProductos />
      <main className="bg-vistas">
        <div className="restablecer-card">
          <h2 className="restablecer-title">Restablecer Contraseña</h2>
          <p className="text-center text-gray-400 mt-2 mb-4">
            Ingresa el código que te enviamos y tu nueva contraseña.
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
            <div className="restablecer-input-group">
              <label htmlFor="correo" className="restablecer-input-label">Correo Electrónico:</label>
              <input
                type="email"
                id="correo"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                required
                className="restablecer-input-field"
              />
            </div>
            <div className="restablecer-input-group">
              <label htmlFor="token" className="restablecer-input-label">Código de Verificación:</label>
              <input
                type="text"
                id="token"
                name="token"
                value={formData.token}
                onChange={handleChange}
                required
                className="restablecer-input-field"
              />
            </div>
            <div className="restablecer-input-group">
              <label htmlFor="nuevaContrasena" className="restablecer-input-label">Nueva Contraseña:</label>
              <input
                type="password"
                id="nuevaContrasena"
                name="nuevaContrasena"
                value={formData.nuevaContrasena}
                onChange={handleChange}
                required
                className="restablecer-input-field"
              />
            </div>
            <button
              type="submit"
              className="restablecer-submit-btn"
              disabled={loading}
            >
              {loading ? 'Restableciendo...' : 'Restablecer Contraseña'}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}