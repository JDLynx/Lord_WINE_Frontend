import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from '../components/BarraProductos';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AiOutlineLoading } from 'react-icons/ai';
import './Login.css';

export default function RestablecerContrasena() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [codigo, setCodigo] = useState('');
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const correo = searchParams.get('email');

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

    if (nuevaContrasena !== confirmarContrasena) {
      showNotification('Las contraseñas no coinciden.', 'error');
      setLoading(false);
      return;
    }

    if (!correo) {
      showNotification('El correo no se encontró. Vuelve a la página de recuperación.', 'error');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo, codigo, nuevaContrasena }),
      });

      const data = await response.json();

      if (response.ok) {
        showNotification(data.mensaje, 'success');
        setTimeout(() => navigate('/login'), 3000);
      } else {
        showNotification(data.error || 'Error al restablecer la contraseña.', 'error');
      }
    } catch (err) {
      console.error("Error en restablecer contraseña:", err);
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
          <h2 className="login-title">Restablecer Contraseña</h2>

          {message && (
            <div className={`fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 transition-opacity duration-300 ${
              error ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
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
            <div className="input-group">
              <label htmlFor="correo" className="input-label">Correo electrónico:</label>
              <input
                type="email"
                className="input-field"
                id="correo"
                value={correo || ''}
                disabled
              />
            </div>
            <div className="input-group">
              <label htmlFor="codigo" className="input-label">Código de Verificación:</label>
              <input
                type="text"
                className="input-field"
                id="codigo"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="nuevaContrasena" className="input-label">Nueva Contraseña:</label>
              <input
                type="password"
                className="input-field"
                id="nuevaContrasena"
                value={nuevaContrasena}
                onChange={(e) => setNuevaContrasena(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="confirmarContrasena" className="input-label">Confirmar Contraseña:</label>
              <input
                type="password"
                className="input-field"
                id="confirmarContrasena"
                value={confirmarContrasena}
                onChange={(e) => setConfirmarContrasena(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Restableciendo..." : "Restablecer Contraseña"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}