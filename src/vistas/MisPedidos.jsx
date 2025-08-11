import React, { useState, useEffect, useCallback } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from '../components/BarraProductos';
import { ShoppingBag, Calendar, User, Truck, CheckCircle, XCircle, Clock, DollarSign } from 'lucide-react';

export default function PedidosCliente() {
    const [orders, setOrders] = useState([]);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const clienteLogeadoId = parseInt(localStorage.getItem("clienteCodCliente"), 10) || null;
    const API_URL_PEDIDOS = 'https://lord-wine-backend.onrender.com/api/pedidos';

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

            const filteredData = data.filter(order => order.clCodCliente === clienteLogeadoId);

            const mappedOrders = filteredData.map(order => {
                const details = order.detallesPedido
                    ? order.detallesPedido.map(detail =>
                        `${detail.producto.prodNombre} x${detail.detaCantidad}`
                    ).join(', ')
                    : '';

                const subtotal = order.detallesPedido
                    ? order.detallesPedido.reduce((sum, detail) =>
                        sum + (parseFloat(detail.detaPrecioUnitario) * detail.detaCantidad), 0)
                    : 0;

                return {
                    id: order.pedIdPedido,
                    date: new Date(order.pedFecha).toISOString().slice(0, 10),
                    status: order.pedEstado,
                    assignedTo: order.empleado ? order.empleado.emplNombre : 'Sin Asignar',
                    details: details,
                    subtotal: subtotal
                };
            });

            setOrders(mappedOrders);
        } catch (error) {
            console.error('Error al obtener los pedidos:', error);
            showNotification(`Error al cargar los pedidos: ${error.message}`, 'error');
        } finally {
            setIsLoading(false);
        }
    }, [API_URL_PEDIDOS, clienteLogeadoId]);

    useEffect(() => {
        if (clienteLogeadoId !== null) {
            fetchOrders();
        }
    }, [fetchOrders, clienteLogeadoId]);

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
            <main className="flex-grow flex flex-col items-center w-full py-8 px-4 sm:px-8 bg-vistas-home overflow-y-auto">
                <div className="w-full mx-auto bg-white p-8 rounded-2xl shadow-lg mt-8">
                    <h2 className="text-3xl font-semibold text-black mb-6 text-center">Mis Pedidos</h2>

                    {message && (
                        <div className={`fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 transition-opacity duration-300 ${
                            messageType === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
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
                                        <th className="py-3 px-4 text-left text-lg font-semibold text-black">Fecha</th>
                                        <th className="py-3 px-4 text-left text-lg font-semibold text-black">Estado</th>
                                        <th className="py-3 px-4 text-left text-lg font-semibold text-black">Empleado Asignado</th>
                                        <th className="py-3 px-4 text-left text-lg font-semibold text-black">Detalles</th>
                                        <th className="py-3 px-4 text-left text-lg font-semibold text-black">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50 text-black text-base text-left">
                                            <td className="py-3 px-4">
                                                <div className="flex items-center space-x-2">
                                                    <ShoppingBag className="w-4 h-4 text-gray-500" />
                                                    <span>{order.id}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center space-x-2">
                                                    <Calendar className="w-4 h-4 text-gray-500" />
                                                    <span>{order.date}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className="flex items-center space-x-2">
                                                    {getStatusIcon(order.status)}
                                                    <span>{order.status}</span>
                                                </span>
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className="flex items-center space-x-2">
                                                    <User className="w-4 h-4 text-gray-500" />
                                                    <span>{order.assignedTo}</span>
                                                </span>
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
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 mt-8">No tienes pedidos registrados.</p>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}