// src/components/ModalEditarUsuario.jsx
import React, { useState, useEffect } from 'react';
// import { X } from 'lucide-react'; // Ya no es necesario si usamos el Modal genérico
import Modal from './Modal'; // Importamos el componente Modal genérico

// Renombramos el componente a ModalEditarUsuario
export default function ModalEditarUsuario({ user, onClose, onSave }) { // Renombramos props
  // Estado para los datos del formulario, inicializados con los datos del 'user'
  const [formData, setFormData] = useState({
    codigoUsuario: user?.codigoUsuario || '', // Mapeo de campo
    identificacion: user?.identificacion || '', // Mapeo de campo
    nombreCompleto: user?.nombreCompleto || '', // Mapeo de campo
    direccion: user?.direccion || '', // Mapeo de campo
    telefono: user?.telefono || '', // Mapeo de campo
    correoElectronico: user?.correoElectronico || '', // Mapeo de campo
    password: '',
    confirmPassword: '',
    // No incluir rol ni ultimoAcceso aquí a menos que también sean editables
    // Si rol es editable, probablemente querrías un select/dropdown
  });

  const [errors, setErrors] = useState({});

  // Efecto para actualizar formData si el 'user' prop cambia
  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        codigoUsuario: user.codigoUsuario || '',
        identificacion: user.identificacion || '',
        nombreCompleto: user.nombreCompleto || '',
        direccion: user.direccion || '',
        telefono: user.telefono || '',
        correoElectronico: user.correoElectronico || '',
        // No actualizamos la contraseña aquí ni confirmPassword
        password: '',
        confirmPassword: '',
      }));
      setErrors({}); // Limpiar errores al cambiar de usuario
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    }
  };

  const validateForm = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{7,15}$/;

    // Validaciones de campos requeridos (usando los nuevos nombres)
    if (!formData.codigoUsuario.trim()) newErrors.codigoUsuario = 'El código de usuario es requerido.';
    if (!formData.identificacion.trim()) newErrors.identificacion = 'La identificación es requerida.';
    if (!formData.nombreCompleto.trim()) newErrors.nombreCompleto = 'El nombre completo es requerido.';
    if (!formData.direccion.trim()) newErrors.direccion = 'La dirección es requerida.';
    if (!formData.telefono.trim()) newErrors.telefono = 'El teléfono es requerido.';
    if (!formData.correoElectronico.trim()) newErrors.correoElectronico = 'El correo electrónico es requerido.';

    // Validaciones de formato
    if (formData.correoElectronico.trim() && !emailRegex.test(formData.correoElectronico)) {
      newErrors.correoElectronico = 'El correo electrónico no es válido.';
    }
    if (formData.telefono.trim() && !phoneRegex.test(formData.telefono)) {
      newErrors.telefono = 'El teléfono debe contener solo números (7-15 dígitos).';
    }

    // Validación de contraseña si se está cambiando
    if (formData.password) {
      if (formData.password.length < 6) {
        newErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Las contraseñas no coinciden.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert('Por favor, corrige los errores en el formulario.');
      return;
    }

    // Prepara los datos a enviar
    const dataToSave = {
      ...formData, // Incluye todos los campos del formulario
      // ...user, // Opcional: si quieres mantener campos no editables del usuario original
      id: user.id, // Asegurarse de enviar el ID del usuario
    };

    // Elimina confirmPassword antes de guardar, ya que no se envía a la API
    delete dataToSave.confirmPassword;
    // Si la contraseña está vacía, no la envíes para no cambiarla
    if (dataToSave.password === '') {
      delete dataToSave.password;
    }

    console.log('Datos a guardar (simulados):', dataToSave);

    try {
      // Simulación de una llamada a la API de actualización
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Llama a la función onSave del padre con los datos actualizados
      onSave(dataToSave); // Pasa todo el objeto dataToSave

      // onSaveSuccess ya no se usa, el padre (GestionUsuario) manejará la confirmación/cierre
      // onClose(); // onClose se llama desde onSave en el padre si todo va bien
      alert('Usuario actualizado con éxito!');
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      alert('Hubo un error al actualizar el usuario. Inténtalo de nuevo.');
    }
  };

  // El useEffect para cerrar con ESC ya lo maneja el Modal genérico con su onClose

  return (
    // Envolvemos todo el contenido del formulario con nuestro Modal genérico
    <Modal title={`Editar Usuario: ${user?.nombreCompleto}`} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        {/* Campo: codigoUsuario (Código del Usuario) */}
        <div className="mb-4">
          <label htmlFor="codigoUsuario" className="block text-gray-700 text-sm font-bold mb-2">
            Código del Usuario:
          </label>
          <input
            type="text"
            id="codigoUsuario"
            name="codigoUsuario"
            value={formData.codigoUsuario}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 ${errors.codigoUsuario ? 'border-red-500' : 'focus:ring-red-500'}`}
            // Considerar si este campo debe ser readOnly, como un ID único
            required
          />
          {errors.codigoUsuario && <p className="text-red-500 text-xs italic mt-1">{errors.codigoUsuario}</p>}
        </div>

        {/* Campo: identificacion (Identificación) */}
        <div className="mb-4">
          <label htmlFor="identificacion" className="block text-gray-700 text-sm font-bold mb-2">
            Identificación:
          </label>
          <input
            type="text"
            id="identificacion"
            name="identificacion"
            value={formData.identificacion}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 ${errors.identificacion ? 'border-red-500' : 'focus:ring-red-500'}`}
            required
          />
          {errors.identificacion && <p className="text-red-500 text-xs italic mt-1">{errors.identificacion}</p>}
        </div>

        {/* Campo: nombreCompleto (Nombre) */}
        <div className="mb-4">
          <label htmlFor="nombreCompleto" className="block text-gray-700 text-sm font-bold mb-2">
            Nombre Completo:
          </label>
          <input
            type="text"
            id="nombreCompleto"
            name="nombreCompleto"
            value={formData.nombreCompleto}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 ${errors.nombreCompleto ? 'border-red-500' : 'focus:ring-red-500'}`}
            required
          />
          {errors.nombreCompleto && <p className="text-red-500 text-xs italic mt-1">{errors.nombreCompleto}</p>}
        </div>

        {/* Campo: direccion (Dirección) */}
        <div className="mb-4">
          <label htmlFor="direccion" className="block text-gray-700 text-sm font-bold mb-2">
            Dirección:
          </label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 ${errors.direccion ? 'border-red-500' : 'focus:ring-red-500'}`}
            required
          />
          {errors.direccion && <p className="text-red-500 text-xs italic mt-1">{errors.direccion}</p>}
        </div>

        {/* Campo: telefono (Teléfono) */}
        <div className="mb-4">
          <label htmlFor="telefono" className="block text-gray-700 text-sm font-bold mb-2">
            Teléfono:
          </label>
          <input
            type="text"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 ${errors.telefono ? 'border-red-500' : 'focus:ring-red-500'}`}
            required
          />
          {errors.telefono && <p className="text-red-500 text-xs italic mt-1">{errors.telefono}</p>}
        </div>

        {/* Campo: correoElectronico (Correo Electrónico) */}
        <div className="mb-4">
          <label htmlFor="correoElectronico" className="block text-gray-700 text-sm font-bold mb-2">
            Correo Electrónico:
          </label>
          <input
            type="email"
            id="correoElectronico"
            name="correoElectronico"
            value={formData.correoElectronico}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 ${errors.correoElectronico ? 'border-red-500' : 'focus:ring-red-500'}`}
            required
          />
          {errors.correoElectronico && <p className="text-red-500 text-xs italic mt-1">{errors.correoElectronico}</p>}
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
    </Modal>
  );
}