import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react'; // Icono de cerrar del modal

export default function EditarPerfil({ onClose, currentProfileData, onSaveSuccess }) {
  // Estado para los datos del formulario, inicializados con los datos actuales
  const [formData, setFormData] = useState({
    adminCodAdministrador: currentProfileData?.adminCodAdministrador || '',
    adminIdAdministrador: currentProfileData?.adminIdAdministrador || '',
    adminNombre: currentProfileData?.adminNombre || '',
    adminDireccion: currentProfileData?.adminDireccion || '',
    adminTelefono: currentProfileData?.adminTelefono || '',
    adminCorreoElectronico: currentProfileData?.adminCorreoElectronico || '',
    // La contraseña no se pre-rellena por seguridad, solo se puede establecer una nueva
    password: '',
    confirmPassword: '', // Para confirmar la nueva contraseña
  });

  // Estado para los errores de validación
  const [errors, setErrors] = useState({});

  // Efecto para actualizar formData si currentProfileData cambia (ej. al cargar el componente)
  useEffect(() => {
    if (currentProfileData) {
      setFormData((prevData) => ({
        ...prevData,
        adminCodAdministrador: currentProfileData.adminCodAdministrador || '',
        adminIdAdministrador: currentProfileData.adminIdAdministrador || '',
        adminNombre: currentProfileData.adminNombre || '',
        adminDireccion: currentProfileData.adminDireccion || '',
        adminTelefono: currentProfileData.adminTelefono || '',
        adminCorreoElectronico: currentProfileData.adminCorreoElectronico || '',
        // No actualizamos la contraseña aquí
      }));
    }
  }, [currentProfileData]);

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
    const phoneRegex = /^[0-9]{7,15}$/; // Asumiendo un número de 7 a 15 dígitos

    // Validaciones de campos requeridos
    if (!formData.adminCodAdministrador.trim()) newErrors.adminCodAdministrador = 'El código del administrador es requerido.';
    if (!formData.adminIdAdministrador.trim()) newErrors.adminIdAdministrador = 'La identificación es requerida.';
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

    // Validación de contraseña si se está cambiando
    if (formData.password) { // Solo validar si el campo de contraseña no está vacío
      if (formData.password.length < 6) {
        newErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Las contraseñas no coinciden.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retorna true si no hay errores
  };

  // Manejador de envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert('Por favor, corrige los errores en el formulario.');
      return;
    }

    // Prepara los datos a enviar (excluye confirmPassword)
    const dataToSave = {
      adminCodAdministrador: formData.adminCodAdministrador,
      adminIdAdministrador: formData.adminIdAdministrador,
      adminNombre: formData.adminNombre,
      adminDireccion: formData.adminDireccion,
      adminTelefono: formData.adminTelefono,
      adminCorreoElectronico: formData.adminCorreoElectronico,
    };

    // Si se ha proporcionado una nueva contraseña, inclúyela
    if (formData.password) {
      dataToSave.password = formData.password; // O el nombre del campo que uses en tu API
    }

    console.log('Datos a guardar:', dataToSave);

    try {
      // **Simulación de una llamada a la API**
      // Reemplaza esto con tu lógica real de fetch/axios para actualizar el perfil
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simula un retraso de red

      // Si la actualización es exitosa:
      // Pasa los datos actualizados al componente padre (excluyendo la contraseña)
      onSaveSuccess({
        adminCodAdministrador: formData.adminCodAdministrador,
        adminIdAdministrador: formData.adminIdAdministrador,
        adminNombre: formData.adminNombre,
        adminDireccion: formData.adminDireccion,
        adminTelefono: formData.adminTelefono,
        adminCorreoElectronico: formData.adminCorreoElectronico,
      });
      onClose(); // Cierra el modal
      alert('Perfil actualizado con éxito!');
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      alert('Hubo un error al actualizar el perfil. Inténtalo de nuevo.');
    }
  };

  // Efecto para cerrar el modal con la tecla ESC
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 p-4"> {/* Añadido p-4 para mejor responsividad en móviles */}
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg relative overflow-y-auto max-h-[90vh]"> {/* Aumentado max-w y añadido scroll si es necesario */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
          aria-label="Cerrar"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Editar Perfil de Administrador</h2>

        <form onSubmit={handleSubmit}>
          {/* Campo: adminCodAdministrador (Código del Administrador) - Podría ser no editable si es un ID fijo */}
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
              readOnly // Opcional: Si este campo no debe ser editable por el usuario
              required
            />
            {errors.adminCodAdministrador && <p className="text-red-500 text-xs italic mt-1">{errors.adminCodAdministrador}</p>}
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
              required
            />
            {errors.adminIdAdministrador && <p className="text-red-500 text-xs italic mt-1">{errors.adminIdAdministrador}</p>}
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
              type="text" // Usar "text" para permitir validación de patrón, o "tel" si quieres el teclado numérico en móvil
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
          <div className="mb-4">
            <label htmlFor="adminCorreoElectronico" className="block text-gray-700 text-sm font-bold mb-2">
              Correo Electrónico:
            </label>
            <input
              type="email" // Usar "email" para validación de formato de correo nativa del navegador
              id="adminCorreoElectronico"
              name="adminCorreoElectronico"
              value={formData.adminCorreoElectronico}
              onChange={handleChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 ${errors.adminCorreoElectronico ? 'border-red-500' : 'focus:ring-red-500'}`}
              required
            />
            {errors.adminCorreoElectronico && <p className="text-red-500 text-xs italic mt-1">{errors.adminCorreoElectronico}</p>}
          </div>

          {/* Campo: password (Nueva Contraseña) */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Nueva Contraseña: (Opcional, dejar en blanco para no cambiar)
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500' : 'focus:ring-red-500'}`}
              // No es requerido si el usuario no desea cambiarla
            />
            {errors.password && <p className="text-red-500 text-xs italic mt-1">{errors.password}</p>}
          </div>

          {/* Campo: confirmPassword (Confirmar Contraseña) */}
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
              Confirmar Contraseña:
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 ${errors.confirmPassword ? 'border-red-500' : 'focus:ring-red-500'}`}
              // Solo requerido si se está estableciendo una nueva contraseña
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs italic mt-1">{errors.confirmPassword}</p>}
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
              onClick={onClose}
              className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}