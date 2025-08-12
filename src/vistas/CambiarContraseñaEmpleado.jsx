import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from '../components/BarraProductos';
import { Key, Lock } from 'lucide-react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { AuthContext } from '../context/AuthContext';

export default function CambiarContraseñaEmpleado() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    if (passwords.newPassword !== passwords.confirmNewPassword) {
      setError('La nueva contraseña y su confirmación no coinciden.');
      setLoading(false);
      return;
    }

    if (passwords.newPassword.length < 6) {
      setError('La nueva contraseña debe tener al menos 6 caracteres.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`https://lord-wine-backend.onrender.com/api/empleados/${user.id}/cambiar-contrasena`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al cambiar la contraseña');
      }

      setSuccessMessage('¡Contraseña cambiada exitosamente!');
      setPasswords({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });

      setTimeout(() => navigate('/perfil'), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      <BarraProductos />

      <main
        className="flex-grow flex flex-col items-center w-full py-8 px-4 sm:px-8 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/img/Viñedo.jpg')" }}
      >
        <div className="max-w-xl mx-auto w-full bg-white rounded-2xl shadow-lg p-8 sm:p-10">
          <h1 className="text-2xl font-semibold text-black mb-8 text-center border-b pb-4 border-gray-200">
            Cambiar Contraseña de Empleado
          </h1>

          {error && <div className="text-center text-red-600 font-bold mb-4">{error}</div>}
          {successMessage && <div className="text-center text-green-600 font-bold mb-4">{successMessage}</div>}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6">
            <div>
              <label htmlFor="currentPassword" className="block text-lg font-medium text-black mb-1">
                <Key className="inline-block w-4 h-4 mr-2 text-red-500" />Contraseña Actual
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={passwords.currentPassword}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-base text-gray-900"
                required
              />
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-lg font-medium text-black mb-1">
                <Lock className="inline-block w-4 h-4 mr-2 text-red-500" />Nueva Contraseña
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={passwords.newPassword}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-base text-gray-900"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmNewPassword" className="block text-lg font-medium text-black mb-1">
                <Lock className="inline-block w-4 h-4 mr-2 text-red-500" />Confirmar Nueva Contraseña
              </label>
              <input
                type="password"
                id="confirmNewPassword"
                name="confirmNewPassword"
                value={passwords.confirmNewPassword}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-base text-gray-900"
                required
              />
            </div>

            <div className="flex justify-center space-x-6 mt-6">
              <button
                type="submit"
                className="bg-[#921913] hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center space-x-2 text-lg"
                disabled={loading}
              >
                {loading ? (
                  <AiOutlineLoading3Quarters className="w-5 h-5 animate-spin" />
                ) : (
                  <Key className="w-5 h-5" />
                )}
                <span>{loading ? 'Cambiando...' : 'Cambiar Contraseña'}</span>
              </button>
              <button
                type="button"
                onClick={() => navigate('/perfil')}
                className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center space-x-2 text-lg"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}