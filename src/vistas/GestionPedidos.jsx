import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";
import { ListChecks, Clock, Package, CheckCircle, XCircle, UserPlus, FileText } from 'lucide-react'; // Added XCircle, UserPlus, FileText

export default function GestionPedidos() {
  const [orders, setOrders] = useState([]);
  const [employees, setEmployees] = useState([]); // For assigning employees
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [assignedEmployee, setAssignedEmployee] = useState('');

  useEffect(() => {
    // Simulate fetching orders and employees
    const simulatedOrders = [
      {
        id: 'ORD001',
        customerName: 'Ana López',
        date: '2025-06-20',
        total: 55.75,
        status: 'Pendiente',
        items: [
          { productId: 'PROD001', name: 'Vino Tinto Reserva', quantity: 2, price: 15.99 },
          { productId: 'PROD005', name: 'Sacacorchos Premium', quantity: 1, price: 7.25 },
        ],
        assignedEmployee: null,
      },
      {
        id: 'ORD002',
        customerName: 'Pedro Martínez',
        date: '2025-06-19',
        total: 22.50,
        status: 'Procesando',
        items: [
          { productId: 'PROD002', name: 'Crema de Whisky Clásica', quantity: 1, price: 22.50 },
        ],
        assignedEmployee: 'María García',
      },
      {
        id: 'ORD003',
        customerName: 'Laura Fernández',
        date: '2025-06-18',
        total: 19.80,
        status: 'Completado',
        items: [
          { productId: 'PROD003', name: 'Mistela Artesanal Dulce', quantity: 2, price: 9.90 },
        ],
        assignedEmployee: 'Carlos Ruiz',
      },
      {
        id: 'ORD004',
        customerName: 'David Gómez',
        date: '2025-06-21',
        total: 10.00,
        status: 'Pendiente',
        items: [
          { productId: 'PROD004', name: 'Zumo de Uva Natural', quantity: 2, price: 5.00 },
        ],
        assignedEmployee: null,
      },
    ];
    const simulatedEmployees = ['Juan Perez', 'María García', 'Carlos Ruiz', 'Laura Fuentes', 'Roberto Soto', 'Sofía Díaz'];

    setOrders(simulatedOrders);
    setEmployees(simulatedEmployees);
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pendiente': return 'bg-yellow-100 text-yellow-800';
      case 'Procesando': return 'bg-blue-100 text-blue-800';
      case 'Completado': return 'bg-green-100 text-green-800';
      case 'Cancelado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pendiente': return <Clock size={16} className="inline mr-1" />;
      case 'Procesando': return <Package size={16} className="inline mr-1" />;
      case 'Completado': return <CheckCircle size={16} className="inline mr-1" />;
      case 'Cancelado': return <XCircle size={16} className="inline mr-1" />;
      default: return <ListChecks size={16} className="inline mr-1" />;
    }
  };

  const handleUpdateOrder = () => {
    if (selectedOrder) {
      setOrders(orders.map(order =>
        order.id === selectedOrder.id ? { ...order, status: newStatus, assignedEmployee: assignedEmployee || null } : order
      ));
      alert(`Pedido ${selectedOrder.id} actualizado (simulado).`);
      setSelectedOrder(null);
      setNewStatus('');
      setAssignedEmployee('');
    }
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setAssignedEmployee(order.assignedEmployee || '');
  };

  return (
    <>
      <div className="page-container">
        <Header />
        <BarraProductos />
        <main className="bg-vistas-home min-h-screen py-8 px-4 sm:px-8">
          <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-10">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">Gestión de Pedidos</h1>
            <p className="text-center text-gray-600 text-lg mb-8">
              Revisa todos los pedidos, cambia sus estados y asigna empleados para su gestión.
            </p>

            {orders.length > 0 ? (
              <div className="overflow-x-auto rounded-lg shadow-md">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-100 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">ID Pedido</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Cliente</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Fecha</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Estado</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Empleado Asignado</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.customerName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${order.total.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(order.status)}`}>
                            {getStatusIcon(order.status)}
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {order.assignedEmployee || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-center space-x-3">
                            <button
                              onClick={() => handleViewDetails(order)}
                              className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                              title="Ver Detalles / Gestionar"
                            >
                              <FileText size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-gray-500 mt-8">No hay pedidos registrados.</p>
            )}

            {/* Modal para Detalles del Pedido y Cambio de Estado/Asignación */}
            {selectedOrder && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
                <div className="relative p-8 bg-white w-full max-w-lg mx-auto rounded-lg shadow-xl">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Detalles del Pedido: {selectedOrder.id}</h2>

                  <div className="mb-4">
                    <p className="text-gray-700"><strong>Cliente:</strong> {selectedOrder.customerName}</p>
                    <p className="text-gray-700"><strong>Fecha:</strong> {selectedOrder.date}</p>
                    <p className="text-gray-700"><strong>Total:</strong> ${selectedOrder.total.toFixed(2)}</p>
                    <p className="text-gray-700"><strong>Estado Actual:</strong>
                      <span className={`ml-2 px-2 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusClass(selectedOrder.status)}`}>
                        {getStatusIcon(selectedOrder.status)}{selectedOrder.status}
                      </span>
                    </p>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Items del Pedido</h3>
                  {selectedOrder.items.length > 0 ? (
                    <ul className="list-disc list-inside mb-6 space-y-1 text-gray-700">
                      {selectedOrder.items.map((item, index) => (
                        <li key={index}>{item.name} (x{item.quantity}) - ${item.price.toFixed(2)} c/u</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600 mb-6">No hay items en este pedido.</p>
                  )}

                  <div className="mb-4">
                    <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">Cambiar Estado:</label>
                    <select
                      id="status"
                      name="status"
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="Pendiente">Pendiente</option>
                      <option value="Procesando">Procesando</option>
                      <option value="Completado">Completado</option>
                      <option value="Cancelado">Cancelado</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="assignedEmployee" className="block text-gray-700 text-sm font-bold mb-2">Asignar Empleado:</label>
                    <select
                      id="assignedEmployee"
                      name="assignedEmployee"
                      value={assignedEmployee}
                      onChange={(e) => setAssignedEmployee(e.target.value)}
                      className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="">Sin Asignar</option>
                      {employees.map(emp => (
                        <option key={emp} value={emp}>{emp}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setSelectedOrder(null)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md flex items-center space-x-2 transition-colors duration-200"
                    >
                      <XCircle size={20} />
                      <span>Cerrar</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleUpdateOrder}
                      className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-md flex items-center space-x-2 transition-colors duration-200"
                    >
                      <Save size={20} />
                      <span>Guardar Cambios</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}