import React, { useState, useEffect, useCallback } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from '../components/BarraProductos';
import { ShoppingBag, Calendar, User, Truck, CheckCircle, XCircle, Clock, Edit, Save, DollarSign } from 'lucide-react';

export default function PedidosEmpleado() {
    const [orders, setOrders] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [editingOrderId, setEditingOrderId] = useState(null);
    const [editedStatus, setEditedStatus] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const [empleadoLogeadoId, setEmpleadoLogeadoId] = useState(
        parseInt(localStorage.getItem("employeeCod"), 10) || null
    );

    const API_URL_PEDIDOS = 'https://lord-wine-backend.onrender.com/api/pedidos';
    const API_URL_EMPLEADOS = 'https://lord-wine-backend.onrender.com/api/empleados';

    const statuses = ['Pendiente', 'En Proceso', 'Completado', 'Cancelado'];

    const showNotification = (msg, type) => {
        setMessage(msg);
        setMessageType(type);
        setTimeout(() => {
            setMessage('');
            setMessageType('');
        }, 3000);
    };

    const fetchOrders = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await fetch(API_URL_PEDIDOS);
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }
            let data = await response.json();

            const filteredData = data.filter(order => order.emplCodEmpleado === empleadoLogeadoId);

            const mappedOrders = filteredData.map(order => {
                const details = order.detallesPedido ? order.detallesPedido.map(detail =>
                    `${detail.producto.prodNombre} x${detail.detaCantidad}`
                ).join(', ') : '';

                const subtotal = order.detallesPedido ? order.detallesPedido.reduce((sum, detail) =>
                    sum + (parseFloat(detail.detaPrecioUnitario) * detail.detaCantidad)
                , 0) : 0;

                return {
                    id: order.pedIdPedido,
                    customer: order.cliente ? order.cliente.clNombre : 'N/A',
                    date: new Date(order.pedFecha).toISOString().slice(0, 10),
                    status: order.pedEstado,
                    assignedTo: order.empleado ? order.empleado.emplNombre : 'Sin Asignar',
                    assignedToId: order.emplCodEmpleado || '',
                    details: details,
                    subtotal: subtotal,
                    detallesPedido: order.detallesPedido || [],
                };
            });
            setOrders(mappedOrders);
        } catch (error) {
            console.error('Error al obtener los pedidos:', error);
            showNotification(`Error al cargar los pedidos: ${error.message}`, 'error');
        } finally {
            setIsLoading(false);
        }
    }, [API_URL_PEDIDOS, empleadoLogeadoId]);

    const fetchEmployees = useCallback(async () => {
        try {
            const response = await fetch(API_URL_EMPLEADOS);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setEmployees([{ emplCodEmpleado: '', emplNombre: 'Sin Asignar' }, ...data]);
        } catch (error) {
            console.error('Error al obtener los empleados:', error);
            showNotification(`Error al cargar los empleados: ${error.message}`, 'error');
        }
    }, [API_URL_EMPLEADOS]);

    useEffect(() => {
        if (empleadoLogeadoId !== null) {
            fetchOrders();
        }
        fetchEmployees();
    }, [fetchOrders, fetchEmployees, empleadoLogeadoId]);

    const handleEditClick = (order) => {
        setEditingOrderId(order.id);
        setEditedStatus(order.status);
    };

    const handleSaveEdit = async (id) => {
        try {
            const response = await fetch(`${API_URL_PEDIDOS}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    pedEstado: editedStatus,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            await fetchOrders();
            setEditingOrderId(null);
        } catch (error) {
            console.error('Error al actualizar pedido:', error);
            showNotification(`Error al actualizar el estado del pedido ${id}: ${error.message}`, 'error');
        }
    };

    const handleCancelEdit = () => {
        setEditingOrderId(null);
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Pendiente': return <Clock className="w-4 h-4 text-red-500" />;
            case 'En Proceso': return <Truck className="w-4 h-4 text-orange-500" />;
            case 'Completado': return <CheckCircle className="w-4 h-4 text-green-500" />;
            case 'Cancelado': return <XCircle className="w-4 h-4 text-red-500" />;
            default: return null;
        }
    };

    return (
        <div className="page-container min-h-screen flex flex-col">
            <Header />
            <BarraProductos />
            <main
                className="flex-grow flex flex-col items-center w-full py-8 px-4 sm:px-8 bg-vistas-home overflow-y-auto"
            >
                <div className="w-full mx-auto bg-white p-8 rounded-2xl shadow-lg mt-8">
                    <h2 className="text-3xl font-semibold text-black mb-6 text-center">Gestión de Pedidos</h2>

                    <p className="text-center text-black text-lg mb-8">
                        Visualización y gestión de todos los pedididos asignados. Detalles de cada pedido y actualización de estado.
                    </p>

                    {message && messageType === 'error' && (
                        <div className={`fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 transition-opacity duration-300 ${
                            messageType === 'error' ? 'bg-red-500 text-white' : ''
                        }`}>
                            {message}
                        </div>
                    )}

                    {isLoading ? (
                        <div className="text-center text-gray-500 mt-8">Cargando pedidos...</div>
                    ) : orders.length > 0 ? (
                        <div className="overflow-x-auto rounded-lg shadow-md max-h-[60vh]">
                            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                                <thead className="bg-gray-50 sticky top-0">
                                    <tr>
                                        <th className="py-3 px-4 text-left text-lg font-semibold text-black">ID Pedido</th>
                                        <th className="py-3 px-4 text-left text-lg font-semibold text-black">Cliente</th>
                                        <th className="py-3 px-4 text-left text-lg font-semibold text-black">Fecha</th>
                                        <th className="py-3 px-4 text-left text-lg font-semibold text-black">Estado</th>
                                        <th className="py-3 px-4 text-left text-lg font-semibold text-black">Asignado a</th>
                                        <th className="py-3 px-4 text-left text-lg font-semibold text-black">Detalles</th>
                                        <th className="py-3 px-4 text-left text-lg font-semibold text-black">Subtotal</th>
                                        <th className="py-3 px-4 text-left text-lg font-semibold text-black">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order.id} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50 text-black text-base text-left">
                                            <td className="py-3 px-4">
                                                <div className="flex items-center space-x-2">
                                                    <ShoppingBag className="w-4 h-4 text-gray-500" />
                                                    <span>{order.id}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center space-x-2">
                                                    <User className="w-4 h-4 text-gray-500" />
                                                    <span>{order.customer}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center space-x-2">
                                                    <Calendar className="w-4 h-4 text-gray-500" />
                                                    <span>{order.date}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                {editingOrderId === order.id ? (
                                                    <select value={editedStatus} onChange={(e) => setEditedStatus(e.target.value)} className="p-1 border rounded-md w-full">
                                                        {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                                                    </select>
                                                ) : (
                                                    <span className="flex items-center space-x-2">{getStatusIcon(order.status)}<span>{order.status}</span></span>
                                                )}
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className="flex items-center space-x-2"><User className="w-4 h-4 text-gray-500" /><span>{order.assignedTo}</span></span>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center space-x-2">
                                                    <ShoppingBag className="w-4 h-4 text-gray-500" />
                                                    <span>{order.details}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center space-x-2">
                                                    <DollarSign className="w-4 h-4 text-gray-500" />
                                                    <span>${order.subtotal.toFixed(2)}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 flex space-x-2">
                                                {editingOrderId === order.id ? (
                                                    <>
                                                        <button onClick={() => handleSaveEdit(order.id)} className="text-green-800 hover:text-green-700" title="Guardar Cambios"><Save className="w-5 h-5" /></button>
                                                        <button onClick={handleCancelEdit} className="text-red-600 hover:text-red-800" title="Cancelar Edición"><XCircle className="w-5 h-5" /></button>
                                                    </>
                                                ) : (
                                                    <button onClick={() => handleEditClick(order)} className="text-[#1D4ED8] hover:text-blue-700" title="Editar Pedido"><Edit className="w-5 h-5" /></button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 mt-8">No hay pedidos asignados a este empleado.</p>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}