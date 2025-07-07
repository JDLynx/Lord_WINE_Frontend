import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";
import { PlusCircle, Edit, Trash2, Save, XCircle } from 'lucide-react';

export default function GestionInventario() {
  const [storeInventory, setStoreInventory] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newQuantity, setNewQuantity] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filtroNombre, setFiltroNombre] = useState('');

  const [showAddModal, setShowAddModal] = useState(false);
  const [newInventoryItem, setNewInventoryItem] = useState({
    prodIdProducto: '',
    tiendIdTiendaFisica: '',
    invTienProdCantidad: 0,
  });
  const [productos, setProductos] = useState([]);
  const [tiendas, setTiendas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const inventoryResponse = await fetch('http://localhost:3000/api/tiene-inventario-tienda-producto');
        
        if (!inventoryResponse.ok) {
          throw new Error('Error al obtener datos de inventario por tienda');
        }
        
        const inventoryData = await inventoryResponse.json();

        const mappedInventoryData = inventoryData.map(item => ({
          invTienIdInventarioTienda: item.invTienIdInventarioTienda,
          prodIdProducto: item.prodIdProducto,
          producto: item.producto?.prodNombre || 'N/A',
          tienda: item.inventarioTienda?.tiendNombre || 'N/A',
          cantidadDisponible: item.invTienProdCantidad,
          updatedAt: item.updatedAt ? new Date(item.updatedAt).toISOString().slice(0, 10) : 'N/A',
        }));
        setStoreInventory(mappedInventoryData);

        const productsResponse = await fetch('http://localhost:3000/api/productos');
        if (!productsResponse.ok) {
          throw new Error('Error al obtener productos');
        }
        const productsData = await productsResponse.json();
        setProductos(productsData);

        const storesResponse = await fetch('http://localhost:3000/api/tiendas-fisicas');
        if (!storesResponse.ok) {
          throw new Error('Error al obtener tiendas');
        }
        const storesData = await storesResponse.json();
        setTiendas(storesData);

      } catch (err) {
        console.error('Error al obtener datos iniciales:', err);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (item) => {
    setSelectedItem(item);
    setNewQuantity(item.cantidadDisponible);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (isNaN(newQuantity) || newQuantity < 0) {
      alert('Ingresa una cantidad válida.');
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/tiene-inventario-tienda-producto/${selectedItem.invTienIdInventarioTienda}/${selectedItem.prodIdProducto}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invTienProdCantidad: parseInt(newQuantity) }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error al actualizar la cantidad del producto en inventario');
      }
      
      const { relacion } = await res.json(); 

      setStoreInventory(prev =>
        prev.map(i =>
          i.invTienIdInventarioTienda === selectedItem.invTienIdInventarioTienda && i.prodIdProducto === selectedItem.prodIdProducto
            ? {
                ...i,
                cantidadDisponible: relacion.invTienProdCantidad, 
                updatedAt: relacion.updatedAt ? new Date(relacion.updatedAt).toISOString().slice(0, 10) : 'N/A',
              }
            : i
        )
      );

      alert('Cantidad actualizada correctamente.');
    } catch (err) {
      console.error(err);
      alert('Ocurrió un error al actualizar la cantidad: ' + err.message);
    }

    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleDelete = async (invTienIdInventarioTienda, prodIdProducto) => {
    if (window.confirm('¿Estás seguro de eliminar este producto del inventario de esta tienda?')) {
      try {
        const res = await fetch(`http://localhost:3000/api/tiene-inventario-tienda-producto/${invTienIdInventarioTienda}/${prodIdProducto}`, {
          method: 'DELETE',
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Error al eliminar el producto del inventario');
        }

        setStoreInventory(prev =>
          prev.filter(item =>
            !(item.invTienIdInventarioTienda === invTienIdInventarioTienda && item.prodIdProducto === prodIdProducto)
          )
        );
        alert('Producto eliminado del inventario correctamente.');
      } catch (err) {
        console.error(err);
        alert('Ocurrió un error al eliminar el producto del inventario: ' + err.message);
      }
    }
  };

  const handleNewItemChange = (e) => {
    const { name, value } = e.target;
    setNewInventoryItem(prev => ({
      ...prev,
      [name]: name === 'invTienProdCantidad' ? parseInt(value) || 0 : value,
    }));
  };

  const handleCreateSubmit = async () => {
    const { prodIdProducto, tiendIdTiendaFisica, invTienProdCantidad } = newInventoryItem;

    if (!prodIdProducto || !tiendIdTiendaFisica || isNaN(invTienProdCantidad) || invTienProdCantidad < 0) {
      alert('Por favor, completa todos los campos y asegúrate de que la cantidad sea válida.');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/tiene-inventario-tienda-producto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prodIdProducto: parseInt(prodIdProducto),
          invTienIdInventarioTienda: parseInt(tiendIdTiendaFisica),
          invTienProdCantidad: invTienProdCantidad,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error al añadir el producto al inventario');
      }

      const { relacion } = await res.json();
      
      const productoNombre = productos.find(p => p.prodIdProducto === parseInt(relacion.prodIdProducto))?.prodNombre || 'N/A';
      const tiendaNombre = tiendas.find(t => t.tiendIdTiendaFisica === parseInt(relacion.invTienIdInventarioTienda))?.tiendNombre || 'N/A';

      setStoreInventory(prev => [
        ...prev,
        {
          invTienIdInventarioTienda: relacion.invTienIdInventarioTienda,
          prodIdProducto: relacion.prodIdProducto,
          producto: productoNombre,
          tienda: tiendaNombre,
          cantidadDisponible: relacion.invTienProdCantidad,
          empleado: 'N/A', 
          updatedAt: relacion.updatedAt ? new Date(relacion.updatedAt).toISOString().slice(0, 10) : 'N/A',
        },
      ]);

      alert('Producto añadido al inventario correctamente.');
      setShowAddModal(false);
      setNewInventoryItem({ prodIdProducto: '', tiendIdTiendaFisica: '', invTienProdCantidad: 0 });
    } catch (err) {
      console.error(err);
      alert('Ocurrió un error al añadir el producto al inventario: ' + err.message);
    }
  };


  return (
    <div className="page-container">
      <Header />
      <BarraProductos />
      <main className="bg-vistas-home min-h-screen py-8 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-10">
          <h1 className="text-3xl font-semibold text-black mb-8 text-center">Gestión de Inventarios</h1>

          <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <input
              type="text"
              placeholder="Buscar por nombre de producto"
              value={filtroNombre}
              onChange={(e) => setFiltroNombre(e.target.value)}
              className="w-full sm:max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-700 text-black text-lg"
            />
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-[#921913] hover:bg-red-800 text-white font-semibold py-2 px-4 rounded-md flex items-center space-x-2 shadow-md text-lg"
            >
              <PlusCircle size={20} />
              <span>Añadir Producto a Tienda</span>
            </button>
          </div>

          <section>
            <h2 className="text-xl font-bold text-black mb-4">Inventario por Tienda</h2>
            <div className="overflow-auto max-h-[400px] rounded-lg shadow-md">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-lg font-semibold text-black">ID Producto</th> 
                    <th className="px-4 py-2 text-left text-lg font-semibold text-black">Producto</th>
                    <th className="px-4 py-2 text-center text-lg font-semibold text-black">Cantidad Disponible</th>
                    <th className="px-4 py-2 text-left text-lg font-semibold text-black">Tienda</th>
                    <th className="px-4 py-2 text-left text-lg font-semibold text-black">Última Actualización</th>
                    <th className="px-4 py-2 text-center text-lg font-semibold text-black">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {storeInventory
                    .filter(item => item.producto.toLowerCase().includes(filtroNombre.toLowerCase()))
                    .map(item => (
                      <tr key={`${item.invTienIdInventarioTienda}-${item.prodIdProducto}`} className="hover:bg-gray-50">
                        <td className="px-4 py-2 text-black text-left text-base">{item.prodIdProducto}</td>
                        <td className="px-4 py-2 text-black text-left text-base">{item.producto}</td>
                        <td className="px-4 py-2 text-black text-center text-base">{item.cantidadDisponible}</td>
                        <td className="px-4 py-2 text-black text-left text-base">{item.tienda}</td>
                        <td className="px-4 py-2 text-black text-left text-base">{item.updatedAt}</td>
                        <td className="px-4 py-2 text-center text-base">
                          <div className="flex justify-center space-x-3">
                            <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-800">
                              <Edit size={18} />
                            </button>
                            <button onClick={() => handleDelete(item.invTienIdInventarioTienda, item.prodIdProducto)} className="text-[#921913] hover:text-[#801010]">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Modal para Editar Cantidad */}
          {isModalOpen && selectedItem && (
            <div className="fixed inset-0 flex justify-center items-center z-50">
              <div className="absolute inset-0 bg-gray-500/20 backdrop-blur-sm"></div>
              <div className="relative p-8 bg-white w-full max-w-md mx-auto rounded-lg shadow-xl z-10">
                <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
                  Editar cantidad de "{selectedItem.producto}" en "{selectedItem.tienda}"
                </h2>
                <div className="mb-6">
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                    Nueva Cantidad:
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    value={newQuantity}
                    onChange={(e) => setNewQuantity(parseInt(e.target.value) || 0)}
                    className="w-full border px-3 py-2 rounded text-black"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-md flex items-center space-x-2"
                  >
                    <XCircle size={20} />
                    <span>Cancelar</span>
                  </button>
                  <button
                    onClick={handleSave}
                    className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-md flex items-center space-x-2"
                  >
                    <Save size={20} />
                    <span>Guardar</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal para Añadir Nuevo Producto a Tienda */}
          {showAddModal && (
            <div className="fixed inset-0 flex justify-center items-center z-50">
              <div className="absolute inset-0 bg-gray-500/20 backdrop-blur-sm"></div>
              <div className="relative p-8 bg-white w-full max-w-md mx-auto rounded-lg shadow-xl z-10">
                <h2 className="text-xl font-semibold text-black mb-6 text-center">
                  Añadir Producto a Inventario de Tienda
                </h2>
                <div className="mb-4">
                  <label htmlFor="select-product" className="block text-sm font-medium text-gray-700 mb-1">
                    Producto:
                  </label>
                  <select
                    id="select-product"
                    name="prodIdProducto"
                    value={newInventoryItem.prodIdProducto}
                    onChange={handleNewItemChange}
                    className="w-full border px-3 py-2 rounded text-black bg-white"
                  >
                    <option value="">Selecciona un producto</option>
                    {productos.map(p => (
                      <option key={p.prodIdProducto} value={p.prodIdProducto}>
                        {p.prodNombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="select-store" className="block text-sm font-medium text-gray-700 mb-1">
                    Tienda:
                  </label>
                  <select
                    id="select-store"
                    name="tiendIdTiendaFisica"
                    value={newInventoryItem.tiendIdTiendaFisica}
                    onChange={handleNewItemChange}
                    className="w-full border px-3 py-2 rounded text-black bg-white"
                  >
                    <option value="">Selecciona una tienda</option>
                    {tiendas.map(t => (
                      <option key={t.tiendIdTiendaFisica} value={t.tiendIdTiendaFisica}>
                        {t.tiendNombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-6">
                  <label htmlFor="add-quantity" className="block text-sm font-medium text-gray-700 mb-1">
                    Cantidad:
                  </label>
                  <input
                    type="number"
                    id="add-quantity"
                    name="invTienProdCantidad"
                    value={newInventoryItem.invTienProdCantidad}
                    onChange={handleNewItemChange}
                    className="w-full border px-3 py-2 rounded text-black"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      setNewInventoryItem({ prodIdProducto: '', tiendIdTiendaFisica: '', invTienProdCantidad: 0 });
                    }}
                    className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-md flex items-center space-x-2"
                  >
                    <XCircle size={20} />
                    <span>Cancelar</span>
                  </button>
                  <button
                    onClick={handleCreateSubmit}
                    className="bg-[#921913] hover:bg-red-800 text-white font-bold py-2 px-4 rounded-md flex items-center space-x-2"
                  >
                    <Save size={20} />
                    <span>Añadir</span>
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