import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from '../components/BarraProductos';
import { Key, Lock } from 'lucide-react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function CambiarContraseñaCliente() {
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [loading, setLoading] = useState(false); // No necesitamos 'loading' para una simulación sin backend
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
    setLoading(true); // Simula un estado de carga temporal para el UX
    setError('');
    setSuccessMessage('');

    if (passwords.newPassword !== passwords.confirmNewPassword) {
      setError('La nueva contraseña y su confirmación no coinciden.');
      setLoading(false);
      return;
    }
    if (passwords.newPassword.length < 6) { // Ejemplo de validación mínima
      setError('La nueva contraseña debe tener al menos 6 caracteres.');
      setLoading(false);
      return;
    }

    // --- SIMULACIÓN DE ÉXITO (SIN BACKEND) ---
    console.log('Simulando cambio de contraseña (solo frontend):', passwords);
    
    // Simula un retraso de red para mejor UX
    setTimeout(() => {
      setSuccessMessage('¡Contraseña cambiada exitosamente (simulado)!');
      setPasswords({ // Limpiar campos después de "éxito"
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });
      setLoading(false); // Finaliza la simulación de carga

      // Redirige al perfil después de un éxito simulado
      setTimeout(() => navigate('/perfil-cliente'), 1500); // Pequeño retraso para ver el mensaje
      
    }, 1000); // Simula 1 segundo de "carga"
    // --- FIN SIMULACIÓN ---
  };

  return (
    <>
      <div className="flex flex-col min-h-screen overflow-x-hidden">
        <Header />
        <BarraProductos />

        <main
          className="flex-grow flex flex-col items-center w-full py-8 px-4 sm:px-8 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/img/Viñedo.jpg')" }}
        >
          <div className="max-w-xl mx-auto w-full bg-white rounded-2xl shadow-lg p-8 sm:p-10">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center border-b pb-4 border-gray-200">
              Cambiar Contraseña
            </h1>

            {error && <div className="text-center text-red-600 font-bold mb-4">{error}</div>}
            {successMessage && <div className="text-center text-green-600 font-bold mb-4">{successMessage}</div>}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6">
              {/* Contraseña Actual */}
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
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

              {/* Nueva Contraseña */}
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
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

              {/* Confirmar Nueva Contraseña */}
              <div>
                <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700 mb-1">
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

              {/* Botones de acción */}
              <div className="flex justify-center space-x-6 mt-6">
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center space-x-2 text-lg"
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
                  onClick={() => navigate('/perfil-cliente')}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center space-x-2 text-lg"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
