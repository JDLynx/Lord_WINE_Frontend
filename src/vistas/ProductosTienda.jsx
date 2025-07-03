import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from '../components/BarraProductos';
import { Package, Tag, Boxes } from 'lucide-react';

export default function ProductosTienda() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Vino Tinto Reserva', category: 'Vinos', price: 75.00, stock: 50 },
    { id: 2, name: 'Cremas de Whisky Irlandesa', category: 'Cremas y Licores', price: 45.00, stock: 120 },
    { id: 3, name: 'Mistela Casera', category: 'Mistelas', price: 30.00, stock: 80 },
    { id: 4, name: 'Zumo de Uva Natural', category: 'Zumos', price: 15.00, stock: 150 },
    { id: 5, name: 'Set de Copas de Vino', category: 'Accesorios', price: 50.00, stock: 30 },
    { id: 6, name: 'Champagne Brut', category: 'Vinos', price: 120.00, stock: 25 },
  ]);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      <BarraProductos />
      <main
        className="flex-grow flex flex-col items-center w-full py-8 px-4 sm:px-8 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/img/Viñedo.jpg')" }}
      >
        <div className="max-w-6xl mx-auto w-full bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">Productos Disponibles en Tienda</h2>

          {products.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">ID</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Nombre</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Categoría</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Precio</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50 text-gray-600">
                      <td className="py-3 px-4">{product.id}</td>
                      <td className="py-3 px-4 flex items-center space-x-2"><Package className="w-4 h-4 text-gray-500" /><span>{product.name}</span></td>
                      <td className="py-3 px-4 flex items-center space-x-2"><Tag className="w-4 h-4 text-gray-500" /><span>{product.category}</span></td>
                      <td className="py-3 px-4">${product.price.toFixed(2)}</td>
                      <td className="py-3 px-4 flex items-center space-x-2"><Boxes className="w-4 h-4 text-gray-500" /><span>{product.stock}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-8">No hay productos disponibles en esta tienda.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}