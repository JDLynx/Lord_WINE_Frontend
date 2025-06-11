// src/components/Modal.jsx
import React from 'react';

const Modal = ({ children, onClose, title }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
        <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 text-xl font-bold"
            aria-label="Cerrar"
          >
            &times;
          </button>
        </div>
        <div className="p-6">
          {children} {/* Aquí se renderizará el contenido específico de cada modal */}
        </div>
      </div>
    </div>
  );
};

export default Modal;