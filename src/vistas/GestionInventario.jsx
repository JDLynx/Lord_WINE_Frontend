import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";
import { User, Warehouse, Link, Unlink, PlusCircle, Edit, Trash2, Save, XCircle } from 'lucide-react';

export default function GestionInventario() {
  const [inventories, setInventories] = useState([]);
  const [stores, setStores] = useState([]); // For filtering/assigning inventory to stores
  const [selectedInventoryItem, setSelectedInventoryItem] = useState(null); // For editing stock
  const [newStockQuantity, setNewStockQuantity] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Simulate fetching inventory data and stores
    const simulatedInventories = [
      { id: 'INV001', type: 'General', productName: 'Vino Tinto Reserva', quantity: 120, location: 'Almacén Central', lastUpdated: '2025-06-20' },
      { id: 'INV002', type: 'Tienda', productName: 'Crema de Whisky Clásica', quantity: 30, location: 'Tienda Centro', lastUpdated: '2025-06-21' },
      { id: 'INV003', type: 'Tienda', productName: 'Mistela Artesanal Dulce', quantity: 50, location: 'Tienda Norte', lastUpdated: '2025-06-21' },
      { id: 'INV004', type: 'General', productName: 'Zumo de Uva Natural', quantity: 250, location: 'Almacén Central', lastUpdated: '2025-06-19' },
      { id: 'INV005', type: 'Tienda', productName: 'Sacacorchos Premium', quantity: 20, location: 'Tienda Centro', lastUpdated: '2025-06-20' },
    ];
    const simulatedStores = ['Almacén Central', 'Tienda Centro', 'Tienda Norte', 'Tienda Sur']; // Locations

    setInventories(simulatedInventories);
    setStores(simulatedStores);
  }, []);

  const handleEditStock = (item) => {
    setSelectedInventoryItem(item);
    setNewStockQuantity(item.quantity);
    setIsModalOpen(true);
  };

  const handleSaveStock = () => {
    if (selectedInventoryItem && !isNaN(newStockQuantity) && newStockQuantity >= 0) {
      setInventories(inventories.map(item =>
        item.id === selectedInventoryItem.id ? { ...item, quantity: parseInt(newStockQuantity), lastUpdated: new Date().toISOString().slice(0, 10) } : item
      ));
      alert(`Stock de ${selectedInventoryItem.productName} actualizado a ${newStockQuantity} (simulado).`);
      setIsModalOpen(false);
      setSelectedInventoryItem(null);
    } else {
      alert('Por favor, ingresa una cantidad de stock válida.');
    }
  };

  return (
    <>
      <div className="page-container">
        <Header />
        <BarraProductos />
        <main className="bg-vistas-home min-h-screen py-8 px-4 sm:px-8">
          <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-10">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">Gestión de Inventario General y Tienda</h1>
            <p className="text-center text-gray-600 text-lg mb-8">
              Visualiza y administra las existencias generales y de cada tienda.
            </p>

            {inventories.length > 0 ? (
              <div className="overflow-x-auto rounded-lg shadow-md">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-100 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Tipo</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Producto</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Cantidad</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Ubicación</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Última Actualización</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {inventories.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.productName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.quantity}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.location}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.lastUpdated}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-center space-x-3">
                            <button
                              onClick={() => handleEditStock(item)}
                              className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                              title="Editar Stock"
                            >
                              <Edit size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-gray-500 mt-8">No hay elementos en inventario registrados.</p>
            )}

            {/* Modal para Editar Stock */}
            {isModalOpen && selectedInventoryItem && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
                <div className="relative p-8 bg-white w-full max-w-md mx-auto rounded-lg shadow-xl">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Editar Stock de "{selectedInventoryItem.productName}"
                  </h2>
                  <div className="mb-4">
                    <p className="text-gray-700"><strong>Tipo:</strong> {selectedInventoryItem.type}</p>
                    <p className="text-gray-700"><strong>Ubicación:</strong> {selectedInventoryItem.location}</p>
                    <p className="text-gray-700"><strong>Stock Actual:</strong> {selectedInventoryItem.quantity}</p>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="newStock" className="block text-gray-700 text-sm font-bold mb-2">Nueva Cantidad:</label>
                    <input
                      type="number"
                      id="newStock"
                      name="newStock"
                      value={newStockQuantity}
                      onChange={(e) => setNewStockQuantity(parseInt(e.target.value) || 0)}
                      className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md flex items-center space-x-2 transition-colors duration-200"
                    >
                      <XCircle size={20} />
                      <span>Cancelar</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveStock}
                      className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-md flex items-center space-x-2 transition-colors duration-200"
                    >
                      <Save size={20} />
                      <span>Guardar</span>
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