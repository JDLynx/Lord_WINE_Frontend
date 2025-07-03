import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from '../components/BarraProductos';
import { ShoppingBag, User, Home, Phone, Calendar, ClipboardList, Package, DollarSign, MapPin, CheckCircle, Truck } from 'lucide-react';

export default function DetallesPedidosEmpleado() {
  const [orderDetail, setOrderDetail] = useState(null);

  useEffect(() => {
    const simulatedOrderDetail = {
      id: 102,
      customerName: 'Ana López',
      customerAddress: 'Carrera 4 #5-6, Cali',
      customerPhone: '3207654321',
      orderDate: '2025-06-20',
      status: 'En Proceso',
      assignedTo: 'María F. Restrepo',
      deliveryInstructions: 'Dejar en portería, avisar 15 min antes.',
      items: [
        { productId: 'PROD005', name: 'Vino Blanco Fresco', quantity: 1, price: 55.00 },
        { productId: 'PROD010', name: 'Aceitunas Gourmet', quantity: 1, price: 20.00 },
      ],
      total: 75.00
    };

    setTimeout(() => {
      setOrderDetail(simulatedOrderDetail);
    }, 500);
  }, []);

  if (!orderDetail) {
    return (
      <div className="flex flex-col min-h-screen overflow-x-hidden">
        <Header />
        <BarraProductos />
        <main
          className="flex-grow flex items-center justify-center w-full py-8 px-4 sm:px-8 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/img/Viñedo.jpg')" }}
        >
          <div className="text-center text-gray-600 text-lg">Cargando detalles del pedido...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      <BarraProductos />
      <main
        className="flex-grow flex flex-col items-center w-full py-8 px-4 sm:px-8 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/img/Viñedo.jpg')" }}
      >
        <div className="max-w-4xl mx-auto w-full bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-red-600 mb-6 text-center flex items-center justify-center space-x-2">
            <ShoppingBag className="w-8 h-8 text-red-600" />
            <span>Detalles del Pedido #{orderDetail.id}</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 border-b pb-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center space-x-2"><User className="w-5 h-5" /><span>Información del Cliente</span></h3>
              <p className="flex items-center space-x-2 text-gray-700 mb-2"><User className="w-4 h-4 text-gray-500" /><span>{orderDetail.customerName}</span></p>
              <p className="flex items-center space-x-2 text-gray-700 mb-2"><Home className="w-4 h-4 text-gray-500" /><span>{orderDetail.customerAddress}</span></p>
              <p className="flex items-center space-x-2 text-gray-700 mb-2"><Phone className="w-4 h-4 text-gray-500" /><span>{orderDetail.customerPhone}</span></p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center space-x-2"><ClipboardList className="w-5 h-5" /><span>Detalles del Pedido</span></h3>
              <p className="flex items-center space-x-2 text-gray-700 mb-2"><Calendar className="w-4 h-4 text-gray-500" /><span>Fecha: {orderDetail.orderDate}</span></p>
              <p className="flex items-center space-x-2 text-gray-700 mb-2">
                <Truck className="w-4 h-4 text-gray-500" />
                <span>Estado: <span className={`font-semibold ${orderDetail.status === 'Completado' ? 'text-green-600' : orderDetail.status === 'En Proceso' ? 'text-red-600' : 'text-yellow-600'}`}>{orderDetail.status}</span></span>
              </p>
              <p className="flex items-center space-x-2 text-gray-700 mb-2"><User className="w-4 h-4 text-gray-500" /><span>Asignado a: {orderDetail.assignedTo}</span></p>
              {orderDetail.deliveryInstructions && (
                <p className="flex items-center space-x-2 text-gray-700 mb-2"><MapPin className="w-4 h-4 text-gray-500" /><span>Instrucciones: {orderDetail.deliveryInstructions}</span></p>
              )}
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center space-x-2"><Package className="w-5 h-5" /><span>Productos</span></h3>
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Producto</th>
                  <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Cantidad</th>
                  <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Precio Unit.</th>
                  <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {orderDetail.items.map(item => (
                  <tr key={item.productId} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50 text-gray-600">
                    <td className="py-2 px-4">{item.name}</td>
                    <td className="py-2 px-4">{item.quantity}</td>
                    <td className="py-2 px-4">${item.price.toFixed(2)}</td>
                    <td className="py-2 px-4">${(item.quantity * item.price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-right text-2xl font-bold text-gray-800 flex items-center justify-end space-x-2">
            <DollarSign className="w-6 h-6 text-green-600" />
            <span>Total: ${orderDetail.total.toFixed(2)}</span>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}