import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BarraProductos from "../components/BarraProductos";
import { AiOutlineLoading } from "react-icons/ai";
import { AuthContext } from "../context/AuthContext";
import "./Login.css";

export default function Login() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const showNotification = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000);
  };

  const limpiarValoresAntiguos = () => {
    localStorage.removeItem("adminCodAdministrador");
    localStorage.removeItem("employeeCod");
    localStorage.removeItem("clienteCodCliente");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    setMessageType('');

    try {
      limpiarValoresAntiguos();

      const response = await fetch("https://lord-wine-backend.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo, contrasena }),
      });

      const data = await response.json();
      console.log("[Login] Respuesta del backend:", data);

      if (response.ok) {
        showNotification(`Bienvenido, ${data.rol}`, 'success');
        login(data.token);

        if (data.rol === "Administrador") {
          localStorage.setItem("adminCodAdministrador", data.id);
          navigate("/perfil");
        } else if (data.rol === "Cliente") {
          localStorage.setItem("clienteCodCliente", data.id);
          navigate("/perfil");
        } else if (data.rol === "Empleado") {
          localStorage.setItem("employeeCod", data.id);
          navigate("/perfil-empleado");
        }
      } else {
        setError(data.error || "Usuario o contraseña incorrectos.");
      }
    } catch (error) {
      console.error("Error en login:", error);
      setError("Error al conectar con el servidor.");
      showNotification("Error al conectar con el servidor.", 'error');
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
          <h2 className="login-title">Iniciar Sesión</h2>

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
            {error && (
              <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>
            )}
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Ingresando..." : "Ingresar"}
            </button>
          </form>

          <p className="mt-4 text-center text-gray-400">
            ¿Olvidaste tu contraseña?{" "}
            <Link to="/solicitar-recuperacion" className="text-red-600 font-bold hover:underline">
              Recuperar
            </Link>
          </p>
        </div>
        <p className="mt-5 text-center text-black">
          ¿No tienes una cuenta?{" "}
          <Link to="/registro" className="text-red-600 font-bold hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </main>
      <Footer />
    </div>
  );
}