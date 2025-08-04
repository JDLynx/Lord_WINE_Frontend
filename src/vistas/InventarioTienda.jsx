import React, { useState, useEffect, useCallback } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from '../components/BarraProductos';
import { Store, Package, Boxes, Edit, Save, XCircle, PlusCircle, Trash2 } from 'lucide-react';

export default function InventarioTienda() {
  const [storeInventory, setStoreInventory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProdId, setEditingProdId] = useState(null);
  const [newProduct, setNewProduct] = useState({ prodIdProducto: '', invTienProdCantidad: 0 });
  const [editedProduct, setEditedProduct] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [empleadoLogeadoId] = useState(parseInt(localStorage.getItem("employeeCod"), 10) || null);
  const [empleadoTiendaId, setEmpleadoTiendaId] = useState(null);
  const [empleadoInventarioTiendaId, setEmpleadoInventarioTiendaId] = useState(null);
  const [empleadoTiendaNombre, setEmpleadoTiendaNombre] = useState('Cargando...');

  const [productos, setProductos] = useState([]);
  const [tiendas, setTiendas] = useState([]);
  const [tieneTiendaFisicaInventarioTiendaRelations, setTieneTiendaFisicaInventarioTiendaRelations] = useState([]);
  const [trabajaEmpleadoTiendaRelations, setTrabajaEmpleadoTiendaRelations] = useState([]);

  const showNotification = (msg, type = 'error') => {
    alert(msg);
  };

  const fetchEmployeeStoreAndRelations = useCallback(async () => {
    if (!empleadoLogeadoId) {
      showNotification('No se encontró el ID del empleado logeado.', 'error');
      return;
    }
    try {
      const trabajaEmpleadoTiendaResponse = await fetch('http://localhost:3000/api/trabaja-empleado-tienda');
      if (!trabajaEmpleadoTiendaResponse.ok) throw new Error('Error al obtener relaciones empleado-tienda.');
      const trabajaEmpleadoTiendaData = await trabajaEmpleadoTiendaResponse.json();
      setTrabajaEmpleadoTiendaRelations(trabajaEmpleadoTiendaData);

      const employeeStoreRelation = trabajaEmpleadoTiendaData.find(
        (relation) => relation.emplCodEmpleado === empleadoLogeadoId
      );

      if (employeeStoreRelation) {
        setEmpleadoTiendaId(employeeStoreRelation.tiendIdTiendaFisica);
      } else {
        showNotification('El empleado logeado no tiene una tienda asignada.', 'error');
        setEmpleadoTiendaId(null);
      }
    } catch (err) {
      console.error('Error fetching employee store relation:', err);
      showNotification('Error al obtener la relación empleado-tienda: ' + err.message, 'error');
    }
  }, [empleadoLogeadoId]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [
        inventoryResponse,
        productsResponse,
        storesResponse,
        tieneTiendaFisicaInvTienResponse
      ] = await Promise.all([
        fetch('http://localhost:3000/api/tiene-inventario-tienda-producto'),
        fetch('http://localhost:3000/api/productos'),
        fetch('http://localhost:3000/api/tiendas-fisicas'),
        fetch('http://localhost:3000/api/tiene-tienda-fisica-inventario-tienda')
      ]);

      if (!inventoryResponse.ok) throw new Error('Error al obtener datos de inventario por tienda.');
      if (!productsResponse.ok) throw new Error('Error al obtener productos.');
      if (!storesResponse.ok) throw new Error('Error al obtener tiendas.');
      if (!tieneTiendaFisicaInvTienResponse.ok) throw new Error('Error al obtener relaciones tienda-inventario.');

      const inventoryData = await inventoryResponse.json();
      const productsData = await productsResponse.json();
      const storesData = await storesResponse.json();
      const tieneTiendaFisicaInvTienData = await tieneTiendaFisicaInvTienResponse.json();

      setProductos(productsData);
      setTiendas(storesData);
      setTieneTiendaFisicaInventarioTiendaRelations(tieneTiendaFisicaInvTienData);

      const foundRelation = tieneTiendaFisicaInvTienData.find(
        rel => rel.tiendIdTiendaFisica === empleadoTiendaId
      );

      let filteredInventory = [];
      if (foundRelation) {
        const invTienIdForEmployeeStore = foundRelation.invTienIdInventarioTienda;
        setEmpleadoInventarioTiendaId(invTienIdForEmployeeStore);
        setEmpleadoTiendaNombre(storesData.find(t => t.tiendIdTiendaFisica === empleadoTiendaId)?.tiendNombre || 'N/A');

        filteredInventory = inventoryData.filter(
          item => item.invTienIdInventarioTienda === invTienIdForEmployeeStore
        );
      } else {
        showNotification('No se encontró inventario asignado a la tienda de este empleado.', 'error');
      }

      const mappedInventoryData = filteredInventory.map(item => ({
        invTienIdInventarioTienda: item.invTienIdInventarioTienda,
        prodIdProducto: item.prodIdProducto,
        producto: productsData.find(p => p.prodIdProducto === item.prodIdProducto)?.prodNombre || 'N/A',
        tienda: storesData.find(t => t.tiendIdTiendaFisica === empleadoTiendaId)?.tiendNombre || 'N/A',
        cantidadDisponible: item.invTienProdCantidad,
        updatedAt: item.updatedAt ? new Date(item.updatedAt).toISOString().slice(0, 10) : 'N/A',
      }));
      setStoreInventory(mappedInventoryData);

    } catch (err) {
      console.error('Error al obtener datos iniciales:', err);
      showNotification('Error al cargar los datos iniciales del inventario: ' + err.message, 'error');
    } finally {
      setIsLoading(false);
    }
  }, [empleadoTiendaId]);

  useEffect(() => {
    fetchEmployeeStoreAndRelations();
  }, [fetchEmployeeStoreAndRelations]);

  useEffect(() => {
    if (empleadoTiendaId !== null) {
      fetchData();
    }
  }, [fetchData, empleadoTiendaId]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setEditingProdId(null);
    setNewProduct({ prodIdProducto: '', invTienProdCantidad: 0 });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProdId(null);
    setEditedProduct({});
  };

  const handleAddProduct = async () => {
    const { prodIdProducto, invTienProdCantidad } = newProduct;

    if (!prodIdProducto || isNaN(invTienProdCantidad) || invTienProdCantidad < 0 || empleadoInventarioTiendaId === null) {
      showNotification('Por favor, completa todos los campos y asegúrate de que la cantidad sea válida, y que la tienda del empleado esté asignada.', 'error');
      return;
    }

    const isDuplicate = storeInventory.some(item =>
      item.prodIdProducto === parseInt(prodIdProducto) &&
      item.invTienIdInventarioTienda === empleadoInventarioTiendaId
    );

    if (isDuplicate) {
      showNotification('Este producto ya existe en el inventario de tu tienda.', 'error');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/tiene-inventario-tienda-producto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prodIdProducto: parseInt(prodIdProducto),
          invTienIdInventarioTienda: empleadoInventarioTiendaId,
          invTienProdCantidad: parseInt(invTienProdCantidad),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error al añadir el producto al inventario');
      }

      await fetchData();
      handleCloseModal();
    } catch (err) {
      console.error(err);
      showNotification('Ocurrió un error al añadir el producto al inventario: ' + err.message, 'error');
    }
  };

  const handleEditClick = (item) => {
    setEditingProdId(item.prodIdProducto);
    setEditedProduct({
      invTienIdInventarioTienda: item.invTienIdInventarioTienda,
      prodIdProducto: item.prodIdProducto,
      product: item.producto,
      stock: item.cantidadDisponible,
      location: item.tienda
    });
    setIsModalOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!editedProduct.prodIdProducto || !editedProduct.invTienIdInventarioTienda || isNaN(editedProduct.stock) || editedProduct.stock < 0) {
      showNotification('Ingresa una cantidad válida.', 'error');
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/tiene-inventario-tienda-producto/${editedProduct.invTienIdInventarioTienda}/${editedProduct.prodIdProducto}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invTienProdCantidad: parseInt(editedProduct.stock) }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error al actualizar la cantidad del producto en inventario');
      }

      await fetchData();
      handleCloseModal();
    } catch (err) {
      console.error(err);
      showNotification('Ocurrió un error al actualizar la cantidad: ' + err.message, 'error');
    }
  };

  const handleDeleteProduct = (invTienIdInventarioTienda, prodIdProducto) => {
    setItemToDelete({ invTienIdInventarioTienda, prodIdProducto });
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      const res = await fetch(`http://localhost:3000/api/tiene-inventario-tienda-producto/${itemToDelete.invTienIdInventarioTienda}/${itemToDelete.prodIdProducto}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error al eliminar el producto del inventario');
      }

      await fetchData();
      setShowConfirmModal(false);
      setItemToDelete(null);
    } catch (err) {
      console.error(err);
      showNotification('Ocurrió un error al eliminar el producto del inventario: ' + err.message, 'error');
    }
  };

  const cancelDelete = () => {
    setShowConfirmModal(false);
    setItemToDelete(null);
  };

  const filteredInventory = storeInventory.filter(item => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      (item.prodIdProducto && item.prodIdProducto.toString().includes(lowerCaseQuery)) ||
      (item.producto && item.producto.toLowerCase().includes(lowerCaseQuery)) ||
      (item.cantidadDisponible && item.cantidadDisponible.toString().includes(lowerCaseQuery)) ||
      (item.tienda && item.tienda.toLowerCase().includes(lowerCaseQuery)) ||
      (item.updatedAt && item.updatedAt.toLowerCase().includes(lowerCaseQuery))
    );
  });

  return (
    <div className="page-container min-h-screen flex flex-col">
      <Header />
      <BarraProductos />
      <main className="flex-grow flex flex-col items-center w-full py-8 px-4 sm:px-8 bg-vistas-home overflow-y-auto">
        <div className="w-full mx-auto bg-white p-8 rounded-2xl shadow-lg mt-8">
          <h2 className="text-3xl font-semibold text-black mb-6 text-center">Inventario de Tienda</h2>
          <p className="text-center text-black mb-8 text-xl">
            Gestión del inventario de productos. Puedes añadir nuevos productos, actualizar la cantidad de un producto existente o eliminarlo del inventario de la tienda.
          </p>

          <div className="flex justify-between items-center mb-6 gap-4">
            <input
              type="text"
              placeholder="Buscar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 w-full max-w-md text-xl text-black placeholder-gray-500"
            />
            <button
              onClick={handleOpenModal}
              className="bg-[#921913] hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md flex items-center space-x-2 text-xl"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Añadir Nuevo Producto</span>
            </button>
          </div>

          {isLoading ? (
            <p className="text-center text-gray-500 mt-8">Cargando inventario...</p>
          ) : filteredInventory.length > 0 ? (
            <div className="overflow-x-auto rounded-lg shadow-md max-h-[60vh]">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="py-3 px-4 text-left text-lg font-semibold text-black">ID Producto</th>
                    <th className="py-3 px-4 text-left text-lg font-semibold text-black">Producto</th>
                    <th className="py-3 px-4 text-left text-lg font-semibold text-black">Cantidad Disponible</th>
                    <th className="py-3 px-4 text-left text-lg font-semibold text-black">Tienda</th>
                    <th className="py-3 px-4 text-left text-lg font-semibold text-black">Última Actualización</th>
                    <th className="py-3 px-4 text-left text-lg font-semibold text-black">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInventory.map(item => (
                    <tr key={`${item.invTienIdInventarioTienda}-${item.prodIdProducto}`} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50 text-black text-base text-left">
                      <td className="py-3 px-4">{item.prodIdProducto}</td>
                      <td className="py-3 px-4">
                        <span className="flex items-center space-x-2 text-left"><Package className="w-4 h-4 text-gray-500" /><span>{item.producto}</span></span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="flex items-center space-x-2"><Boxes className="w-4 h-4 text-gray-500" /><span>{item.cantidadDisponible}</span></span>
                      </td>
                      <td className="py-3 px-4">
                        <span>{item.tienda}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span>{item.updatedAt}</span>
                      </td>
                      <td className="py-3 px-4 flex space-x-2">
                        <button onClick={() => handleEditClick(item)} className="text-blue-700 hover:text-blue-800"><Edit className="w-5 h-5" /></button>
                        <button onClick={() => handleDeleteProduct(item.invTienIdInventarioTienda, item.prodIdProducto)} className="text-[#921913] hover:text-red-700"><Trash2 className="w-5 h-5" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-8">No hay productos en el inventario de la tienda asignada a este empleado.</p>
          )}

          {isModalOpen && (
            <div className="fixed inset-0 flex justify-center items-center z-50">
              <div className="absolute inset-0 bg-gray-500/20 backdrop-blur-sm"></div>
              <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md mx-4 relative z-10">
                <h3 className="text-2xl font-bold text-black mb-6 text-center">
                  {editingProdId ? 'Editar Producto' : 'Añadir Nuevo Producto'}
                </h3>
                <div className="grid grid-cols-1 gap-4 mb-6">
                  <div className="flex flex-col">
                    <label htmlFor="product" className="text-xl font-medium text-black mb-1">Producto</label>
                    {editingProdId ? (
                      <input
                        id="product"
                        type="text"
                        value={editedProduct.product}
                        disabled
                        className="p-3 border border-gray-300 rounded-md bg-gray-100 text-black"
                      />
                    ) : (
                      <select
                        id="product"
                        value={newProduct.prodIdProducto}
                        onChange={(e) => setNewProduct({ ...newProduct, prodIdProducto: e.target.value })}
                        className="p-3 border border-gray-300 rounded-md text-black bg-white"
                      >
                        <option value="">Selecciona un producto</option>
                        {productos.map(p => (
                          <option key={p.prodIdProducto} value={p.prodIdProducto}>
                            {p.prodNombre}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="stock" className="text-xl font-medium text-black mb-1">Cantidad Disponible</label>
                    <input
                      id="stock"
                      type="number"
                      value={editingProdId ? editedProduct.stock : newProduct.invTienProdCantidad}
                      onChange={(e) => editingProdId ? setEditedProduct({ ...editedProduct, stock: parseInt(e.target.value) || 0 }) : setNewProduct({ ...newProduct, invTienProdCantidad: parseInt(e.target.value) || 0 })}
                      className="p-3 border border-gray-300 rounded-md text-black"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="location" className="text-xl font-medium text-black mb-1">Tienda</label>
                    <input
                      id="location"
                      type="text"
                      value={empleadoTiendaNombre}
                      disabled
                      className="p-3 border border-gray-300 rounded-md bg-gray-100 text-black"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-4 mt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 text-black text-xl flex items-center space-x-1"
                  >
                    <XCircle size={18} /> <span>Cancelar</span>
                  </button>
                  <button
                    onClick={editingProdId ? handleSaveEdit : handleAddProduct}
                    className="bg-[#921913] hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md flex items-center space-x-1 text-xl"
                  >
                    <Save size={18} /> <span>{editingProdId ? 'Guardar Cambios' : 'Guardar Producto'}</span>
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
                <p className="text-black text-center mb-6">¿Estás seguro de que quieres eliminar este producto del inventario?</p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={cancelDelete}
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