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
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newClient, setNewClient] = useState({ name: '', email: '', phone: '', address: '' });
  const [editedClient, setEditedClient] = useState({});

  const handleAddClient = () => {
    // Simulamos un ID único para el nuevo cliente
    const id = clients.length > 0 ? Math.max(...clients.map(c => c.id)) + 1 : 1;
    setClients([...clients, { id, ...newClient }]);
    setNewClient({ name: '', email: '', phone: '', address: '' });
    setIsAdding(false);
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
            onClick={() => setIsAdding(!isAdding)}
            className="mb-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md flex items-center space-x-2 transition-colors"
          >
            <PlusCircle className="w-5 h-5" />
            <span>{isAdding ? 'Cancelar' : 'Añadir Nuevo Cliente'}</span>
          </button>

          {isAdding && (
            <div className="bg-red-50 p-6 rounded-md mb-6 shadow-sm"> {/* Fondo de la sección de añadir cambiado a rojo claro */}
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Añadir Nuevo Cliente</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input type="text" placeholder="Nombre" value={newClient.name} onChange={(e) => setNewClient({ ...newClient, name: e.target.value })} className="p-2 border rounded-md" />
                <input type="email" placeholder="Correo Electrónico" value={newClient.email} onChange={(e) => setNewClient({ ...newClient, email: e.target.value })} className="p-2 border rounded-md" />
                <input type="tel" placeholder="Teléfono" value={newClient.phone} onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })} className="p-2 border rounded-md" />
                <input type="text" placeholder="Dirección" value={newClient.address} onChange={(e) => setNewClient({ ...newClient, address: e.target.value })} className="p-2 border rounded-md" />
              </div>
              <button onClick={handleAddClient} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors">
                Guardar Cliente
              </button>
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
                    <tr key={client.id} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50">
                      {editingId === client.id ? (
                        <>
                          <td className="py-3 px-4">{client.id}</td>
                          <td className="py-3 px-4"><input type="text" value={editedClient.name} onChange={(e) => setEditedClient({ ...editedClient, name: e.target.value })} className="p-1 border rounded-md w-full" /></td>
                          <td className="py-3 px-4"><input type="email" value={editedClient.email} onChange={(e) => setEditedClient({ ...editedClient, email: e.target.value })} className="p-1 border rounded-md w-full" /></td>
                          <td className="py-3 px-4"><input type="tel" value={editedClient.phone} onChange={(e) => setEditedClient({ ...editedClient, phone: e.target.value })} className="p-1 border rounded-md w-full" /></td>
                          <td className="py-3 px-4"><input type="text" value={editedClient.address} onChange={(e) => setEditedClient({ ...editedClient, address: e.target.value })} className="p-1 border rounded-md w-full" /></td>
                          <td className="py-3 px-4 flex space-x-2">
                            <button onClick={() => handleSaveEdit(client.id)} className="text-green-600 hover:text-green-800"><Save className="w-5 h-5" /></button>
                            <button onClick={handleCancelEdit} className="text-red-600 hover:text-red-800"><XCircle className="w-5 h-5" /></button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="py-3 px-4">{client.id}</td>
                          <td className="py-3 px-4 flex items-center space-x-2"><User className="w-4 h-4 text-gray-500" /><span>{client.name}</span></td>
                          <td className="py-3 px-4 flex items-center space-x-2"><Mail className="w-4 h-4 text-gray-500" /><span>{client.email}</span></td>
                          <td className="py-3 px-4 flex items-center space-x-2"><Phone className="w-4 h-4 text-gray-500" /><span>{client.phone}</span></td>
                          <td className="py-3 px-4 flex items-center space-x-2"><Home className="w-4 h-4 text-gray-500" /><span>{client.address}</span></td>
                          <td className="py-3 px-4 flex space-x-2">
                            <button onClick={() => handleEditClick(client)} className="text-red-600 hover:text-red-800"><Edit className="w-5 h-5" /></button>
                            <button onClick={() => handleDeleteClient(client.id)} className="text-red-600 hover:text-red-800"><Trash2 className="w-5 h-5" /></button>
                          </td>
                        </>
                      )}
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