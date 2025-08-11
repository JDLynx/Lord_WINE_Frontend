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
  const [searchQuery, setSearchQuery] = useState('');

  const [showAddModal, setShowAddModal] = useState(false);
  const [newInventoryItem, setNewInventoryItem] = useState({
    prodIdProducto: '',
    tiendIdTiendaFisica: '',
    invTienProdCantidad: 0,
  });
  const [productos, setProductos] = useState([]);
  const [tiendas, setTiendas] = useState([]);
  const [tieneTiendaFisicaInventarioTiendaRelations, setTieneTiendaFisicaInventarioTiendaRelations] = useState([]);

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const showNotification = (msg, type = 'success') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const inventoryResponse = await fetch('https://lord-wine-backend.onrender.com/api/tiene-inventario-tienda-producto');

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

        const productsResponse = await fetch('https://lord-wine-backend.onrender.com/api/productos');
        if (!productsResponse.ok) {
          throw new Error('Error al obtener productos');
        }
        const productsData = await productsResponse.json();
        setProductos(productsData);

        const storesResponse = await fetch('https://lord-wine-backend.onrender.com/api/tiendas-fisicas');
        if (!storesResponse.ok) {
          throw new Error('Error al obtener tiendas');
        }
        const storesData = await storesResponse.json();
        setTiendas(storesData);

        const tieneTiendaFisicaInvTienResponse = await fetch('https://lord-wine-backend.onrender.com/api/tiene-tienda-fisica-inventario-tienda');
        if (!tieneTiendaFisicaInvTienResponse.ok) {
          throw new Error('Error al obtener relaciones tienda-inventario');
        }
        const tieneTiendaFisicaInvTienData = await tieneTiendaFisicaInvTienResponse.json();
        setTieneTiendaFisicaInventarioTiendaRelations(tieneTiendaFisicaInvTienData);

      } catch (err) {
        console.error('Error al obtener datos iniciales:', err);
        showNotification('Error al cargar los datos iniciales.', 'error');
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
      showNotification('Ingresa una cantidad válida.', 'error');
      return;
    }

    try {
      const res = await fetch(`https://lord-wine-backend.onrender.com/api/tiene-inventario-tienda-producto/${selectedItem.invTienIdInventarioTienda}/${selectedItem.prodIdProducto}`, {
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

    } catch (err) {
      console.error(err);
      showNotification('Ocurrió un error al actualizar la cantidad: ' + err.message, 'error');
    }

    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleDelete = (invTienIdInventarioTienda, prodIdProducto) => {
    setItemToDelete({ invTienIdInventarioTienda, prodIdProducto });
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      const res = await fetch(`https://lord-wine-backend.onrender.com/api/tiene-inventario-tienda-producto/${itemToDelete.invTienIdInventarioTienda}/${itemToDelete.prodIdProducto}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error al eliminar el producto del inventario');
      }

      setStoreInventory(prev =>
        prev.filter(item =>
          !(item.invTienIdInventarioTienda === itemToDelete.invTienIdInventarioTienda && item.prodIdProducto === itemToDelete.prodIdProducto)
        )
      );

    } catch (err) {
      console.error(err);
      showNotification('Ocurrió un error al eliminar el producto del inventario: ' + err.message, 'error');
    } finally {
      setShowConfirmModal(false);
      setItemToDelete(null);
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
      showNotification('Por favor, completa todos los campos y asegúrate de que la cantidad sea válida.', 'error');
      return;
    }

    const selectedTiendaFisicaId = parseInt(tiendIdTiendaFisica);
    const foundRelation = tieneTiendaFisicaInventarioTiendaRelations.find(
      rel => rel.tiendIdTiendaFisica === selectedTiendaFisicaId
    );

    if (!foundRelation) {
      showNotification('No se encontró un inventario de tienda asociado a la tienda seleccionada. Asegúrate de que la tienda tenga un inventario asignado.', 'error');
      return;
    }

    const invTienIdInventarioToUse = foundRelation.invTienIdInventarioTienda;

    const isDuplicate = storeInventory.some(item =>
      item.prodIdProducto === parseInt(prodIdProducto) &&
      item.invTienIdInventarioTienda === invTienIdInventarioToUse
    );

    if (isDuplicate) {
      showNotification('Este producto ya existe en el inventario de esta tienda.', 'error');
      return;
    }

    try {
      const res = await fetch('https://lord-wine-backend.onrender.com/api/tiene-inventario-tienda-producto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prodIdProducto: parseInt(prodIdProducto),
          invTienIdInventarioTienda: invTienIdInventarioToUse,
          invTienProdCantidad: invTienProdCantidad,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error al añadir el producto al inventario');
      }

      const { relacion } = await res.json();

      const productoNombre = productos.find(p => p.prodIdProducto === parseInt(relacion.prodIdProducto))?.prodNombre || 'N/A';
      const tiendaNombre = tiendas.find(t => t.tiendIdTiendaFisica === parseInt(tiendIdTiendaFisica))?.tiendNombre || 'N/A';

      setStoreInventory(prev => [
        ...prev,
        {
          invTienIdInventarioTienda: relacion.invTienIdInventarioTienda,
          prodIdProducto: relacion.prodIdProducto,
          producto: productoNombre,
          tienda: tiendaNombre,
          cantidadDisponible: relacion.invTienProdCantidad,
          updatedAt: relacion.updatedAt ? new Date(relacion.updatedAt).toISOString().slice(0, 10) : 'N/A',
        },
      ]);

      setShowAddModal(false);
      setNewInventoryItem({ prodIdProducto: '', tiendIdTiendaFisica: '', invTienProdCantidad: 0 });
    } catch (err) {
      console.error(err);
      showNotification('Ocurrió un error al añadir el producto al inventario: ' + err.message, 'error');
    }
  };

  const filteredInventory = storeInventory.filter(item =>
    Object.values(item).some(val =>
      typeof val === 'string' && val.toLowerCase().includes(searchQuery.toLowerCase())
    ) ||
    (typeof item.prodIdProducto === 'number' && item.prodIdProducto.toString().includes(searchQuery)) ||
    (typeof item.cantidadDisponible === 'number' && item.cantidadDisponible.toString().includes(searchQuery))
  );

  return (
    <div className="page-container min-h-screen flex flex-col">
      <Header />
      <BarraProductos />
      <main className="bg-vistas-home py-8 px-4 sm:px-8 flex-grow overflow-y-auto">
        <div className="w-full mx-auto bg-white rounded-2xl shadow-lg p-10 mt-8">
          <h1 className="text-3xl font-semibold text-black mb-2 text-center">Gestión de Inventarios</h1>
          <p className="text-center text-black mb-8 text-xl">
            Gestión del inventario de productos en cada una de tus tiendas. Puedes añadir nuevos productos a una tienda, actualizar la cantidad de un producto existente o eliminarlo del inventario de una tienda específica.
          </p>

          {message && messageType === 'error' && (
            <div className={`fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 transition-opacity duration-300 ${
              messageType === 'error' ? 'bg-red-500 text-white' : ''
            }`}>
              {message}
            </div>
          )}

          <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <input
              type="text"
              placeholder="Buscar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full max-w-xs border border-gray-300 rounded px-4 py-2 text-black text-left text-lg focus:border-black focus:outline-none"
            />
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-[#921913] hover:bg-red-800 text-white font-bold py-2 px-4 rounded-md flex items-center space-x-2 shadow-md text-lg"
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
                  {filteredInventory.map(item => (
                    <tr key={`${item.invTienIdInventarioTienda}-${item.prodIdProducto}`} className="hover:bg-gray-50">
                      <td className="px-4 py-2 text-black text-left text-base">{item.prodIdProducto}</td>
                      <td className="px-4 py-2 text-black text-left text-base">{item.producto}</td>
                      <td className="px-4 py-2 text-black text-center text-base">{item.cantidadDisponible}</td>
                      <td className="px-4 py-2 text-black text-left text-base">{item.tienda}</td>
                      <td className="px-4 py-2 text-black text-left text-base">{item.updatedAt}</td>
                      <td className="px-4 py-2 text-center text-base">
                        <div className="flex justify-center space-x-3">
                          <button onClick={() => handleEdit(item)} className="text-blue-800 hover:text-blue-600">
                            <Edit size={18} />
                          </button>
                          <button onClick={() => handleDelete(item.invTienIdInventarioTienda, item.prodIdProducto)} className="text-[#801010] hover:text-[#921913]">
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

          {isModalOpen && selectedItem && (
            <div className="fixed inset-0 flex justify-center items-center z-50">
              <div className="absolute inset-0 bg-gray-500/20 backdrop-blur-sm"></div>
              <div className="relative p-8 bg-white w-full max-w-md mx-auto rounded-lg shadow-xl z-10">
                <h2 className="text-xl font-semibold text-black mb-6 text-center">
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
                    className="bg-[#921913] hover:bg-red-800 text-white font-bold py-2 px-4 rounded-md flex items-center space-x-2"
                  >
                    <Save size={20} />
                    <span>Guardar</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {showAddModal && (
            <div className="fixed inset-0 flex justify-center items-center z-50">
              <div className="absolute inset-0 bg-gray-500/20 backdrop-blur-sm"></div>
              <div className="relative p-8 bg-white w-full max-w-md mx-auto rounded-lg shadow-xl z-10">
                <h2 className="text-xl font-semibold text-black mb-6 text-center">
                  Añadir Producto a Inventario de Tienda
                </h2>
                <div className="mb-4">
                  <label htmlFor="select-product" className="block text-sm font-medium text-black mb-1">
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
                  <label htmlFor="select-store" className="block text-sm font-medium text-black mb-1">
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
                  <label htmlFor="add-quantity" className="block text-sm font-medium text-black mb-1">
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

          {showConfirmModal && (
            <div className="fixed inset-0 flex justify-center items-center z-50">
              <div className="absolute inset-0 bg-gray-500/20 backdrop-blur-sm"></div>
              <div className="relative p-8 bg-white w-full max-w-sm mx-auto rounded-lg shadow-xl z-10">
                <h2 className="text-xl font-bold text-black mb-6 text-center">Confirmar Eliminación</h2>
                <p className="text-black text-center mb-6">
                  ¿Estás seguro de que quieres eliminar este producto del inventario de la tienda?
                </p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => { setShowConfirmModal(false); setItemToDelete(null); }}
                    className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-md flex items-center space-x-2"
                  >
                    <XCircle size={20} />
                    <span>Cancelar</span>
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="bg-[#921913] hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md flex items-center space-x-2"
                  >
                    <Trash2 size={20} />
                    <span>Eliminar</span>
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