import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from '../components/BarraProductos';
import { User, Mail, Phone, Home, Edit, Store } from 'lucide-react'; // Importa los íconos necesarios

export default function EditarPerfilEmpleado() {
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState({
    emplNombre: '',
    emplIdEmpleado: '',
    emplDireccion: '',
    emplTelefono: '',
    emplCorreoElectronico: '',
    emplCodTienda: '', // Asumo que el empleado está asociado a una tienda
    // No incluir emplCodEmpleado ya que es un ID
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Efecto para cargar los datos actuales del empleado al montar el componente
  useEffect(() => {
    const fetchEmployeeData = async () => {
      const employeeCod = localStorage.getItem('employeeCod');
      if (!employeeCod) {
        setError('No hay código de empleado en localStorage. Redirigiendo al login...');
        setLoading(false);
        navigate("/login"); // Redirige si no hay ID
        return;
      }

      // --- SIMULACIÓN DE CARGA DE DATOS (SIN BACKEND) ---
      console.log('Simulando carga de datos del empleado para edición...');
      setTimeout(() => {
        // Datos de ejemplo para simular la carga
        const simulatedData = {
          emplNombre: 'Juan Pérez',
          emplIdEmpleado: '123456789',
          emplDireccion: 'Calle Falsa 123, Ciudad',
          emplTelefono: '555-1234567',
          emplCorreoElectronico: 'juan.perez@example.com',
          emplCodTienda: 'T001',
        };
        setEmployeeData(simulatedData);
        setLoading(false);
        console.log('Datos de empleado simulados cargados:', simulatedData);
      }, 1000); // Simula 1 segundo de carga
      // --- FIN SIMULACIÓN ---
    };
    fetchEmployeeData();
  }, [navigate]); // Añadir navigate como dependencia si se usa dentro del useEffect

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Simula un estado de carga temporal para el UX
    setError('');
    setSuccessMessage('');

    // --- SIMULACIÓN DE ÉXITO AL GUARDAR (SIN BACKEND) ---
    console.log('Simulando guardado de cambios del perfil de empleado:', employeeData);
    
    setTimeout(() => {
      setSuccessMessage('¡Perfil de empleado actualizado exitosamente (simulado)!');
      setLoading(false); // Finaliza la simulación de carga

      // Redirige de vuelta al perfil del empleado después de un éxito simulado
      setTimeout(() => {
        navigate('/perfil-empleado');
      }, 1500); // Pequeño retraso para ver el mensaje
      
    }, 1000); // Simula 1 segundo de "guardado"
    // --- FIN SIMULACIÓN ---
  };

  return (
    <>
      <div className="flex flex-col min-h-screen overflow-x-hidden">
        <Header />
        <BarraProductos />

        <main
          className="flex-grow flex flex-col items-center w-full py-8 px-4 sm:px-8 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/img/Viñedo.jpg')" }}
        >
          <div className="max-w-4xl mx-auto w-full bg-white rounded-2xl shadow-lg p-8 sm:p-10">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center border-b pb-4 border-gray-200">
              Editar Perfil de Empleado
            </h1>

            {loading ? (
              <div className="flex flex-col items-center justify-center p-10">
                <AiOutlineLoading3Quarters className="w-12 h-12 text-red-600 animate-spin" />
                <p className="mt-4 text-gray-600 text-lg">Cargando datos para edición...</p>
              </div>
            ) : error ? (
              <div className="text-center text-red-600 font-bold mb-4">{error}</div>
            ) : successMessage ? (
              <div className="text-center text-green-600 font-bold mb-4">{successMessage}</div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                {/* Campo Nombre */}
                <div className="col-span-1">
                  <label htmlFor="emplNombre" className="block text-sm font-medium text-gray-700 mb-1">
                    <User className="inline-block w-4 h-4 mr-2 text-red-500" />Nombre Completo
                  </label>
                  <input
                    type="text"
                    id="emplNombre"
                    name="emplNombre"
                    value={employeeData.emplNombre}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-base text-gray-900"
                    required
                  />
                </div>

                {/* Campo Identificación (generalmente no editable) */}
                <div className="col-span-1">
                  <label htmlFor="emplIdEmpleado" className="block text-sm font-medium text-gray-700 mb-1">
                    <User className="inline-block w-4 h-4 mr-2 text-red-500" />Identificación
                  </label>
                  <input
                    type="text"
                    id="emplIdEmpleado"
                    name="emplIdEmpleado"
                    value={employeeData.emplIdEmpleado}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-base cursor-not-allowed text-gray-900"
                    readOnly // Generalmente la identificación no se edita
                  />
                </div>

                {/* Campo Dirección */}
                <div className="col-span-1">
                  <label htmlFor="emplDireccion" className="block text-sm font-medium text-gray-700 mb-1">
                    <Home className="inline-block w-4 h-4 mr-2 text-red-500" />Dirección
                  </label>
                  <input
                    type="text"
                    id="emplDireccion"
                    name="emplDireccion"
                    value={employeeData.emplDireccion}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-base text-gray-900"
                    required
                  />
                </div>

                {/* Campo Teléfono */}
                <div className="col-span-1">
                  <label htmlFor="emplTelefono" className="block text-sm font-medium text-gray-700 mb-1">
                    <Phone className="inline-block w-4 h-4 mr-2 text-red-500" />Teléfono
                  </label>
                  <input
                    type="tel"
                    id="emplTelefono"
                    name="emplTelefono"
                    value={employeeData.emplTelefono}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-base text-gray-900"
                    required
                  />
                </div>

                {/* Campo Correo Electrónico */}
                <div className="col-span-1">
                  <label htmlFor="emplCorreoElectronico" className="block text-sm font-medium text-gray-700 mb-1">
                    <Mail className="inline-block w-4 h-4 mr-2 text-red-500" />Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="emplCorreoElectronico"
                    name="emplCorreoElectronico"
                    value={employeeData.emplCorreoElectronico}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-base text-gray-900"
                    required
                  />
                </div>

                {/* Campo Código de Tienda (asumo que es editable o informativo) */}
                <div className="col-span-1">
                  <label htmlFor="emplCodTienda" className="block text-sm font-medium text-gray-700 mb-1">
                    <Store className="inline-block w-4 h-4 mr-2 text-red-500" />Código de Tienda
                  </label>
                  <input
                    type="text"
                    id="emplCodTienda"
                    name="emplCodTienda"
                    value={employeeData.emplCodTienda}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-base text-gray-900"
                    // Puedes hacerlo readOnly si no es editable por el empleado
                  />
                </div>

                {/* Botones de acción */}
                <div className="col-span-full flex justify-center space-x-6 mt-6">
                  <button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center space-x-2 text-lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <AiOutlineLoading3Quarters className="w-5 h-5 animate-spin" />
                    ) : (
                      <Edit className="w-5 h-5" />
                    )}
                    <span>{loading ? 'Guardando...' : 'Guardar Cambios'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/perfil-empleado')}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center space-x-2 text-lg"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}