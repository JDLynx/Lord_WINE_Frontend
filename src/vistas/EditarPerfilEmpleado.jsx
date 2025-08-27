import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from '../components/BarraProductos';
import { User, Mail, Phone, Home, Edit, Store } from 'lucide-react';

export default function EditarPerfilEmpleado() {
    const navigate = useNavigate();
    const [employeeData, setEmployeeData] = useState({
        emplNombre: '',
        emplIdEmpleado: '',
        emplDireccion: '',
        emplTelefono: '',
        emplCorreoElectronico: '',
        tiendIdTiendaFisica: '',
        emplContrasena: '',
        adminCodAdministrador: 1,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchEmployeeData = async () => {
            const employeeCod = localStorage.getItem('employeeCod');
            if (!employeeCod) {
                setError('No hay código de empleado en localStorage. Redirigiendo al login...');
                setLoading(false);
                navigate("/login");
                return;
            }

            try {
                const resEmpleado = await fetch(`https://lord-wine-backend.onrender.com/api/empleados/${employeeCod}`);
                
                if (!resEmpleado.ok) {
                    const errorData = await resEmpleado.json();
                    throw new Error(errorData.message || "Error al obtener datos del empleado");
                }
                
                const empleadoJson = await resEmpleado.json();

                setEmployeeData({
                    emplNombre: empleadoJson.emplNombre || '',
                    emplIdEmpleado: empleadoJson.emplIdEmpleado || '',
                    emplDireccion: empleadoJson.emplDireccion || '',
                    emplTelefono: empleadoJson.emplTelefono || '',
                    emplCorreoElectronico: empleadoJson.emplCorreoElectronico || '',
                    tiendIdTiendaFisica: empleadoJson.tiendIdTiendaFisica?.toString() || '',
                    emplContrasena: empleadoJson.emplContrasena || '',
                    adminCodAdministrador: empleadoJson.adminCodAdministrador || 1,
                });

            } catch (err) {
                console.error(err);
                setError('Error al cargar datos del empleado.');
            } finally {
                setLoading(false);
            }
        };

        fetchEmployeeData();
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMessage('');

        const employeeCod = localStorage.getItem('employeeCod');
        if (!employeeCod) {
            setError('No hay código de empleado en localStorage.');
            setLoading(false);
            return;
        }
        
        const dataToSend = {
            emplIdEmpleado: employeeData.emplIdEmpleado,
            emplNombre: employeeData.emplNombre,
            emplDireccion: employeeData.emplDireccion,
            emplTelefono: employeeData.emplTelefono,
            emplCorreoElectronico: employeeData.emplCorreoElectronico,
            adminCodAdministrador: employeeData.adminCodAdministrador,
            tiendIdTiendaFisica: parseInt(employeeData.tiendIdTiendaFisica)
        };

        try {
            const res = await fetch(`https://lord-wine-backend.onrender.com/api/empleados/${employeeCod}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Error al actualizar empleado');
            }

            setSuccessMessage('¡Perfil de empleado actualizado exitosamente!');
            setTimeout(() => {
                navigate('/perfil-empleado');
            }, 1500);
        } catch (err) {
            console.error(err);
            setError(err.message || 'Error al actualizar el perfil.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <Header />
            <BarraProductos />
            <main
                className="flex-grow flex flex-col items-center w-full py-8 px-4 sm:px-8 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/img/Viñedo.jpg')" }}
            >
                <div className="max-w-4xl mx-auto w-full bg-white rounded-2xl shadow-lg p-8 sm:p-10">
                    <h1 className="text-2xl font-semibold text-black mb-8 text-center border-b pb-4 border-gray-200">
                        Editar Perfil de Empleado
                    </h1>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center p-10">
                            <AiOutlineLoading3Quarters className="w-12 h-12 text-red-600 animate-spin" />
                            <p className="mt-4 text-black text-lg">Cargando datos...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center text-red-600 font-bold mb-4">{error}</div>
                    ) : successMessage ? (
                        <div className="text-center text-green-600 font-bold mb-4">{successMessage}</div>
                    ) : (
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                            <div className="col-span-1">
                                <label htmlFor="emplNombre" className="block text-lg font-medium text-black mb-1">
                                    <User className="inline-block w-4 h-4 mr-2 text-[#921913]" />Nombre Completo
                                </label>
                                <input
                                    type="text"
                                    id="emplNombre"
                                    name="emplNombre"
                                    value={employeeData.emplNombre}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-base text-black"
                                    required
                                />
                            </div>

                            <div className="col-span-1">
                                <label htmlFor="emplIdEmpleado" className="block text-lg font-medium text-black mb-1">
                                    <User className="inline-block w-4 h-4 mr-2 text-[#921913]" />Identificación
                                </label>
                                <input
                                    type="text"
                                    id="emplIdEmpleado"
                                    name="emplIdEmpleado"
                                    value={employeeData.emplIdEmpleado}
                                    readOnly
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-base cursor-not-allowed text-black"
                                />
                            </div>

                            <div className="col-span-1">
                                <label htmlFor="emplDireccion" className="block text-lg font-medium text-black mb-1">
                                    <Home className="inline-block w-4 h-4 mr-2 text-[#921913]" />Dirección
                                </label>
                                <input
                                    type="text"
                                    id="emplDireccion"
                                    name="emplDireccion"
                                    value={employeeData.emplDireccion}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-base text-black"
                                    required
                                />
                            </div>

                            <div className="col-span-1">
                                <label htmlFor="emplTelefono" className="block text-lg font-medium text-black mb-1">
                                    <Phone className="inline-block w-4 h-4 mr-2 text-[#921913]" />Teléfono
                                </label>
                                <input
                                    type="tel"
                                    id="emplTelefono"
                                    name="emplTelefono"
                                    value={employeeData.emplTelefono}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-base text-black"
                                    required
                                />
                            </div>

                            <div className="col-span-1">
                                <label htmlFor="emplCorreoElectronico" className="block text-lg font-medium text-black mb-1">
                                    <Mail className="inline-block w-4 h-4 mr-2 text-[#921913]" />Correo Electrónico
                                </label>
                                <input
                                    type="email"
                                    id="emplCorreoElectronico"
                                    name="emplCorreoElectronico"
                                    value={employeeData.emplCorreoElectronico}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-base text-black"
                                    required
                                />
                            </div>

                            <div className="col-span-1">
                                <label htmlFor="tiendIdTiendaFisica" className="block text-lg font-medium text-black mb-1">
                                    <Store className="inline-block w-4 h-4 mr-2 text-[#921913]" />Código de Tienda
                                </label>
                                <input
                                    type="text"
                                    id="tiendIdTiendaFisica"
                                    name="tiendIdTiendaFisica"
                                    value={employeeData.tiendIdTiendaFisica}
                                    readOnly
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-base cursor-not-allowed text-black"
                                />
                            </div>

                            <div className="col-span-full flex justify-center space-x-6 mt-6">
                                <button
                                    type="submit"
                                    className="bg-[#921913] hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center space-x-2 text-lg"
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
                                    className="bg-gray-200 hover:bg-gray-300 text-black font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center space-x-2 text-lg"
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
    );
}