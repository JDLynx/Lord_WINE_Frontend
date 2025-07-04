import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from '../components/BarraProductos';
import { ShoppingBag, Calendar, User, Truck, CheckCircle, XCircle, Clock, Edit, Save } from 'lucide-react';

export default function PedidosEmpleado() {
  const [orders, setOrders] = useState([
    { id: 101, customer: 'Juan Pérez', date: '2025-06-20', status: 'Pendiente', assignedTo: 'Sin Asignar', details: 'Vino Tinto x2, Queso x1' },
    { id: 102, customer: 'Ana López', date: '2025-06-20', status: 'En Proceso', assignedTo: 'María F. Restrepo', details: 'Vino Blanco x1, Aceitunas x1' },
    { id: 103, customer: 'Carlos Ruiz', date: '2025-06-21', status: 'Completado', assignedTo: 'María F. Restrepo', details: 'Ron Añejo x1' },
    { id: 104, customer: 'Sofía Martínez', date: '2025-06-21', status: 'Pendiente', assignedTo: 'Sin Asignar', details: 'Zumo Uva x3' },
  ]);
  const [editingId, setEditingId] = useState(null);
  const [editedStatus, setEditedStatus] = useState('');
  const [editedAssignedTo, setEditedAssignedTo] = useState('');

  const statuses = ['Pendiente', 'En Proceso', 'Completado', 'Cancelado'];
  const employees = ['Sin Asignar', 'María F. Restrepo', 'Pedro Gómez', 'Laura Fernández'];

  const handleEditClick = (order) => {
    setEditingId(order.id);
    setEditedStatus(order.status);
    setEditedAssignedTo(order.assignedTo);
  };

  const handleSaveEdit = (id) => {
    setOrders(orders.map(order =>
      order.id === id ? { ...order, status: editedStatus, assignedTo: editedAssignedTo } : order
    ));
    setEditingId(null);
    alert(`Pedido ${id} actualizado (simulado).`);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
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
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      <BarraProductos />
      <main
        className="flex-grow flex flex-col items-center w-full py-8 px-4 sm:px-8 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/img/Viñedo.jpg')" }}
      >
        <div className="max-w-6xl mx-auto w-full bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">Gestión de Pedidos</h2>

          {orders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">ID Pedido</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Cliente</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Fecha</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Estado</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Asignado a</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Detalles</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50 text-gray-600">

                      <td className="py-3 px-4">{order.id}</td>

                      <td className="py-3 px-4 flex items-center space-x-2"><User className="w-4 h-4 text-gray-500" /><span>{order.customer}</span></td>

                      <td className="py-3 px-4 flex items-center space-x-2"><Calendar className="w-4 h-4 text-gray-500" /><span>{order.date}</span></td>

                      <td className="py-3 px-4">
                        {editingId === order.id ? (
                          <select value={editedStatus} onChange={(e) => setEditedStatus(e.target.value)} className="p-1 border rounded-md w-full">
                            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        ) : (
                          <span className="flex items-center space-x-2">{getStatusIcon(order.status)}<span>{order.status}</span></span>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        {editingId === order.id ? (
                          <select value={editedAssignedTo} onChange={(e) => setEditedAssignedTo(e.target.value)} className="p-1 border rounded-md w-full">
                            {employees.map(emp => <option key={emp} value={emp}>{emp}</option>)}
                          </select>
                        ) : (
                          <span className="flex items-center space-x-2"><User className="w-4 h-4 text-gray-500" /><span>{order.assignedTo}</span></span>
                        )}
                      </td>

                      <td className="py-3 px-4">{order.details}</td>

                      <td className="py-3 px-4 flex space-x-2">
                        {editingId === order.id ? (
                          <>
                            <button onClick={() => handleSaveEdit(order.id)} className="text-green-600 hover:text-green-800"><Save className="w-5 h-5" /></button>
                            <button onClick={handleCancelEdit} className="text-red-600 hover:text-red-800"><XCircle className="w-5 h-5" /></button>
                          </>
                        ) : (
                          <button onClick={() => handleEditClick(order)} className="text-red-600 hover:text-red-800"><Edit className="w-5 h-5" /></button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-8">No hay pedidos registrados.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}