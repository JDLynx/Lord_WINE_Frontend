// src/views/GestionUsuario.jsx

import React, { useState } from 'react';
import './GestionUsuario.css'; // Asegúrate de que este archivo CSS existe si lo estás usando
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from '../components/BarraProductos';
import ModalVerUsuario from '../components/ModalVerUsuario';
import ModalEditarUsuario from '../components/ModalEditarUsuario';
import ModalEliminarUsuario from '../components/ModalEliminarUsuario';

// Array inicial de usuarios, ahora fuera del componente para ser el estado inicial
const initialUsers = [
  {
    id: 1,
    codigoUsuario: 'USR001',
    identificacion: '123456789',
    nombreCompleto: 'Juan Pérez González',
    direccion: 'Calle Falsa 123, Ciudad',
    telefono: '3101234567',
    correoElectronico: 'juanperez@lordwine.com',
    rol: 'Administrador General',
    ultimoAcceso: 'Hoy, 2:30 PM',
    estado: 'Activo'
  },
  {
    id: 2,
    codigoUsuario: 'USR002',
    identificacion: '987654321',
    nombreCompleto: 'María López García',
    direccion: 'Avenida Siempre Viva 742, Pueblo',
    telefono: '3209876543',
    correoElectronico: 'marialopez@lordwine.com',
    rol: 'Editor',
    ultimoAcceso: 'Ayer, 10:00 AM',
    estado: 'Inactivo'
  },
  {
    id: 3,
    codigoUsuario: 'USR003',
    identificacion: '456789123',
    nombreCompleto: 'Carlos Gómez Ruíz',
    direccion: 'Carrera 5 #10-20, Villa',
    telefono: '3001122334',
    correoElectronico: 'carlosgomez@lordwine.com',
    rol: 'Usuario',
    ultimoAcceso: 'Hace 3 días, 4:00 PM',
    estado: 'Activo'
  },
  {
    id: 4,
    codigoUsuario: 'USR004',
    identificacion: '112233445',
    nombreCompleto: 'Ana Martínez Soto',
    direccion: 'Plaza Mayor 5, Centro',
    telefono: '3015566778',
    correoElectronico: 'anamartinez@lordwine.com',
    rol: 'Usuario',
    ultimoAcceso: 'Hoy, 11:00 AM',
    estado: 'Activo'
  },
  {
    id: 5,
    codigoUsuario: 'USR005',
    identificacion: '667788990',
    nombreCompleto: 'Pedro Ramírez Torres',
    direccion: 'Calle Luna 10, Barrio',
    telefono: '3159988776',
    correoElectronico: 'pedroramirez@lordwine.com',
    rol: 'Editor',
    ultimoAcceso: 'Hace 1 día, 6:00 PM',
    estado: 'Inactivo'
  },
];

const GestioUsuario = () => {
  // El estado 'users' se inicializa con el array initialUsers
  const [users, setUsers] = useState(initialUsers);

  // Estados para controlar la visibilidad de los modales y el usuario seleccionado
  const [showModalVer, setShowModalVer] = useState(false);
  const [showModalEditar, setShowModalEditar] = useState(false);
  const [showModalEliminar, setShowModalEliminar] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Funciones para abrir modales y establecer el usuario seleccionado
  const handleOpenModalVer = (user) => {
    setSelectedUser(user);
    setShowModalVer(true);
  };

  const handleOpenModalEditar = (user) => {
    setSelectedUser(user);
    setShowModalEditar(true);
  };

  const handleOpenModalEliminar = (user) => {
    setSelectedUser(user);
    setShowModalEliminar(true);
  };

  // Función para cerrar todos los modales y limpiar el usuario seleccionado
  const handleCloseModals = () => {
    setShowModalVer(false);
    setShowModalEditar(false);
    setShowModalEliminar(false);
    setSelectedUser(null);
  };

  // Lógica para guardar un usuario editado y actualizar el estado
  const handleSaveEditedUser = (updatedUser) => {
    console.log("Guardando usuario editado y actualizando estado:", updatedUser);
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === updatedUser.id ? { ...user, ...updatedUser } : user
      )
    );
    handleCloseModals(); // Cierra el modal después de guardar
    alert(`Usuario ${updatedUser.nombreCompleto} actualizado con éxito!`);
  };

  // Lógica para eliminar un usuario y actualizar el estado
  const handleDeleteUser = (userId) => {
    console.log("Eliminando usuario con ID y actualizando estado:", userId);
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    handleCloseModals(); // Cierra el modal después de eliminar
    alert(`Usuario con ID ${userId} eliminado con éxito!`);
  };

  return (
    <div className="page-container">
      <Header />
      <BarraProductos />
      <main className="bg-vistas p-4">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-4">Gestionar Usuarios</h2>
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">#</th>
                <th className="py-3 px-6 text-left">Código Usuario</th>
                <th className="py-3 px-6 text-left">Identificación</th>
                <th className="py-3 px-6 text-left">Nombre Completo</th>
                <th className="py-3 px-6 text-left">Rol</th>
                <th className="py-3 px-6 text-left">Estado</th>
                <th className="py-3 px-6 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {/* Mapea el estado 'users' para renderizar las filas de la tabla */}
              {users.map((user, index) => (
                <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{index + 1}</td>
                  <td className="py-3 px-6 text-left">{user.codigoUsuario}</td>
                  <td className="py-3 px-6 text-left">{user.identificacion}</td>
                  <td className="py-3 px-6 text-left">{user.nombreCompleto}</td>
                  <td className="py-3 px-6 text-left">{user.rol}</td>
                  <td className="py-3 px-6 text-left">
                    <span className={`py-1 px-3 rounded-full text-xs ${user.estado === 'Activo' ? 'bg-green-200 text-green-600' : 'bg-red-200 text-red-600'}`}>
                      {user.estado}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex item-center justify-center space-x-2">
                      <button
                        onClick={() => handleOpenModalVer(user)}
                        className="ver text-blue-500 hover:text-blue-700 font-bold py-1 px-2 rounded-full"
                        title="Ver"
                      >
                        👁
                      </button>
                      <button
                        onClick={() => handleOpenModalEditar(user)}
                        className="editar text-yellow-500 hover:text-yellow-700 font-bold py-1 px-2 rounded-full"
                        title="Editar"
                      >
                        ✏
                      </button>
                      <button
                        onClick={() => handleOpenModalEliminar(user)}
                        className="eliminar text-red-500 hover:text-red-700 font-bold py-1 px-2 rounded-full"
                        title="Eliminar"
                      >
                        🗑
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />

      {/* Renderizado condicional de los modales */}
      {showModalVer && selectedUser && (
        <ModalVerUsuario
          user={selectedUser}
          onClose={handleCloseModals}
        />
      )}

      {showModalEditar && selectedUser && (
        <ModalEditarUsuario
          user={selectedUser}
          onClose={handleCloseModals}
          onSave={handleSaveEditedUser}
        />
      )}

      {showModalEliminar && selectedUser && (
        <ModalEliminarUsuario
          user={selectedUser}
          onClose={handleCloseModals}
          onDelete={handleDeleteUser}
        />
      )}
    </div>
  );
};

export default GestioUsuario;