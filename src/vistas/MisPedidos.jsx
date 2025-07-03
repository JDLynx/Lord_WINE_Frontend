import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from '../components/BarraProductos';
import { ClipboardList, Calendar, DollarSign, Package, Truck, CheckCircle, XCircle } from 'lucide-react';

export default function MisPedidos() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // Para ver detalles en un modal

  useEffect(() => {
    // Simular carga de historial de pedidos del cliente
    const simulatedOrders = [
      {
        id: 1001,
        date: '2025-06-15',
        total: 85.50,
        status: 'Completado',
        items: [
          { name: 'Vino Tinto Reserva', quantity: 2, price: 30.00 },
          { name: 'Set de Copas', quantity: 1, price: 25.50 },
        ],
        deliveryAddress: 'Calle Falsa 123, Ciudad X',
      },
      {
        id: 1002,
        date: '2025-06-18',
        total: 45.00,
        status: 'En Proceso',
        items: [
          { name: 'Crema de Whisky', quantity: 1, price: 45.00 },
        ],
        deliveryAddress: 'Avenida Siempreviva 742, Ciudad Y',
      },
      {
        id: 1003,
        date: '2025-06-20',
        total: 15.00,
        status: 'Pendiente',
        items: [
          { name: 'Zumo de Uva', quantity: 1, price: 15.00 },
        ],
        deliveryAddress: 'Carrera 1 #2-3, Ciudad Z',
      },
    ];
    setTimeout(() => {
      setOrders(simulatedOrders);
    }, 500);
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pendiente': return 'bg-red-100 text-red-800'; // Changed from yellow to red
      case 'En Proceso': return 'bg-red-200 text-red-900'; // Changed from blue to a darker red shade
      case 'Completado': return 'bg-green-100 text-green-800'; // Kept green for completion
      case 'Cancelado': return 'bg-red-100 text-red-800'; // Already red, kept for consistency
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pendiente': return <ClipboardList className="inline mr-1" size={16} />;
      case 'En Proceso': return <Truck className="inline mr-1" size={16} />;
      case 'Completado': return <CheckCircle className="inline mr-1" size={16} />;
      case 'Cancelado': return <XCircle className="inline mr-1" size={16} />;
      default: return null;
    }
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
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
          <h2 className="text-3xl font-bold text-red-600 mb-6 text-center flex items-center justify-center space-x-2">
            <ClipboardList className="w-8 h-8 text-red-600" />
            <span>Mi Historial de Pedidos</span>
          </h2>
          
          {orders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">ID Pedido</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Fecha</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Total</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Estado</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50 text-gray-600">
                      <td className="py-3 px-4">{order.id}</td>
                      <td className="py-3 px-4 flex items-center space-x-2"><Calendar className="w-4 h-4 text-gray-500" /><span>{order.date}</span></td>
                      <td className="py-3 px-4 flex items-center space-x-2"><DollarSign className="w-4 h-4 text-gray-500" /><span>${order.total.toFixed(2)}</span></td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(order.status)}`}>
                          {getStatusIcon(order.status)} {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleViewDetails(order)}
                          className="text-red-600 hover:text-red-800 font-medium"
                        >
                          Ver Detalles
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-500 text-xl mt-12">
              <ClipboardList className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              Aún no has realizado ningún pedido.
              <button
                onClick={() => alert('Navegar a la página de productos (simulado)')}
                className="mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-5 rounded-full shadow-md transition-colors"
              >
                Explorar Productos
              </button>
            </p>
          )}

          {/* Modal de Detalles del Pedido */}
          {selectedOrder && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
              <div className="relative p-8 bg-white w-full max-w-lg mx-auto rounded-lg shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Detalles del Pedido #{selectedOrder.id}</h3>
                <div className="mb-4">
                  <p className="text-gray-700"><strong>Fecha:</strong> {selectedOrder.date}</p>
                  <p className="text-gray-700"><strong>Total:</strong> ${selectedOrder.total.toFixed(2)}</p>
                  <p className="text-gray-700"><strong>Estado:</strong> 
                    <span className={`ml-2 px-2 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusClass(selectedOrder.status)}`}>
                      {getStatusIcon(selectedOrder.status)} {selectedOrder.status}
                    </span>
                  </p>
                  <p className="text-gray-700"><strong>Dirección de entrega:</strong> {selectedOrder.deliveryAddress}</p>
                </div>
                <h4 className="text-xl font-semibold text-gray-700 mb-3 border-b pb-2">Productos:</h4>
                <ul className="list-disc list-inside mb-6 space-y-1 text-gray-700">
                  {selectedOrder.items.map((item, index) => (
                    <li key={index}>{item.name} (x{item.quantity}) - ${item.price.toFixed(2)} c/u</li>
                  ))}
                </ul>
                <div className="flex justify-end">
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md flex items-center space-x-2 transition-colors"
                  >
                    <XCircle size={20} />
                    <span>Cerrar</span>
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