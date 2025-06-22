import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from '../components/BarraProductos';
import { User, Mail, Phone, Home, CreditCard, Edit, Save, XCircle } from 'lucide-react';

export default function MiPerfil() {
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    // Simular la carga de datos del perfil del cliente
    const simulatedClient = {
      clientCod: 'CLI001',
      clientId: '123456789',
      clientNombre: 'Sofía Isabel Ramírez',
      clientDireccion: 'Avenida Siempre Viva 742, Springfield',
      clientTelefono: '3159876543',
      clientCorreoElectronico: 'sofia.ramirez@example.com',
    };
    setTimeout(() => {
      setProfileData(simulatedClient);
      setEditedData(simulatedClient); // Inicializar editedData con los datos cargados
    }, 500);
  }, []);

  const validateForm = (data) => {
    const errors = {};
    if (!data.clientNombre || data.clientNombre.trim() === '') errors.clientNombre = 'El nombre es obligatorio.';
    if (!data.clientDireccion || data.clientDireccion.trim() === '') errors.clientDireccion = 'La dirección es obligatoria.';
    if (!data.clientTelefono || data.clientTelefono.trim() === '') {
      errors.clientTelefono = 'El teléfono es obligatorio.';
    } else if (!/^\d{7,10}$/.test(data.clientTelefono)) {
      errors.clientTelefono = 'El formato del teléfono es inválido (7-10 dígitos).';
    }
    if (!data.clientCorreoElectronico) {
      errors.clientCorreoElectronico = 'El correo es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(data.clientCorreoElectronico)) {
      errors.clientCorreoElectronico = 'El formato del correo es inválido.';
    }
    return errors;
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedData({ ...profileData }); // Crear una copia para la edición
    setFormErrors({});
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    const errors = validateForm(editedData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setProfileData(editedData); // Actualizar los datos del perfil con los editados
    setIsEditing(false);
    alert('Perfil actualizado correctamente (simulado).');
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedData({ ...profileData }); // Revertir a los datos originales
    setFormErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prev => ({ ...prev, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: undefined }));
  };

  if (!profileData) {
    return (
      <div className="flex flex-col min-h-screen overflow-x-hidden">
        <Header />
        <BarraProductos />
        <main 
          className="flex-grow flex items-center justify-center w-full py-8 px-4 sm:px-8 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/img/Viñedo.jpg')" }}
        >
          <div className="text-center text-gray-600 text-lg">Cargando información de su perfil...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      <BarraProductos />
      <main 
        className="flex-grow flex flex-col items-center w-full py-8 px-4 sm:px-8 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/img/Viñedo.jpg')" }}
      >
        <div className="max-w-4xl mx-auto w-full bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Mi Perfil</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-center space-x-4">
              <CreditCard className="w-6 h-6 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-500">Código de Cliente</p>
                <p className="font-semibold text-gray-800">{profileData.clientCod}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <User className="w-6 h-6 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-500">Identificación</p>
                <p className="font-semibold text-gray-800">{profileData.clientId}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <User className="w-6 h-6 text-yellow-600 mt-1" />
              <div className="w-full">
                <label htmlFor="clientNombre" className="block text-sm text-gray-500 mb-1">Nombre Completo</label>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      id="clientNombre"
                      name="clientNombre"
                      value={editedData.clientNombre}
                      onChange={handleChange}
                      className={`shadow appearance-none border ${formErrors.clientNombre ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent`}
                    />
                    {formErrors.clientNombre && <p className="text-red-500 text-xs italic mt-1">{formErrors.clientNombre}</p>}
                  </>
                ) : (
                  <p className="font-semibold text-gray-800">{profileData.clientNombre}</p>
                )}
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Home className="w-6 h-6 text-yellow-600 mt-1" />
              <div className="w-full">
                <label htmlFor="clientDireccion" className="block text-sm text-gray-500 mb-1">Dirección</label>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      id="clientDireccion"
                      name="clientDireccion"
                      value={editedData.clientDireccion}
                      onChange={handleChange}
                      className={`shadow appearance-none border ${formErrors.clientDireccion ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent`}
                    />
                    {formErrors.clientDireccion && <p className="text-red-500 text-xs italic mt-1">{formErrors.clientDireccion}</p>}
                  </>
                ) : (
                  <p className="font-semibold text-gray-800">{profileData.clientDireccion}</p>
                )}
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Phone className="w-6 h-6 text-yellow-600 mt-1" />
              <div className="w-full">
                <label htmlFor="clientTelefono" className="block text-sm text-gray-500 mb-1">Teléfono</label>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      id="clientTelefono"
                      name="clientTelefono"
                      value={editedData.clientTelefono}
                      onChange={handleChange}
                      className={`shadow appearance-none border ${formErrors.clientTelefono ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent`}
                    />
                    {formErrors.clientTelefono && <p className="text-red-500 text-xs italic mt-1">{formErrors.clientTelefono}</p>}
                  </>
                ) : (
                  <p className="font-semibold text-gray-800">{profileData.clientTelefono}</p>
                )}
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Mail className="w-6 h-6 text-yellow-600 mt-1" />
              <div className="w-full">
                <label htmlFor="clientCorreoElectronico" className="block text-sm text-gray-500 mb-1">Correo Electrónico</label>
                {isEditing ? (
                  <>
                    <input
                      type="email"
                      id="clientCorreoElectronico"
                      name="clientCorreoElectronico"
                      value={editedData.clientCorreoElectronico}
                      onChange={handleChange}
                      className={`shadow appearance-none border ${formErrors.clientCorreoElectronico ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent`}
                    />
                    {formErrors.clientCorreoElectronico && <p className="text-red-500 text-xs italic mt-1">{formErrors.clientCorreoElectronico}</p>}
                  </>
                ) : (
                  <p className="font-semibold text-gray-800">{profileData.clientCorreoElectronico}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-4 mt-8">
            {isEditing ? (
              <>
                <button
                  onClick={handleSaveClick}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center space-x-2 text-lg"
                >
                  <Save className="w-5 h-5" />
                  <span>Guardar Cambios</span>
                </button>
                <button
                  onClick={handleCancelClick}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center space-x-2 text-lg"
                >
                  <XCircle className="w-5 h-5" />
                  <span>Cancelar</span>
                </button>
              </>
            ) : (
              <button
                onClick={handleEditClick}
                className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center space-x-2 text-lg"
              >
                <Edit className="w-5 h-5" />
                <span>Editar Perfil</span>
              </button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
