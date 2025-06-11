import React from 'react';
import './GestionUsuario.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from '../components/BarraProductos';

const users = [
  { id: 1, nombre: 'Juan Pérez', rol: 'Administrador', estado: 'Activo' },
  { id: 2, nombre: 'María López', rol: 'Editor', estado: 'Inactivo' },
  { id: 3, nombre: 'Carlos Gómez', rol: 'Usuario', estado: 'Activo' },
];

const GestioUsuario = () => {
  return (
    <div className="page-container">
      <Header />
      <BarraProductos />
      <main className="bg-vistas">
        <div className="container">
          <h2>Gestionar Usuarios</h2>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.nombre}</td>
                  <td>{user.rol}</td>
                  <td>{user.estado}</td>
                  <td className="acciones">
                    <button className="ver" title="Ver">👁</button>
                    <button className="editar" title="Editar">✏</button>
                    <button className="eliminar" title="Eliminar">🗑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GestioUsuario;