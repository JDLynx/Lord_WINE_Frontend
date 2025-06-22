import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";
import { PlusCircle, Edit, Trash2, Save, XCircle, User, Briefcase, MapPin } from 'lucide-react';

export default function GestionEmpleados() {
  const [employees, setEmployees] = useState([]);
  const [stores, setStores] = useState([]); // For assigning employees to stores
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    // Simulate fetching employees and stores
    const simulatedEmployees = [
      { id: 'EMP001', nombre: 'Ana Gómez', cargo: 'Vendedor', telefono: '555-1111', tiendaAsignada: 'Tienda Centro' },
      { id: 'EMP002', nombre: 'Roberto Soto', cargo: 'Logística', telefono: '555-2222', tiendaAsignada: 'Tienda Norte' },
      { id: 'EMP003', nombre: 'Sofía Díaz', cargo: 'Inventario', telefono: '555-3333', tiendaAsignada: 'Tienda Sur' },
    ];
    const simulatedStores = ['Tienda Centro', 'Tienda Norte', 'Tienda Sur']; // Simulate store names for assignment

    setEmployees(simulatedEmployees);
    setStores(simulatedStores);
  }, []);

  const validateForm = (data) => {
    const errors = {};
    if (!data.nombre || data.nombre.trim() === '') errors.nombre = 'El nombre es obligatorio.';
    if (!data.cargo || data.cargo.trim() === '') errors.cargo = 'El cargo es obligatorio.';
    if (!data.telefono || data.telefono.trim() === '') errors.telefono = 'El teléfono es obligatorio.';
    // tiendaAsignada can be null for some employees initially
    return errors;
  };

  const handleCreateNew = () => {
    setCurrentEmployee({ id: '', nombre: '', cargo: '', telefono: '', tiendaAsignada: '' });
    setIsModalOpen(true);
    setFormErrors({});
  };

  const handleEdit = (employee) => {
    setCurrentEmployee({ ...employee });
    setIsModalOpen(true);
    setFormErrors({});
  };

  const handleDelete = (employeeId) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar al empleado con ID: ${employeeId}?`)) {
      setEmployees(employees.filter(emp => emp.id !== employeeId));
      alert('Empleado eliminado (simulado).');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(currentEmployee);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (currentEmployee.id) {
      // Update existing employee
      setEmployees(employees.map(emp =>
        emp.id === currentEmployee.id ? currentEmployee : emp
      ));
      alert('Empleado actualizado (simulado).');
    } else {
      // Create new employee
      const newId = `EMP${String(employees.length + 1).padStart(3, '0')}`;
      setEmployees([...employees, { ...currentEmployee, id: newId }]);
      alert('Nuevo empleado creado (simulado).');
    }
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEmployee(prev => ({ ...prev, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: undefined }));
  };

  return (
    <>
      <div className="page-container">
        <Header />
        <BarraProductos />
        <main className="bg-vistas-home min-h-screen py-8 px-4 sm:px-8">
          <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-10">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">Gestión de Empleados</h1>
            <p className="text-center text-gray-600 text-lg mb-8">
              Crea, edita y asigna empleados a tiendas físicas e inventarios.
            </p>

            <div className="flex justify-end mb-6">
              <button
                onClick={handleCreateNew}
                className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-md shadow-md transition-colors duration-200 flex items-center space-x-2"
              >
                <PlusCircle size={20} />
                <span>Nuevo Empleado</span>
              </button>
            </div>

            {employees.length > 0 ? (
              <div className="overflow-x-auto rounded-lg shadow-md">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-100 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Nombre</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Cargo</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Teléfono</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Tienda Asignada</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {employees.map((employee) => (
                      <tr key={employee.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{employee.nombre}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{employee.cargo}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{employee.telefono}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {employee.tiendaAsignada || 'No Asignada'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-center space-x-3">
                            <button
                              onClick={() => handleEdit(employee)}
                              className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                              title="Editar"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(employee.id)}
                              className="text-red-600 hover:text-red-900 transition-colors duration-200"
                              title="Eliminar"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-gray-500 mt-8">No hay empleados registrados.</p>
            )}

            {/* Modal para Crear/Editar Empleado */}
            {isModalOpen && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
                <div className="relative p-8 bg-white w-full max-w-md mx-auto rounded-lg shadow-xl">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    {currentEmployee.id ? 'Editar Empleado' : 'Crear Nuevo Empleado'}
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="nombre" className="block text-gray-700 text-sm font-bold mb-2">Nombre:</label>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={currentEmployee?.nombre || ''}
                        onChange={handleChange}
                        className={`shadow appearance-none border ${formErrors.nombre ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                      />
                      {formErrors.nombre && <p className="text-red-500 text-xs italic mt-1">{formErrors.nombre}</p>}
                    </div>
                    <div className="mb-4">
                      <label htmlFor="cargo" className="block text-gray-700 text-sm font-bold mb-2">Cargo:</label>
                      <input
                        type="text"
                        id="cargo"
                        name="cargo"
                        value={currentEmployee?.cargo || ''}
                        onChange={handleChange}
                        className={`shadow appearance-none border ${formErrors.cargo ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                      />
                      {formErrors.cargo && <p className="text-red-500 text-xs italic mt-1">{formErrors.cargo}</p>}
                    </div>
                    <div className="mb-4">
                      <label htmlFor="telefono" className="block text-gray-700 text-sm font-bold mb-2">Teléfono:</label>
                      <input
                        type="text"
                        id="telefono"
                        name="telefono"
                        value={currentEmployee?.telefono || ''}
                        onChange={handleChange}
                        className={`shadow appearance-none border ${formErrors.telefono ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                      />
                      {formErrors.telefono && <p className="text-red-500 text-xs italic mt-1">{formErrors.telefono}</p>}
                    </div>
                    <div className="mb-6">
                      <label htmlFor="tiendaAsignada" className="block text-gray-700 text-sm font-bold mb-2">Tienda Asignada:</label>
                      <select
                        id="tiendaAsignada"
                        name="tiendaAsignada"
                        value={currentEmployee?.tiendaAsignada || ''}
                        onChange={handleChange}
                        className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      >
                        <option value="">Sin Asignar</option>
                        {stores.map(store => (
                          <option key={store} value={store}>{store}</option>
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
                        <span>{currentEmployee.id ? 'Guardar Cambios' : 'Crear'}</span>
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