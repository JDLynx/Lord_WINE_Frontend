import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react'; // Icono de cerrar/volver

// Importamos los componentes reutilizables
import Header from '../components/Header'; // Asume que Header está en la misma carpeta o ajusta la ruta
import Footer from '../components/Footer'; // Asume que Footer está en la misma carpeta o ajusta la ruta
import BarraProductos from "../components/BarraProductos"; // Asume que BarraProductos está en la misma carpeta o ajusta la ruta

export default function EditarPerfil() {
  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    adminCodAdministrador: '',
    adminIdAdministrador: '',
    adminNombre: '',
    adminDireccion: '',
    adminTelefono: '',
    adminCorreoElectronico: '',
  });

  // Estado para los errores de validación
  const [errors, setErrors] = useState({});
  // Estado para manejar si los datos del perfil se están cargando
  const [isLoading, setIsLoading] = useState(true);
  // Estado para almacenar los datos del perfil actual después de cargarlos
  const [profileLoadError, setProfileLoadError] = useState(null); // Para errores de carga

  // useEffect para cargar los datos del perfil cuando la vista se monta
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setProfileLoadError(null); // Reiniciar errores de carga

      const adminCod = localStorage.getItem('adminCodAdministrador');

      if (!adminCod) {
        console.error("No se encontró el adminCodAdministrador en localStorage.");
        setProfileLoadError("No se pudo cargar el perfil: ID de administrador no encontrado.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://lord-wine-backend.onrender.com/api/administradores/${adminCod}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Inicializa el formData con los datos cargados
        setFormData({
          adminCodAdministrador: data.adminCodAdministrador || '',
          adminIdAdministrador: data.adminIdAdministrador || '',
          adminNombre: data.adminNombre || '',
          adminDireccion: data.adminDireccion || '',
          adminTelefono: data.adminTelefono || '',
          adminCorreoElectronico: data.adminCorreoElectronico || '',
        });
      } catch (error) {
        console.error("Error al cargar los datos del perfil:", error);
        setProfileLoadError("Hubo un error al cargar los datos del perfil. Por favor, inténtalo de nuevo.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // El array vacío asegura que se ejecuta solo una vez al montar

  // Manejador de cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Limpiar el error cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    }
  };

  // Función de validación
  const validateForm = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{7,15}$/;

    // Validaciones de campos requeridos (Ahora adminCodAdministrador y adminIdAdministrador no necesitan validación aquí porque son readOnly)
    if (!formData.adminNombre.trim()) newErrors.adminNombre = 'El nombre es requerido.';
    if (!formData.adminDireccion.trim()) newErrors.adminDireccion = 'La dirección es requerida.';
    if (!formData.adminTelefono.trim()) newErrors.adminTelefono = 'El teléfono es requerido.';
    if (!formData.adminCorreoElectronico.trim()) newErrors.adminCorreoElectronico = 'El correo electrónico es requerido.';

    // Validaciones de formato
    if (formData.adminCorreoElectronico.trim() && !emailRegex.test(formData.adminCorreoElectronico)) {
      newErrors.adminCorreoElectronico = 'El correo electrónico no es válido.';
    }
    if (formData.adminTelefono.trim() && !phoneRegex.test(formData.adminTelefono)) {
      newErrors.adminTelefono = 'El teléfono debe contener solo números (7-15 dígitos).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejador de envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert('Por favor, corrige los errores en el formulario.');
      return;
    }

    const adminCod = localStorage.getItem('adminCodAdministrador');
    if (!adminCod) {
      alert("Error: No se pudo obtener el código de administrador para actualizar.");
      return;
    }

    // Prepara los datos a enviar
    const dataToSave = {
      adminCodAdministrador: formData.adminCodAdministrador,
      adminIdAdministrador: formData.adminIdAdministrador,
      adminNombre: formData.adminNombre,
      adminDireccion: formData.adminDireccion,
      adminTelefono: formData.adminTelefono,
      adminCorreoElectronico: formData.adminCorreoElectronico,
    };

    console.log('Datos a guardar:', dataToSave);

    try {
      // Realiza la solicitud PUT a tu backend
      const response = await fetch(`https://lord-wine-backend.onrender.com/api/administradores/${adminCod}`, {
        method: 'PUT', // Usa PUT o PATCH según tu API
        headers: {
          'Content-Type': 'application/json',
          // Incluye headers de autenticación si son necesarios (ej. 'Authorization': `Bearer ${token}`)
        },
        body: JSON.stringify(dataToSave),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Intenta leer el error del cuerpo de la respuesta
        throw new Error(errorData.message || `Error HTTP: ${response.status}`);
      }

      const result = await response.json();
      console.log('Perfil actualizado con éxito:', result);
      alert('¡Perfil actualizado con éxito!');

      // Opcional: Redirigir al perfil o a otra página después de guardar
      window.history.back(); // Vuelve a la página anterior (PerfilAdministrador)

    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      alert(`Hubo un error al actualizar el perfil: ${error.message || 'Error desconocido'}. Inténtalo de nuevo.`);
    }
  };

  // Función para volver a la página anterior
  const handleGoBack = () => {
    window.history.back(); // Navega a la página anterior en el historial del navegador
  };

  // Renderizado condicional si los datos están cargando o si hay un error
  if (isLoading) {
    return (
      <div className="page-container">
        <Header />
        <BarraProductos />
        <main className="bg-vistas-home min-h-screen py-8 px-4 sm:px-8 flex justify-center items-center">
          <p className="text-gray-700 text-lg">Cargando datos del perfil para edición...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (profileLoadError) {
    return (
      <div className="page-container">
        <Header />
        <BarraProductos />
        <main className="bg-vistas-home min-h-screen py-8 px-4 sm:px-8 flex justify-center items-center flex-col">
          <p className="text-red-600 text-lg mb-4">{profileLoadError}</p>
          <button
            onClick={handleGoBack}
            className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Volver
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-container">
      <Header />
      <BarraProductos />

      <main className="bg-vistas-home min-h-screen py-8 px-4 sm:px-8">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-xl relative">
          <button
            onClick={handleGoBack}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            aria-label="Volver"
          >
            <X size={24} />
          </button>

          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Editar Perfil de Administrador</h2>

          <form onSubmit={handleSubmit}>
            {/* Campo: adminCodAdministrador (Código del Administrador) */}
            <div className="mb-4">
              <label htmlFor="adminCodAdministrador" className="block text-gray-700 text-sm font-bold mb-2">
                Código del Administrador:
              </label>
              <input
                type="text"
                id="adminCodAdministrador"
                name="adminCodAdministrador"
                value={formData.adminCodAdministrador}
                onChange={handleChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 ${errors.adminCodAdministrador ? 'border-red-500' : 'focus:ring-red-500'}`}
                readOnly // Mantener como solo lectura
                required
              />
              {/* No se necesita error para campos readOnly */}
            </div>

            {/* Campo: adminIdAdministrador (ID del Administrador) */}
            <div className="mb-4">
              <label htmlFor="adminIdAdministrador" className="block text-gray-700 text-sm font-bold mb-2">
                Identificación del Administrador:
              </label>
              <input
                type="text"
                id="adminIdAdministrador"
                name="adminIdAdministrador"
                value={formData.adminIdAdministrador}
                onChange={handleChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 ${errors.adminIdAdministrador ? 'border-red-500' : 'focus:ring-red-500'}`}
                readOnly // Añadido para que no sea editable
                required
              />
              {/* No se necesita error para campos readOnly */}
            </div>

            {/* Campo: adminNombre (Nombre) */}
            <div className="mb-4">
              <label htmlFor="adminNombre" className="block text-gray-700 text-sm font-bold mb-2">
                Nombre Completo:
              </label>
              <input
                type="text"
                id="adminNombre"
                name="adminNombre"
                value={formData.adminNombre}
                onChange={handleChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 ${errors.adminNombre ? 'border-red-500' : 'focus:ring-red-500'}`}
                required
              />
              {errors.adminNombre && <p className="text-red-500 text-xs italic mt-1">{errors.adminNombre}</p>}
            </div>

            {/* Campo: adminDireccion (Dirección) */}
            <div className="mb-4">
              <label htmlFor="adminDireccion" className="block text-gray-700 text-sm font-bold mb-2">
                Dirección:
              </label>
              <input
                type="text"
                id="adminDireccion"
                name="adminDireccion"
                value={formData.adminDireccion}
                onChange={handleChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 ${errors.adminDireccion ? 'border-red-500' : 'focus:ring-red-500'}`}
                required
              />
              {errors.adminDireccion && <p className="text-red-500 text-xs italic mt-1">{errors.adminDireccion}</p>}
            </div>

            {/* Campo: adminTelefono (Teléfono) */}
            <div className="mb-4">
              <label htmlFor="adminTelefono" className="block text-gray-700 text-sm font-bold mb-2">
                Teléfono:
              </label>
              <input
                type="text"
                id="adminTelefono"
                name="adminTelefono"
                value={formData.adminTelefono}
                onChange={handleChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 ${errors.adminTelefono ? 'border-red-500' : 'focus:ring-red-500'}`}
                required
              />
              {errors.adminTelefono && <p className="text-red-500 text-xs italic mt-1">{errors.adminTelefono}</p>}
            </div>

            {/* Campo: adminCorreoElectronico (Correo Electrónico) */}
            <div className="mb-6">
              <label htmlFor="adminCorreoElectronico" className="block text-gray-700 text-sm font-bold mb-2">
                Correo Electrónico:
              </label>
              <input
                type="email"
                id="adminCorreoElectronico"
                name="adminCorreoElectronico"
                value={formData.adminCorreoElectronico}
                onChange={handleChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 ${errors.adminCorreoElectronico ? 'border-red-500' : 'focus:ring-red-500'}`}
                required
              />
              {errors.adminCorreoElectronico && <p className="text-red-500 text-xs italic mt-1">{errors.adminCorreoElectronico}</p>}
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
              >
                Guardar Cambios
              </button>
              <button
                type="button"
                onClick={handleGoBack}
                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
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