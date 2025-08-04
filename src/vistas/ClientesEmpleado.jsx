import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from '../components/BarraProductos';
import { PlusCircle, Edit, Trash2, XCircle, Save } from 'lucide-react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function ClientesEmpleado() {
    const [clients, setClients] = useState([]);
    const [filteredClients, setFilteredClients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
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

    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [clientIdToDelete, setClientIdToDelete] = useState(null);

    const API_URL = 'http://localhost:3000/api/clientes';

    const showNotification = (msg, type = 'success') => {
        setMessage(msg);
        setMessageType(type);
        setTimeout(() => {
            setMessage('');
            setMessageType('');
        }, 3000);
    };

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
            setFilteredClients(mappedClients);
        } catch (err) {
            setError('');
            showNotification(`No se pudieron cargar los clientes: ${err.message}`, 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    useEffect(() => {
        const lowerSearch = searchTerm.toLowerCase();
        const filtered = clients.filter(client =>
            Object.values(client).some(value =>
                typeof value === 'string' && value.toLowerCase().includes(lowerSearch)
            ) ||
            (typeof client.id === 'number' && client.id.toString().includes(lowerSearch))
        );
        setFilteredClients(filtered);
    }, [searchTerm, clients]);

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
            const clientToSend = { ...newClient };
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(clientToSend),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al añadir cliente');
            }
            await fetchClients();
            handleCloseModal();
        } catch (err) {
            showNotification(`Error al añadir cliente: ${err.message}`, 'error');
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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(clientToSend),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al actualizar cliente');
            }
            await fetchClients();
            handleCloseModal();
        } catch (err) {
            showNotification(`Error al actualizar cliente: ${err.message}`, 'error');
        }
    };

    const handleDeleteClient = (id) => {
        setClientIdToDelete(id);
        setShowConfirmModal(true);
    };

    const confirmDelete = async () => {
        try {
            const response = await fetch(`${API_URL}/${clientIdToDelete}`, { method: 'DELETE' });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al eliminar cliente');
            }
            await fetchClients();
        } catch (err) {
            showNotification(`Error al eliminar cliente: ${err.message}`, 'error');
        } finally {
            setShowConfirmModal(false);
            setClientIdToDelete(null);
        }
    };

    return (
        <div className="page-container min-h-screen flex flex-col">
            <Header />
            <BarraProductos />
            <main className="flex-grow flex flex-col items-center w-full py-8 px-4 sm:px-8 bg-vistas-home overflow-y-auto">
                <div className="w-full mx-auto bg-white p-8 rounded-2xl shadow-lg mt-8">
                    <h2 className="text-3xl font-semibold text-black mb-6 text-center">Gestión de Clientes</h2>

                    <p className="text-center text-black mb-8 text-xl">
                        Gestión de los clientes del sistema: crear nuevos, editar su información y eliminar registros existentes.
                    </p>

                    {message && messageType === 'error' && (
                        <div className={`fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 transition-opacity duration-300 ${
                            messageType === 'error' ? 'bg-red-500 text-white' : ''
                        }`}>
                            {message}
                        </div>
                    )}

                    <div className="flex justify-between items-center mb-6 gap-4">
                        <input
                            type="text"
                            placeholder="Buscar"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-black text-xl"
                        />
                        <button onClick={handleOpenModal} className="bg-[#921913] hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md flex items-center space-x-2 text-xl">
                            <PlusCircle className="w-5 h-5" />
                            <span>Añadir Nuevo Cliente</span>
                        </button>
                    </div>
                    {isModalOpen && (
                        <div className="fixed inset-0 flex justify-center items-center z-50">
                            <div className="absolute inset-0 bg-gray-500/20 backdrop-blur-sm"></div>
                            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md mx-4 relative z-10">
                                <h3 className="text-2xl font-semibold text-black mb-6 text-center">
                                    {editingId ? 'Editar Cliente' : 'Añadir Nuevo Cliente'}
                                </h3>
                                <div className="grid grid-cols-1 gap-4 mb-6 text-black">
                                    {['clIdCliente', 'clNombre', 'clCorreoElectronico', 'clTelefono', 'clDireccion'].map(field => (
                                        <div key={field} className="flex flex-col">
                                            <label htmlFor={field} className="text-xl font-medium text-black mb-1">
                                                {field === 'clIdCliente' ? 'Identificación' :
                                                    field === 'clNombre' ? 'Nombre' :
                                                        field === 'clCorreoElectronico' ? 'Correo Electrónico' :
                                                            field === 'clTelefono' ? 'Teléfono' :
                                                                'Dirección'}
                                            </label>
                                            <input
                                                id={field}
                                                type={field === 'clCorreoElectronico' ? 'email' : field === 'clTelefono' ? 'tel' : 'text'}
                                                value={editingId ? editedClient[field] || '' : newClient[field]}
                                                onChange={(e) =>
                                                    editingId
                                                        ? setEditedClient({ ...editedClient, [field]: e.target.value })
                                                        : setNewClient({ ...newClient, [field]: e.target.value })
                                                }
                                                className="p-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 text-black"
                                            />
                                        </div>
                                    ))}
                                    {!editingId && (
                                        <div className="flex flex-col">
                                            <label htmlFor="clContrasena" className="text-xl font-medium text-black mb-1">Contraseña</label>
                                            <input
                                                id="clContrasena"
                                                type="password"
                                                value={newClient.clContrasena}
                                                onChange={(e) => setNewClient({ ...newClient, clContrasena: e.target.value })}
                                                className="p-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 text-black"
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="flex justify-end gap-4 mt-4">
                                    <button onClick={handleCloseModal} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 text-black flex items-center space-x-1">
                                        <XCircle size={18} /> <span>Cancelar</span>
                                    </button>
                                    <button onClick={editingId ? () => handleSaveEdit(editingId) : handleAddClient} className="bg-[#921913] hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md flex items-center space-x-1">
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
                    ) : filteredClients.length > 0 ? (
                        <div className="overflow-x-auto rounded-lg shadow-md max-h-[60vh]">
                            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                                <thead className="bg-gray-50 sticky top-0">
                                    <tr>
                                        <th className="py-3 px-4 text-left text-xl font-semibold text-black">Identificación</th>
                                        <th className="py-3 px-4 text-left text-xl font-semibold text-black">Nombre</th>
                                        <th className="py-3 px-4 text-left text-xl font-semibold text-black">Email</th>
                                        <th className="py-3 px-4 text-left text-xl font-semibold text-black">Teléfono</th>
                                        <th className="py-3 px-4 text-left text-xl font-semibold text-black">Dirección</th>
                                        <th className="py-3 px-4 text-left text-xl font-semibold text-black">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredClients.map(client => (
                                        <tr key={client.id} className="border-b border-gray-200 hover:bg-gray-50 text-black text-lg">
                                            <td className="py-3 px-4 text-left">{client.idCliente}</td>
                                            <td className="py-3 px-4 text-left">{client.name}</td>
                                            <td className="py-3 px-4 text-left">{client.email}</td>
                                            <td className="py-3 px-4 text-left">{client.phone}</td>
                                            <td className="py-3 px-4 text-left">{client.address}</td>
                                            <td className="py-3 px-4 flex space-x-2 text-left">
                                                <button onClick={() => handleEditClick(client)} className="text-[#1D4ED8] hover:text-blue-700"><Edit className="w-5 h-5" /></button>
                                                <button onClick={() => handleDeleteClient(client.id)} className="text-[#921913] hover:text-red-800"><Trash2 className="w-5 h-5" /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        !error && <p className="text-center text-gray-500 mt-8">No hay clientes registrados.</p>
                    )}

                    {showConfirmModal && (
                        <div className="fixed inset-0 flex justify-center items-center z-50">
                            <div className="absolute inset-0 bg-gray-500/20 backdrop-blur-sm"></div>
                            <div className="relative p-8 bg-white w-full max-w-sm mx-auto rounded-lg shadow-xl z-10">
                                <h2 className="text-xl font-bold text-black mb-6 text-center">Confirmar Eliminación</h2>
                                <p className="text-black text-center mb-6">¿Estás seguro de que quieres eliminar este cliente?</p>
                                <div className="flex justify-center space-x-4">
                                    <button
                                        onClick={() => { setShowConfirmModal(false); setClientIdToDelete(null); }}
                                        className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-md flex items-center space-x-2"
                                    >
                                        <XCircle size={20} />
                                        <span>Cancelar</span>
                                    </button>
                                    <button
                                        onClick={confirmDelete}
                                        className="bg-[#921913] hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md flex items-center space-x-2"
                                    >
                                        <Trash2 size={20} />
                                        <span>Eliminar</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}