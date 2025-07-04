import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from '../components/BarraProductos';
import { User, Mail, Phone, Home, PlusCircle, Edit, Trash2, XCircle, Save } from 'lucide-react';

export default function ClientesEmpleado() {
  const [clients, setClients] = useState([
    { id: 1, name: 'Juan Pérez', email: 'juan.perez@example.com', phone: '3101234567', address: 'Calle 1 #2-3, Ciudad A' },
    { id: 2, name: 'Ana López', email: 'ana.lopez@example.com', phone: '3207654321', address: 'Carrera 4 #5-6, Ciudad B' },
    { id: 3, name: 'Pedro Gómez', email: 'pedro.gomez@example.com', phone: '3009876543', address: 'Avenida 7 #8-9, Ciudad C' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newClient, setNewClient] = useState({ name: '', email: '', phone: '', address: '' });
  const [editedClient, setEditedClient] = useState({});

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setNewClient({ name: '', email: '', phone: '', address: '' });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddClient = () => {
    const id = clients.length > 0 ? Math.max(...clients.map(c => c.id)) + 1 : 1;
    setClients([...clients, { id, ...newClient }]);
    handleCloseModal();
  };

  const handleEditClick = (client) => {
    setEditingId(client.id);
    setEditedClient({ ...client });
  };

  const handleSaveEdit = (id) => {
    setClients(clients.map(client => client.id === id ? editedClient : client));
    setEditingId(null);
    setEditedClient({});
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedClient({});
  };

  const handleDeleteClient = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este cliente?')) {
      setClients(clients.filter(client => client.id !== id));
      alert('Cliente eliminado (simulado).');
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      <BarraProductos />
      <main
        className="flex-grow flex flex-col items-center w-full py-8 px-4 sm:px-8 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/img/Viñedo.jpg')" }}
      >
        <div className="max-w-6xl mx-auto w-full bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">Gestión de Clientes</h2>

          <button
            onClick={handleOpenModal}
            className="mb-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md flex items-center space-x-2 transition-colors"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Añadir Nuevo Cliente</span>
          </button>

          {isModalOpen && (
            <div className="fixed inset-0 flex justify-center items-center z-50">

              <div className="absolute inset-0 bg-gray-500/20 backdrop-blur-sm"></div>

              <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md mx-4 relative z-10">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Añadir Nuevo Cliente</h3>
                <div className="grid grid-cols-1 gap-4 mb-6">
                  <div className="flex flex-col">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1">Nombre</label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Nombre"
                      value={newClient.name}
                      onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                      className="p-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Correo Electrónico"
                      value={newClient.email}
                      onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                      className="p-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="Teléfono"
                      value={newClient.phone}
                      onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                      className="p-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="address" className="text-sm font-medium text-gray-700 mb-1">Dirección</label>
                    <input
                      id="address"
                      type="text"
                      placeholder="Dirección"
                      value={newClient.address}
                      onChange={(e) => setNewClient({ ...newClient, address: e.target.value })}
                      className="p-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4 mt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 text-gray-800 flex items-center space-x-1"
                  >
                    <XCircle size={18} /> <span>Cancelar</span>
                  </button>
                  <button
                    onClick={handleAddClient}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors flex items-center space-x-1"
                  >
                    <Save size={18} /> <span>Guardar Cliente</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {clients.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">ID</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Nombre</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Email</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Teléfono</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Dirección</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map(client => (
                    <tr key={client.id} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50 text-gray-600">

                      <td className="py-3 px-4">{client.id}</td>

                      <td className="py-3 px-4">
                        {editingId === client.id ? (
                          <input type="text" value={editedClient.name} onChange={(e) => setEditedClient({ ...editedClient, name: e.target.value })} className="p-1 border rounded-md w-full" />
                        ) : (
                          <span className="flex items-center space-x-2"><User className="w-4 h-4 text-gray-500" /><span>{client.name}</span></span>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        {editingId === client.id ? (
                          <input type="email" value={editedClient.email} onChange={(e) => setEditedClient({ ...editedClient, email: e.target.value })} className="p-1 border rounded-md w-full" />
                        ) : (
                          <span className="flex items-center space-x-2"><Mail className="w-4 h-4 text-gray-500" /><span>{client.email}</span></span>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        {editingId === client.id ? (
                          <input type="tel" value={editedClient.phone} onChange={(e) => setEditedClient({ ...editedClient, phone: e.target.value })} className="p-1 border rounded-md w-full" />
                        ) : (
                          <span className="flex items-center space-x-2"><Phone className="w-4 h-4 text-gray-500" /><span>{client.phone}</span></span>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        {editingId === client.id ? (
                          <input type="text" value={editedClient.address} onChange={(e) => setEditedClient({ ...editedClient, address: e.target.value })} className="p-1 border rounded-md w-full" />
                        ) : (
                          <span className="flex items-center space-x-2"><Home className="w-4 h-4 text-gray-500" /><span>{client.address}</span></span>
                        )}
                      </td>

                      <td className="py-3 px-4 flex space-x-2">
                        {editingId === client.id ? (
                          <>
                            <button onClick={() => handleSaveEdit(client.id)} className="text-green-600 hover:text-green-800"><Save className="w-5 h-5" /></button>
                            <button onClick={handleCancelEdit} className="text-red-600 hover:text-red-800"><XCircle className="w-5 h-5" /></button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => handleEditClick(client)} className="text-red-600 hover:text-red-800"><Edit className="w-5 h-5" /></button>
                            <button onClick={() => handleDeleteClient(client.id)} className="text-red-600 hover:text-red-800"><Trash2 className="w-5 h-5" /></button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-8">No hay clientes registrados.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}