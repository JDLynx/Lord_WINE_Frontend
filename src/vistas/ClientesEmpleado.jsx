import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from '../components/BarraProductos';
import { User, Mail, Phone, Home, PlusCircle, Edit, Trash2, XCircle, Save } from 'lucide-react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function ClientesEmpleado() {
    const [clients, setClients] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [newClient, setNewClient] = useState({
        clIdCliente: '',
        clNombre: '',
        clDireccion: '',
        clTelefono: '',
        clCorreoElectronico: '',
        clContrasena: '',
    });
    const [editedClient, setEditedClient] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const API_URL = 'http://localhost:3000/api/clientes';

    const fetchClients = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al obtener clientes');
            }
            const data = await response.json();
            const mappedClients = data.map(client => ({
                id: client.clCodCliente,
                idCliente: client.clIdCliente,
                name: client.clNombre,
                email: client.clCorreoElectronico,
                phone: client.clTelefono,
                address: client.clDireccion,
                originalData: client
            }));
            setClients(mappedClients);
        } catch (err) {
            console.error("Error al cargar clientes:", err);
            setError(`No se pudieron cargar los clientes: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    const handleOpenModal = () => {
        setIsModalOpen(true);
        setEditingId(null);
        setNewClient({
            clIdCliente: '',
            clNombre: '',
            clDireccion: '',
            clTelefono: '',
            clCorreoElectronico: '',
            clContrasena: '',
        });
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
        setEditedClient({});
    };

    const handleAddClient = async () => {
        try {
            const clientToSend = {
                clIdCliente: newClient.clIdCliente,
                clNombre: newClient.clNombre,
                clDireccion: newClient.clDireccion,
                clTelefono: newClient.clTelefono,
                clCorreoElectronico: newClient.clCorreoElectronico,
                clContrasena: newClient.clContrasena,
            };

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(clientToSend),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al añadir cliente');
            }

            await fetchClients();
            handleCloseModal();
            alert('Cliente añadido correctamente!');
        } catch (err) {
            console.error("Error al añadir cliente:", err);
            setError(`Error al añadir cliente: ${err.message}`);
        }
    };

    const handleEditClick = (client) => {
        setEditingId(client.id);
        setEditedClient({
            id: client.id,
            clIdCliente: client.idCliente,
            clNombre: client.name,
            clDireccion: client.address,
            clTelefono: client.phone,
            clCorreoElectronico: client.email,
            clContrasena: '',
        });
        setIsModalOpen(true);
    };

    const handleSaveEdit = async (id) => {
        try {
            const clientToSend = {
                clIdCliente: editedClient.clIdCliente,
                clNombre: editedClient.clNombre,
                clDireccion: editedClient.clDireccion,
                clTelefono: editedClient.clTelefono,
                clCorreoElectronico: editedClient.clCorreoElectronico,
            };

            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(clientToSend),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al actualizar cliente');
            }

            await fetchClients();
            handleCloseModal();
            alert('Cliente actualizado correctamente!');
        } catch (err) {
            console.error("Error al actualizar cliente:", err);
            setError(`Error al actualizar cliente: ${err.message}`);
        }
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditedClient({});
        handleCloseModal();
    };

    const handleDeleteClient = async (id) => {
        if (!window.confirm('¿Estás seguro de que quieres eliminar este cliente?')) {
            return;
        }

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al eliminar cliente');
            }

            await fetchClients();
            alert('Cliente eliminado correctamente!');
        } catch (err) {
            console.error("Error al eliminar cliente:", err);
            setError(`Error al eliminar cliente: ${err.message}`);
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

                    {error && <div className="text-center text-red-600 font-bold mb-4">{error}</div>}

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
                                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                                    {editingId ? 'Editar Cliente' : 'Añadir Nuevo Cliente'}
                                </h3>
                                <div className="grid grid-cols-1 gap-4 mb-6">
                                    <div className="flex flex-col">
                                        <label htmlFor="clIdCliente" className="text-sm font-medium text-gray-700 mb-1">Identificación</label>
                                        <input
                                            id="clIdCliente"
                                            type="text"
                                            placeholder="Identificación"
                                            value={editingId ? editedClient.clIdCliente : newClient.clIdCliente}
                                            onChange={(e) => editingId ? setEditedClient({ ...editedClient, clIdCliente: e.target.value }) : setNewClient({ ...newClient, clIdCliente: e.target.value })}
                                            className="p-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="clNombre" className="text-sm font-medium text-gray-700 mb-1">Nombre</label>
                                        <input
                                            id="clNombre"
                                            type="text"
                                            placeholder="Nombre"
                                            value={editingId ? editedClient.clNombre : newClient.clNombre}
                                            onChange={(e) => editingId ? setEditedClient({ ...editedClient, clNombre: e.target.value }) : setNewClient({ ...newClient, clNombre: e.target.value })}
                                            className="p-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="clCorreoElectronico" className="text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                                        <input
                                            id="clCorreoElectronico"
                                            type="email"
                                            placeholder="Correo Electrónico"
                                            value={editingId ? editedClient.clCorreoElectronico : newClient.clCorreoElectronico}
                                            onChange={(e) => editingId ? setEditedClient({ ...editedClient, clCorreoElectronico: e.target.value }) : setNewClient({ ...newClient, clCorreoElectronico: e.target.value })}
                                            className="p-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="clTelefono" className="text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                                        <input
                                            id="clTelefono"
                                            type="tel"
                                            placeholder="Teléfono"
                                            value={editingId ? editedClient.clTelefono : newClient.clTelefono}
                                            onChange={(e) => editingId ? setEditedClient({ ...editedClient, clTelefono: e.target.value }) : setNewClient({ ...newClient, clTelefono: e.target.value })}
                                            className="p-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="clDireccion" className="text-sm font-medium text-gray-700 mb-1">Dirección</label>
                                        <input
                                            id="clDireccion"
                                            type="text"
                                            placeholder="Dirección"
                                            value={editingId ? editedClient.clDireccion : newClient.clDireccion}
                                            onChange={(e) => editingId ? setEditedClient({ ...editedClient, clDireccion: e.target.value }) : setNewClient({ ...newClient, clDireccion: e.target.value })}
                                            className="p-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                                        />
                                    </div>
                                    {!editingId && ( // Solo muestra el campo de contraseña al CREAR un cliente
                                        <div className="flex flex-col">
                                            <label htmlFor="clContrasena" className="text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                                            <input
                                                id="clContrasena"
                                                type="password"
                                                placeholder="Contraseña"
                                                value={newClient.clContrasena}
                                                onChange={(e) => setNewClient({ ...newClient, clContrasena: e.target.value })}
                                                className="p-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                                            />
                                        </div>
                                    )}
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
                                        onClick={editingId ? () => handleSaveEdit(editingId) : handleAddClient}
                                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors flex items-center space-x-1"
                                    >
                                        <Save size={18} /> <span>{editingId ? 'Guardar Cambios' : 'Guardar Cliente'}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {loading ? (
                        <div className="flex flex-col items-center justify-center p-10">
                            <AiOutlineLoading3Quarters className="w-12 h-12 text-red-600 animate-spin" />
                            <p className="mt-4 text-gray-600 text-lg">Cargando clientes...</p>
                        </div>
                    ) : clients.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">ID Cliente</th>
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
                                            <td className="py-3 px-4">{client.idCliente}</td>
                                            <td className="py-3 px-4">
                                                {editingId === client.id ? (
                                                    <input type="text" value={editedClient.clNombre} onChange={(e) => setEditedClient({ ...editedClient, clNombre: e.target.value })} className="p-1 border rounded-md w-full" />
                                                ) : (
                                                    <span className="flex items-center space-x-2"><User className="w-4 h-4 text-gray-500" /><span>{client.name}</span></span>
                                                )}
                                            </td>
                                            <td className="py-3 px-4">
                                                {editingId === client.id ? (
                                                    <input type="email" value={editedClient.clCorreoElectronico} onChange={(e) => setEditedClient({ ...editedClient, clCorreoElectronico: e.target.value })} className="p-1 border rounded-md w-full" />
                                                ) : (
                                                    <span className="flex items-center space-x-2"><Mail className="w-4 h-4 text-gray-500" /><span>{client.email}</span></span>
                                                )}
                                            </td>
                                            <td className="py-3 px-4">
                                                {editingId === client.id ? (
                                                    <input type="tel" value={editedClient.clTelefono} onChange={(e) => setEditedClient({ ...editedClient, clTelefono: e.target.value })} className="p-1 border rounded-md w-full" />
                                                ) : (
                                                    <span className="flex items-center space-x-2"><Phone className="w-4 h-4 text-gray-500" /><span>{client.phone}</span></span>
                                                )}
                                            </td>
                                            <td className="py-3 px-4">
                                                {editingId === client.id ? (
                                                    <input type="text" value={editedClient.clDireccion} onChange={(e) => setEditedClient({ ...editedClient, clDireccion: e.target.value })} className="p-1 border rounded-md w-full" />
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
                        !error && <p className="text-center text-gray-500 mt-8">No hay clientes registrados.</p>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}