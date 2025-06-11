// src/components/ModalEliminarUsuario.jsx
import React from 'react';
import Modal from './Modal';

const ModalEliminarUsuario = ({ user, onClose, onDelete }) => {
  return (
    <Modal title="Confirmar Eliminación" onClose={onClose}>
      <p className="text-lg text-gray-700">
        ¿Estás seguro de que deseas eliminar al usuario <span className="font-semibold">{user?.nombreCompleto}</span> (ID: {user?.id})?
      </p>
      <p className="text-sm text-red-600 mt-2">Esta acción no se puede deshacer.</p>
      <div className="mt-6 flex justify-end space-x-3">
        <button
          onClick={onClose}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg"
        >
          Cancelar
        </button>
        <button
          onClick={() => onDelete(user.id)} // Llama a la función de eliminar con el ID
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Eliminar
        </button>
      </div>
    </Modal>
  );
};

export default ModalEliminarUsuario;