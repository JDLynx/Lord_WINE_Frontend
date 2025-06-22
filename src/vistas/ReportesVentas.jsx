import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";
import { BarChart, List, DollarSign, Package, TrendingUp } from 'lucide-react';

export default function ReportesVentas() {
  const [salesReports, setSalesReports] = useState([]);
  const [selectedReportType, setSelectedReportType] = useState('summary'); // 'summary', 'details', 'products-sold', 'stock'

  useEffect(() => {
    // Simulate fetching various report data
    const simulatedSalesSummary = {
      totalSales: 152345.67,
      totalOrders: 1250,
      averageOrderValue: 121.87,
      topSeller: 'Vino Tinto Reserva',
      lastMonthSales: 25800.50,
    };

    const simulatedDetailedSales = [
      { id: 'ORD001', date: '2025-06-20', customer: 'Ana López', total: 55.75, items: ['Vino Tinto (2)', 'Sacacorchos (1)'] },
      { id: 'ORD002', date: '2025-06-19', customer: 'Pedro Martínez', total: 22.50, items: ['Crema Whisky (1)'] },
      { id: 'ORD003', date: '2025-06-18', customer: 'Laura Fernández', total: 19.80, items: ['Mistela (2)'] },
      { id: 'ORD004', date: '2025-06-21', customer: 'David Gómez', total: 10.00, items: ['Zumo Uva (2)'] },
      { id: 'ORD005', date: '2025-06-21', customer: 'Marta Ríos', total: 30.00, items: ['Vino Tinto (1)', 'Queso Artesanal (1)'] },
    ];

    const simulatedProductsSold = [
      { productName: 'Vino Tinto Reserva', totalQuantitySold: 580, totalRevenue: 9274.20 },
      { productName: 'Crema de Whisky Clásica', totalQuantitySold: 320, totalRevenue: 7200.00 },
      { productName: 'Mistela Artesanal Dulce', totalQuantitySold: 450, totalRevenue: 4455.00 },
      { productName: 'Zumo de Uva Natural', totalQuantitySold: 700, totalRevenue: 2800.00 },
      { productName: 'Sacacorchos Premium', totalQuantitySold: 200, totalRevenue: 1450.00 },
    ];

    const simulatedStockLevels = [
      { productName: 'Vino Tinto Reserva', currentStock: 120, minStock: 50, status: 'Bueno' },
      { productName: 'Crema de Whisky Clásica', currentStock: 30, minStock: 40, status: 'Bajo' },
      { productName: 'Mistela Artesanal Dulce', currentStock: 200, minStock: 100, status: 'Bueno' },
      { productName: 'Zumo de Uva Natural', currentStock: 250, minStock: 150, status: 'Bueno' },
      { productName: 'Sacacorchos Premium', currentStock: 20, minStock: 25, status: 'Bajo' },
    ];

    setSalesReports({
      summary: simulatedSalesSummary,
      details: simulatedDetailedSales,
      productsSold: simulatedProductsSold,
      stockLevels: simulatedStockLevels,
    });
  }, []);

  const renderReportContent = () => {
    if (!salesReports.summary) {
      return <p className="text-center text-gray-500">Cargando reportes...</p>;
    }

    switch (selectedReportType) {
      case 'summary':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-red-50 p-6 rounded-lg shadow-sm flex items-center space-x-4">
              <DollarSign size={40} className="text-red-700" />
              <div>
                <p className="text-sm text-gray-600">Ventas Totales</p>
                <p className="text-2xl font-bold text-gray-900">${salesReports.summary.totalSales.toFixed(2)}</p>
              </div>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg shadow-sm flex items-center space-x-4">
              <List size={40} className="text-blue-700" />
              <div>
                <p className="text-sm text-gray-600">Total de Pedidos</p>
                <p className="text-2xl font-bold text-gray-900">{salesReports.summary.totalOrders}</p>
              </div>
            </div>
            <div className="bg-green-50 p-6 rounded-lg shadow-sm flex items-center space-x-4">
              <TrendingUp size={40} className="text-green-700" />
              <div>
                <p className="text-sm text-gray-600">Valor Promedio Pedido</p>
                <p className="text-2xl font-bold text-gray-900">${salesReports.summary.averageOrderValue.toFixed(2)}</p>
              </div>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg shadow-sm flex items-center space-x-4">
              <Package size={40} className="text-purple-700" />
              <div>
                <p className="text-sm text-gray-600">Producto Más Vendido</p>
                <p className="text-xl font-bold text-gray-900">{salesReports.summary.topSeller}</p>
              </div>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg shadow-sm flex items-center space-x-4">
              <BarChart size={40} className="text-yellow-700" />
              <div>
                <p className="text-sm text-gray-600">Ventas Último Mes</p>
                <p className="text-2xl font-bold text-gray-900">${salesReports.summary.lastMonthSales.toFixed(2)}</p>
              </div>
            </div>
          </div>
        );
      case 'details':
        return (
          <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">ID Pedido</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Fecha</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Cliente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Items</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {salesReports.details.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${order.total.toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{order.items.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'products-sold':
        return (
          <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Producto</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Cantidad Total Vendida</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Ingresos Totales</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {salesReports.productsSold.map((product, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.productName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{product.totalQuantitySold}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${product.totalRevenue.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'stock':
        return (
          <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Producto</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Stock Actual</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Stock Mínimo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {salesReports.stockLevels.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.productName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.currentStock}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.minStock}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.status === 'Bajo' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      default:
        return <p className="text-center text-gray-500">Selecciona un tipo de reporte.</p>;
    }
  };

  return (
    <>
      <div className="page-container">
        <Header />
        <BarraProductos />
        <main className="bg-vistas-home min-h-screen py-8 px-4 sm:px-8">
          <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-10">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">Reportes de Ventas</h1>
            <p className="text-center text-gray-600 text-lg mb-8">
              Consulta detalles de ventas, productos vendidos y estado del stock.
            </p>

            <div className="flex justify-center space-x-4 mb-8 flex-wrap">
              <button
                onClick={() => setSelectedReportType('summary')}
                className={`py-2 px-4 rounded-md font-semibold transition-colors duration-200 ${selectedReportType === 'summary' ? 'bg-red-700 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
              >
                Resumen General
              </button>
              <button
                onClick={() => setSelectedReportType('details')}
                className={`py-2 px-4 rounded-md font-semibold transition-colors duration-200 ${selectedReportType === 'details' ? 'bg-red-700 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
              >
                Detalle de Pedidos
              </button>
              <button
                onClick={() => setSelectedReportType('products-sold')}
                className={`py-2 px-4 rounded-md font-semibold transition-colors duration-200 ${selectedReportType === 'products-sold' ? 'bg-red-700 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
              >
                Productos Vendidos
              </button>
              <button
                onClick={() => setSelectedReportType('stock')}
                className={`py-2 px-4 rounded-md font-semibold transition-colors duration-200 ${selectedReportType === 'stock' ? 'bg-red-700 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
              >
                Niveles de Stock
              </button>
            </div>

            <div className="mt-8">
              {renderReportContent()}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}