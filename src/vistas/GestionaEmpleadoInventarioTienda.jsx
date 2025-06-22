import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from '../components/BarraProductos';
import { User, Store, LayoutGrid, CheckCircle, XCircle } from 'lucide-react';

export default function GestionaEmpleadoInventarioTienda() {
  const [assignments, setAssignments] = useState([
    { id: 1, employeeName: 'María F. Restrepo', storeName: 'Tienda Central Popayán', inventoryManaged: true },
    { id: 2, employeeName: 'María F. Restrepo', storeName: 'Tienda Norte Cali', inventoryManaged: false },
    { id: 3, employeeName: 'Pedro Gómez', storeName: 'Tienda Central Popayán', inventoryManaged: true },
  ]);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      <BarraProductos />
      <main className="flex-grow flex flex-col items-center w-full py-8 px-4 sm:px-8 bg-gray-100">
        <div className="max-w-6xl mx-auto w-full bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Gestión de Inventario por Empleado</h2>
          <p className="text-gray-600 mb-6 text-center">
            <LayoutGrid className="inline-block w-5 h-5 mr-2" />
            Visibilidad de asignaciones de inventario a empleados.
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">ID</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Empleado</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Tienda Asignada</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Gestiona Inventario</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map(assignment => (
                  <tr key={assignment.id} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50">
                    <td className="py-3 px-4">{assignment.id}</td>
                    <td className="py-3 px-4 flex items-center space-x-2"><User className="w-4 h-4 text-gray-500" /><span>{assignment.employeeName}</span></td>
                    <td className="py-3 px-4 flex items-center space-x-2"><Store className="w-4 h-4 text-gray-500" /><span>{assignment.storeName}</span></td>
                    <td className="py-3 px-4">
                      {assignment.inventoryManaged ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
