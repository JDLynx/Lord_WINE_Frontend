import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from '../components/BarraProductos';
import { PlusCircle, Edit, Trash2, Save, XCircle } from 'lucide-react';

export default function GestionEmpleados() {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchEmpleados();
  }, []);

  const fetchEmpleados = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/empleados');
      const data = await res.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error al cargar empleados:', error);
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.emplNombre) errors.emplNombre = 'El nombre es obligatorio.';
    if (!data.emplIdEmpleado) errors.emplIdEmpleado = 'El documento es obligatorio.';
    if (!data.emplDireccion) errors.emplDireccion = 'La dirección es obligatoria.';
    if (!data.emplTelefono) errors.emplTelefono = 'El teléfono es obligatorio.';
    if (!data.emplCorreoElectronico) {
      errors.emplCorreoElectronico = 'El correo es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(data.emplCorreoElectronico)) {
      errors.emplCorreoElectronico = 'Correo inválido.';
    }

    if (!data.emplCodEmpleado && !data.emplContrasena?.trim()) {
      errors.emplContrasena = 'La contraseña es obligatoria.';
    } else if (!data.emplCodEmpleado && data.emplContrasena.length < 6) {
      errors.emplContrasena = 'La contraseña debe tener al menos 6 caracteres.';
    }

    return errors;
  };

  const handleCreateNew = () => {
    setCurrentEmployee({
      emplIdEmpleado: '',
      emplNombre: '',
      emplDireccion: '',
      emplTelefono: '',
      emplCorreoElectronico: '',
      emplContrasena: '',
      adminCodAdministrador: 1,
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleEdit = (employee) => {
    setCurrentEmployee({ ...employee, emplContrasena: '' });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este empleado?')) {
      try {
        await fetch(`http://localhost:3000/api/empleados/${id}`, {
          method: 'DELETE',
        });
        fetchEmpleados();
        alert('Empleado eliminado correctamente.');
      } catch (error) {
        console.error('Error al eliminar:', error);
        alert('Hubo un error al eliminar el empleado.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(currentEmployee);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const method = currentEmployee.emplCodEmpleado ? 'PUT' : 'POST';
      const url = currentEmployee.emplCodEmpleado
        ? `http://localhost:3000/api/empleados/${currentEmployee.emplCodEmpleado}`
        : 'http://localhost:3000/api/empleados';

      const body = {
        ...currentEmployee,
        ...(method === 'POST' && { emplContrasena: currentEmployee.emplContrasena?.trim() }),
        adminCodAdministrador: currentEmployee.adminCodAdministrador || 1,
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error('Error en la solicitud');
      alert(currentEmployee.emplCodEmpleado ? 'Empleado actualizado' : 'Empleado creado');
      fetchEmpleados();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error al guardar empleado:', error);
      alert('Error al guardar el empleado.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEmployee(prev => ({ ...prev, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const filtered = employees.filter(emp =>
    emp.emplNombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      <Header />
      <BarraProductos />
      <main className="bg-vistas-home min-h-screen py-8 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-10">
          <h1 className="text-2xl font-semibold text-black mb-8 text-center">
            Gestión de Empleados
          </h1>

          <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-6 gap-4">
            <input
              type="text"
              placeholder="Buscar por nombre"
              className="w-full max-w-xs border border-gray-300 rounded px-4 py-2 text-black text-left text-lg"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <button
              onClick={handleCreateNew}
              className="bg-[#921913] hover:bg-[#801010] text-white font-bold py-2 px-4 rounded-md shadow-md flex items-center space-x-2 text-lg"
            >
              <PlusCircle size={20} />
              <span>Nuevo Empleado</span>
            </button>
          </div>

          <div className="overflow-auto max-h-[60vh] shadow-md rounded">
            <table className="min-w-full bg-white text-black">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="px-4 py-2 text-left text-lg font-medium text-black">ID</th>
                  <th className="px-4 py-2 text-left text-lg font-medium text-black">Identificación</th>
                  <th className="px-4 py-2 text-left text-lg font-medium text-black">Nombre</th>
                  <th className="px-4 py-2 text-left text-lg font-medium text-black">Dirección</th>
                  <th className="px-4 py-2 text-left text-lg font-medium text-black">Correo electrónico</th>
                  <th className="px-4 py-2 text-left text-lg font-medium text-black">Teléfono</th>
                  <th className="px-4 py-2 text-center text-lg font-medium text-black">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(emp => (
                  <tr key={emp.emplCodEmpleado} className="border-b">
                    <td className="px-4 py-2 text-left text-base">{emp.emplCodEmpleado}</td>
                    <td className="px-4 py-2 text-left text-base">{emp.emplIdEmpleado}</td>
                    <td className="px-4 py-2 text-left whitespace-nowrap text-base">{emp.emplNombre}</td>
                    <td className="px-4 py-2 text-left break-words max-w-[250px] whitespace-normal text-base">{emp.emplDireccion}</td>
                    <td className="px-4 py-2 text-left text-base">{emp.emplCorreoElectronico}</td>
                    <td className="px-4 py-2 text-left text-base">{emp.emplTelefono}</td>
                    <td className="px-4 py-2 text-center">
                      <div className="flex justify-center gap-4">
                        <button onClick={() => handleEdit(emp)} className="text-[#1D4ED8] hover:text-blue-700">
                          <Edit size={18} />
                        </button>
                        <button onClick={() => handleDelete(emp.emplCodEmpleado)} className="text-[#921913] hover:text-[#801010]">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 flex justify-center items-center z-50">
              <div className="absolute inset-0 bg-gray-500/20 backdrop-blur-sm"></div>
              <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative z-10">
                <h2 className="text-xl font-bold text-center mb-4 text-black">
                  {currentEmployee.emplCodEmpleado ? 'Editar Empleado' : 'Nuevo Empleado'}
                </h2>
                <form onSubmit={handleSubmit}>
                  <input type="text" name="emplIdEmpleado" placeholder="Documento" value={currentEmployee.emplIdEmpleado}
                    onChange={handleChange} className="w-full mb-3 border px-3 py-2 rounded text-black" />
                  {formErrors.emplIdEmpleado && <p className="text-red-500 text-sm">{formErrors.emplIdEmpleado}</p>}

                  <input type="text" name="emplNombre" placeholder="Nombre" value={currentEmployee.emplNombre}
                    onChange={handleChange} className="w-full mb-3 border px-3 py-2 rounded text-black" />
                  {formErrors.emplNombre && <p className="text-red-500 text-sm">{formErrors.emplNombre}</p>}

                  <input type="text" name="emplDireccion" placeholder="Dirección" value={currentEmployee.emplDireccion}
                    onChange={handleChange} className="w-full mb-3 border px-3 py-2 rounded text-black" />
                  {formErrors.emplDireccion && <p className="text-red-500 text-sm">{formErrors.emplDireccion}</p>}

                  <input type="text" name="emplTelefono" placeholder="Teléfono" value={currentEmployee.emplTelefono}
                    onChange={handleChange} className="w-full mb-3 border px-3 py-2 rounded text-black" />
                  {formErrors.emplTelefono && <p className="text-red-500 text-sm">{formErrors.emplTelefono}</p>}

                  <input type="email" name="emplCorreoElectronico" placeholder="Correo electrónico" value={currentEmployee.emplCorreoElectronico}
                    onChange={handleChange} className="w-full mb-3 border px-3 py-2 rounded text-black" />
                  {formErrors.emplCorreoElectronico && <p className="text-red-500 text-sm">{formErrors.emplCorreoElectronico}</p>}

                  {!currentEmployee.emplCodEmpleado && (
                    <>
                      <input type="password" name="emplContrasena" placeholder="Contraseña"
                        value={currentEmployee.emplContrasena}
                        onChange={handleChange}
                        className="w-full mb-3 border px-3 py-2 rounded text-black" />
                      {formErrors.emplContrasena && <p className="text-red-500 text-sm">{formErrors.emplContrasena}</p>}
                    </>
                  )}

                  <div className="flex justify-end gap-4 mt-4">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 text-black">
                      <XCircle size={18} className="inline mr-1" /> Cancelar
                    </button>
                    <button type="submit" className="bg-[#921913] text-white px-4 py-2 rounded hover:bg-[#801010]">
                      <Save size={18} className="inline mr-1" /> {currentEmployee.emplCodEmpleado ? 'Guardar' : 'Crear'}
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
  );
}