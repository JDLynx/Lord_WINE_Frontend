import React, { useState, useEffect, useCallback } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";
import { ListChecks, Clock, Package, CheckCircle, XCircle, FileText, Save } from 'lucide-react';

export default function GestionPedidos() {
  const [orders, setOrders] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [assignedEmployeeId, setAssignedEmployeeId] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const API_URL_PEDIDOS = 'https://lord-wine-backend.onrender.com/api/pedidos';
  const API_URL_EMPLEADOS = 'https://lord-wine-backend.onrender.com/api/empleados';

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
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      const mappedOrders = data.map(order => ({
        id: order.pedIdPedido,
        customerName: order.cliente ? order.cliente.clNombre : 'N/A',
        date: new Date(order.pedFecha).toISOString().slice(0, 10),
        total: parseFloat(order.pedTotal),
        status: order.pedEstado,
        items: order.detallesPedido ? order.detallesPedido.map(detail => ({
          productId: detail.producto.prodIdProducto,
          name: detail.producto.prodNombre,
          quantity: detail.detaCantidad,
          price: parseFloat(detail.detaPrecioUnitario),
        })) : [],
        assignedEmployee: order.empleado ? order.empleado.emplNombre : 'N/A',
        emplCodEmpleado: order.emplCodEmpleado
      }));
      setOrders(mappedOrders);
    } catch (error) {
      console.error('Error al cargar pedidos:', error);
      showNotification('Error al cargar los pedidos.', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [API_URL_PEDIDOS]);

  const fetchEmployees = useCallback(async () => {
    try {
      const response = await fetch(API_URL_EMPLEADOS);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error al cargar empleados:', error);
      showNotification('Error al cargar los empleados.', 'error');
    }
  }, [API_URL_EMPLEADOS]);

  useEffect(() => {
    fetchOrders();
    fetchEmployees();
  }, [fetchOrders, fetchEmployees]);

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

  const handleUpdateOrder = async () => {
    if (selectedOrder) {
      try {
        const response = await fetch(`${API_URL_PEDIDOS}/${selectedOrder.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            pedEstado: newStatus,
            emplCodEmpleado: parseInt(assignedEmployeeId)
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        setSelectedOrder(null);
        setNewStatus('');
        setAssignedEmployeeId('');
        await fetchOrders();
      } catch (error) {
        console.error('Error al actualizar pedido:', error);
        showNotification(`Error al actualizar el pedido: ${error.message}`, 'error');
      }
    }
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setAssignedEmployeeId(order.emplCodEmpleado || (employees.length > 0 ? employees[0].emplCodEmpleado : ''));
  };

  const filteredOrders = orders.filter(order => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    
    if (order.id && order.id.toString().includes(lowerCaseQuery)) return true;
    
    if (order.customerName && order.customerName.toLowerCase().includes(lowerCaseQuery)) return true;
    
    if (order.date && order.date.toLowerCase().includes(lowerCaseQuery)) return true;
    
    if (order.total && order.total.toString().includes(lowerCaseQuery)) return true;
    
    if (order.status && order.status.toLowerCase().includes(lowerCaseQuery)) return true;

    if (order.assignedEmployee && order.assignedEmployee.toLowerCase().includes(lowerCaseQuery)) return true;

    if (order.items && order.items.some(item => item.name.toLowerCase().includes(lowerCaseQuery))) return true;

    return false;
  });

  return (
    <>
      <div className="page-container min-h-screen flex flex-col">
        <Header />
        <BarraProductos />
        <main className="bg-vistas-home py-8 px-4 sm:px-8 flex-grow overflow-y-auto">
          <div className="w-full mx-auto bg-white rounded-2xl shadow-lg p-10 mt-8">
            <h1 className="text-2xl font-semibold text-black mb-2 text-center">Gestión de Pedidos</h1>
            <p className="text-center text-black text-lg mb-8">
              Visualización y gestión de todos los pedidos de los clientes. Detalles de cada pedido, actualización de estado y asignación de un empleado para su procesamiento.
            </p>

            {message && messageType === 'error' && (
              <div className={`fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 transition-opacity duration-300 ${
                messageType === 'error' ? 'bg-red-500 text-white' : ''
              }`}>
                {message}
              </div>
            )}

            <div className="mb-6">
              <input
                type="text"
                placeholder="Buscar"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded text-black text-lg focus:border-black focus:outline-none"
              />
            </div>

            {isLoading ? (
              <div className="overflow-x-auto rounded-lg shadow-md max-h-[60vh]">
                <table className="min-w-full bg-white animate-pulse">
                  <thead className="bg-gray-100 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-lg font-medium text-black tracking-wider">ID Pedido</th>
                      <th className="px-6 py-3 text-left text-lg font-medium text-black tracking-wider">Cliente</th>
                      <th className="px-6 py-3 text-left text-lg font-medium text-black tracking-wider">Fecha</th>
                      <th className="px-6 py-3 text-left text-lg font-medium text-black tracking-wider">Total</th>
                      <th className="px-6 py-3 text-left text-lg font-medium text-black tracking-wider">Estado</th>
                      <th className="px-6 py-3 text-left text-lg font-medium text-black tracking-wider">Empleado Asignado</th>
                      <th className="px-6 py-3 text-left text-lg font-medium text-black tracking-wider">Items del Pedido</th>
                      <th className="px-6 py-3 text-center text-lg font-medium text-black tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-base text-black">
                          <div className="h-4 bg-gray-200 rounded w-16"></div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-base text-black">
                          <div className="h-4 bg-gray-200 rounded w-32"></div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-base text-black">
                          <div className="h-4 bg-gray-200 rounded w-24"></div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-base text-black">
                          <div className="h-4 bg-gray-200 rounded w-20"></div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="h-4 bg-gray-200 rounded w-24"></div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-base text-black">
                          <div className="h-4 bg-gray-200 rounded w-32"></div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-base text-black">
                          <div className="h-4 bg-gray-200 rounded w-40"></div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-base font-medium">
                          <div className="flex justify-center space-x-3">
                            <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : filteredOrders.length > 0 ? (
              <div className="overflow-x-auto rounded-lg shadow-md max-h-[60vh]">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-100 border-b border-gray-200 sticky top-0">
                    <tr>
                      <th className="px-6 py-3 text-left text-lg font-medium text-black tracking-wider">ID Pedido</th>
                      <th className="px-6 py-3 text-left text-lg font-medium text-black tracking-wider">Cliente</th>
                      <th className="px-6 py-3 text-left text-lg font-medium text-black tracking-wider">Fecha</th>
                      <th className="px-6 py-3 text-left text-lg font-medium text-black tracking-wider">Total</th>
                      <th className="px-6 py-3 text-left text-lg font-medium text-black tracking-wider">Estado</th>
                      <th className="px-6 py-3 text-left text-lg font-medium text-black tracking-wider">Empleado Asignado</th>
                      <th className="px-6 py-3 text-left text-lg font-medium text-black tracking-wider">Items del Pedido</th>
                      <th className="px-6 py-3 text-center text-lg font-medium text-black tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-base text-black">{order.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-base text-black text-left">{order.customerName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-base text-black text-left">{order.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-base text-black text-left">${order.total.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-left">
                          <span className={`px-2 inline-flex text-black leading-5 font-semibold text-base rounded-full text-left ${getStatusClass(order.status)}`}>
                            {getStatusIcon(order.status)}
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-base text-black text-left">
                          {order.assignedEmployee || 'N/A'}
                        </td>
                        <td className="px-6 py-4 text-base text-black text-left">
                          {order.items && order.items.length > 0 ? (
                            <>
                              {order.items.slice(0, 2).map((item, idx) => (
                                <span key={item.productId || idx} className="block">
                                  {item.name} (x{item.quantity})
                                </span>
                              ))}
                              {order.items.length > 2 && (
                                <span className="text-gray-500 text-sm">...(más {order.items.length - 2})</span>
                              )}
                            </>
                          ) : (
                            'N/A'
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-base font-medium">
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

            {selectedOrder && (
              <div className="fixed inset-0 flex justify-center items-center z-50">
                <div className="absolute inset-0 bg-gray-500/20 backdrop-blur-sm"></div>
                <div className="bg-white p-8 rounded-lg w-full max-w-lg mx-auto shadow-xl relative z-10">
                  <h2 className="text-2xl font-semibold text-black mb-6 text-center">Detalles del Pedido: {selectedOrder.id}</h2>

                  <div className="mb-4">
                    <p className="text-black text-left"><strong>Cliente:</strong> {selectedOrder.customerName}</p>
                    <p className="text-black text-left"><strong>Fecha:</strong> {selectedOrder.date}</p>
                    <p className="text-black text-left"><strong>Total:</strong> ${selectedOrder.total.toFixed(2)}</p>
                    <p className="text-black text-left"><strong>Estado Actual:</strong>
                      <span className={`ml-2 px-2 inline-flex text-xl leading-5 font-semibold rounded-full ${getStatusClass(selectedOrder.status)}`}>
                        {getStatusIcon(selectedOrder.status)}{selectedOrder.status}
                      </span>
                    </p>
                  </div>

                  <h3 className="text-2xl font-semibold text-black mb-4 border-b pb-2">Items del Pedido</h3>
                  {selectedOrder.items.length > 0 ? (
                    <ul className="list-disc list-inside mb-6 space-y-1 text-black">
                      {selectedOrder.items.map((item, index) => (
                        <li key={item.productId || index}>{item.name} (x{item.quantity}) - ${item.price.toFixed(2)} c/u</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600 mb-6">No hay items en este pedido.</p>
                  )}

                  <div className="mb-4">
                    <label htmlFor="status" className="block text-black text-lg font-bold mb-2">Cambiar Estado:</label>
                    <select
                      id="status"
                      name="status"
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="Pendiente">Pendiente</option>
                      <option value="Procesando">Procesando</option>
                      <option value="Completado">Completado</option>
                      <option value="Cancelado">Cancelado</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="assignedEmployee" className="block text-black text-lg font-bold mb-2">Asignar Empleado:</label>
                    <select
                      id="assignedEmployee"
                      name="assignedEmployee"
                      value={assignedEmployeeId}
                      onChange={(e) => setAssignedEmployeeId(e.target.value)}
                      className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >

                      <option value="">{employees.length > 0 ? 'Seleccionar empleado' : 'No hay empleados disponibles'}</option>
                      {employees.map(emp => (
                        <option key={emp.emplCodEmpleado} value={emp.emplCodEmpleado}>{emp.emplNombre}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setSelectedOrder(null)}
                      className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded-md flex items-center space-x-2 transition-colors duration-200"
                    >
                      <XCircle size={20} />
                      <span>Cerrar</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleUpdateOrder}
                      className="bg-[#801010] hover:bg-[#921913] text-white font-semibold py-2 px-4 rounded-md flex items-center space-x-2 transition-colors duration-200"
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