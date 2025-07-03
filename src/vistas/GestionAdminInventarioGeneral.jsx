import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";
import { User, Warehouse, Link, Unlink, PlusCircle, Edit, Trash2, Save, XCircle } from 'lucide-react';

export default function GestionAdminInventarioGeneral() {
  const [inventoryAssignments, setInventoryAssignments] = useState([]);
  const [administrators, setAdministrators] = useState([]);
  const [generalInventories, setGeneralInventories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  useEffect(() => {
    const simulatedAssignments = [
      { id: 'ASG001', adminId: 'ADM001', adminName: 'Juan Pérez', inventoryId: 'INVGEN001', inventoryName: 'Inventario de Vinos y Licores' },
      { id: 'ASG002', adminId: 'ADM002', adminName: 'María García', inventoryId: 'INVGEN002', inventoryName: 'Inventario de Accesorios' },
    ];
    const simulatedAdministrators = [
      { id: 'ADM001', name: 'Juan Pérez', role: 'SuperAdmin' },
      { id: 'ADM002', name: 'María García', role: 'AdminInventario' },
      { id: 'ADM003', name: 'Carlos Ruiz', role: 'AdminGeneral' },
    ];
    const simulatedInventories = [
      { id: 'INVGEN001', name: 'Inventario de Vinos y Licores' },
      { id: 'INVGEN002', name: 'Inventario de Accesorios' },
      { id: 'INVGEN003', name: 'Inventario de Zumos y Bebidas No Alc.' },
    ];

    setInventoryAssignments(simulatedAssignments);
    setAdministrators(simulatedAdministrators);
    setGeneralInventories(simulatedInventories);
  }, []);

  const handleAssign = () => {
    setSelectedAssignment({ id: '', adminId: '', inventoryId: '' });
    setIsModalOpen(true);
  };

  const handleEdit = (assignment) => {
    setSelectedAssignment({ ...assignment });
    setIsModalOpen(true);
  };

  const handleDelete = (assignmentId) => {
    if (window.confirm(`¿Estás seguro de que quieres desvincular esta asignación?`)) {
      setInventoryAssignments(inventoryAssignments.filter(assign => assign.id !== assignmentId));
      alert('Asignación desvinculada (simulada).');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { adminId, inventoryId } = selectedAssignment;

    if (!adminId || !inventoryId) {
      alert('Por favor, selecciona un administrador y un inventario.');
      return;
    }

    const admin = administrators.find(a => a.id === adminId);
    const inventory = generalInventories.find(i => i.id === inventoryId);

    if (selectedAssignment.id) {
      setInventoryAssignments(inventoryAssignments.map(assign =>
        assign.id === selectedAssignment.id ? { ...assign, adminId, inventoryId, adminName: admin.name, inventoryName: inventory.name } : assign
      ));
      alert('Asignación actualizada (simulada).');
    } else {
      const newId = `ASG${String(inventoryAssignments.length + 1).padStart(3, '0')}`;
      setInventoryAssignments([...inventoryAssignments, { id: newId, adminId, adminName: admin.name, inventoryId, inventoryName: inventory.name }]);
      alert('Nueva asignación creada (simulada).');
    }
    setIsModalOpen(false);
    setSelectedAssignment(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedAssignment(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="page-container">
        <Header />
        <BarraProductos />
        <main className="bg-vistas-home min-h-screen py-8 px-4 sm:px-8">
          <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-10">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">Gestión de Administrador por Inventario General</h1>
            <p className="text-center text-gray-600 text-lg mb-8">
              Visualiza y gestiona qué administrador es responsable de cada inventario general.
            </p>

            <div className="flex justify-end mb-6">
              <button
                onClick={handleAssign}
                className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-md shadow-md transition-colors duration-200 flex items-center space-x-2"
              >
                <Link size={20} />
                <span>Asignar Inventario</span>
              </button>
            </div>

            {inventoryAssignments.length > 0 ? (
              <div className="overflow-x-auto rounded-lg shadow-md">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-100 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">ID Asignación</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Administrador</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Inventario General</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {inventoryAssignments.map((assign) => (
                      <tr key={assign.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{assign.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{assign.adminName} ({assign.adminId})</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{assign.inventoryName} ({assign.inventoryId})</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-center space-x-3">
                            <button
                              onClick={() => handleEdit(assign)}
                              className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                              title="Editar Asignación"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(assign.id)}
                              className="text-red-600 hover:text-red-900 transition-colors duration-200"
                              title="Desvincular"
                            >
                              <Unlink size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-gray-500 mt-8">No hay asignaciones de inventario general registradas.</p>
            )}

            {isModalOpen && (
              <div className="fixed inset-0 flex justify-center items-center z-50">
                <div className="absolute inset-0 bg-gray-500/20 backdrop-blur-sm"></div>
                <div className="relative p-8 bg-white w-full max-w-md mx-auto rounded-lg shadow-xl z-10">
                  <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    {selectedAssignment.id ? 'Editar Asignación' : 'Nueva Asignación de Inventario'}
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="adminId" className="block text-gray-700 text-sm font-bold mb-2">Administrador:</label>
                      <select
                        id="adminId"
                        name="adminId"
                        value={selectedAssignment?.adminId || ''}
                        onChange={handleChange}
                        className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      >
                        <option value="">Selecciona un administrador</option>
                        {administrators.map(admin => (
                          <option key={admin.id} value={admin.id}>{admin.name} ({admin.role})</option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-6">
                      <label htmlFor="inventoryId" className="block text-gray-700 text-sm font-bold mb-2">Inventario General:</label>
                      <select
                        id="inventoryId"
                        name="inventoryId"
                        value={selectedAssignment?.inventoryId || ''}
                        onChange={handleChange}
                        className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      >
                        <option value="">Selecciona un inventario</option>
                        {generalInventories.map(inv => (
                          <option key={inv.id} value={inv.id}>{inv.name}</option>
                        ))}
                      </select>
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
                        type="submit"
                        className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-md flex items-center space-x-2 transition-colors duration-200"
                      >
                        <Save size={20} />
                        <span>{selectedAssignment.id ? 'Guardar Cambios' : 'Asignar'}</span>
                      </button>
                    </div>
                  </form>
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