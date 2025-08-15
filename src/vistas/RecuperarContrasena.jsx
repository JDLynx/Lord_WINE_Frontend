import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from '../components/BarraProductos';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineLoading } from 'react-icons/ai';
import './Login.css'; // Importa el nuevo CSS

export default function RecuperarContrasena() {
  const [correo, setCorreo] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const showNotification = (msg, type) => {
    setMessage(msg);
    setError(type === 'error' ? msg : '');
    setTimeout(() => {
      setMessage('');
      setError('');
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch("http://localhost:3000/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo }),
      });

      const data = await response.json();

      if (response.ok) {
        showNotification(data.mensaje, 'success');
        setTimeout(() => navigate(`/restablecer-contrasena?email=${correo}`), 2000);
      } else {
        showNotification(data.error || 'Error al solicitar el código.', 'error');
      }
    } catch (err) {
      console.error("Error en recuperar contraseña:", err);
      showNotification('Error al conectar con el servidor.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <Header />
      <BarraProductos />
      <main className="bg-vistas">
        <div className="login-card">
          <h2 className="login-title">Recuperar Contraseña</h2>
          <p className="text-center mb-4">Ingresa tu correo para recibir un código de verificación.</p>

          {message && (
            <div className={`notification-banner ${error ? 'error' : 'success'}`}>
              {message}
            </div>
          )}

          {loading && (
            <div className="text-center my-4 flex justify-center">
              <AiOutlineLoading className="animate-spin text-red-600 w-8 h-8" />
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="correo" className="input-label">Correo electrónico:</label>
              <input
                type="email"
                className="input-field"
                id="correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Enviando..." : "Enviar Código"}
            </button>
          </form>
          <p className="mt-5 text-center text-black">
            ¿Ya tienes el código?{" "}
            <Link to="/restablecer-contrasena" className="text-red-600 font-bold hover:underline">
              Restablecer aquí
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}