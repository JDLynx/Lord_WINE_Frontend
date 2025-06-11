// src/components/ModalVerUsuario.jsx
import React from 'react';
import Modal from './Modal'; // Importamos el componente Modal genérico

const ModalVerUsuario = ({ user, onClose }) => {
  if (!user) return null; // No renderizar si no hay usuario

  return (
    <Modal title="Información Personal del Usuario" onClose={onClose}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-gray-700">
        {/* Fila 1 */}
        <div className="flex items-center space-x-3">
          <span className="text-red-500 text-2xl">🛡️</span> {/* Ícono de escudo */}
          <div>
            <p className="text-sm font-medium text-gray-500">Código de Usuario</p>
            <p className="text-lg font-semibold">{user.codigoUsuario}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-red-500 text-2xl">👤</span> {/* Ícono de persona */}
          <div>
            <p className="text-sm font-medium text-gray-500">Identificación</p>
            <p className="text-lg font-semibold">{user.identificacion}</p>
          </div>
        </div>

        {/* Fila 2 */}
        <div className="flex items-center space-x-3">
          <span className="text-red-500 text-2xl">👤</span> {/* Ícono de persona */}
          <div>
            <p className="text-sm font-medium text-gray-500">Nombre Completo</p>
            <p className="text-lg font-semibold">{user.nombreCompleto}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-red-500 text-2xl">🏠</span> {/* Ícono de casa */}
          <div>
            <p className="text-sm font-medium text-gray-500">Dirección</p>
            <p className="text-lg font-semibold">{user.direccion}</p>
          </div>
        </div>

        {/* Fila 3 */}
        <div className="flex items-center space-x-3">
          <span className="text-red-500 text-2xl">📞</span> {/* Ícono de teléfono */}
          <div>
            <p className="text-sm font-medium text-gray-500">Teléfono</p>
            <p className="text-lg font-semibold">{user.telefono}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-red-500 text-2xl">✉️</span> {/* Ícono de sobre */}
          <div>
            <p className="text-sm font-medium text-gray-500">Correo Electrónico</p>
            <p className="text-lg font-semibold">{user.correoElectronico}</p>
          </div>
        </div>

        {/* Fila 4 */}
        <div className="flex items-center space-x-3">
          <span className="text-red-500 text-2xl">🛡️</span> {/* Ícono de escudo */}
          <div>
            <p className="text-sm font-medium text-gray-500">Rol</p>
            <p className="text-lg font-semibold">{user.rol}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-red-500 text-2xl">📅</span> {/* Ícono de calendario */}
          <div>
            <p className="text-sm font-medium text-gray-500">Último Acceso</p>
            <p className="text-lg font-semibold">{user.ultimoAcceso}</p>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button
          onClick={onClose}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Cerrar
        </button>
      </div>
    </Modal>
  );
};

export default ModalVerUsuario;