//Restaurando versión
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
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo, contrasena }),
      });

      const data = await response.json();
      console.log("[Login] Respuesta del backend:", data);

      if (response.ok) {
        alert(`Bienvenido, ${data.rol}`);
        login({ role: data.rol });

        if (data.rol === "Administrador") {
          localStorage.setItem("adminCodAdministrador", data.adminCodAdministrador);
          navigate("/perfil");
        } else if (data.rol === "Empleado") {
          localStorage.setItem("employeeCod", data.emplCodEmpleado);
          navigate("/perfil-empleado");
        } else if (data.rol === "Cliente") {
          localStorage.setItem("clienteCodCliente", data.clCodCliente);
          navigate("/perfil-cliente");
        }
      } else {
        setError(data.error || "Usuario o contraseña incorrectos.");
      }
    } catch (error) {
      setError("Error al conectar con el servidor.");
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
