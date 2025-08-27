import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from '../components/BarraProductos';
import { User, Mail, Phone, Home, Edit, CreditCard } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

export default function EditarPerfilCliente() {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);
    const [clientData, setClientData] = useState({
        clNombre: '',
        clIdCliente: '',
        clDireccion: '',
        clTelefono: '',
        clCorreoElectronico: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchClientData = async () => {
            if (!user || user.role !== 'Cliente') {
                setError('No tienes permiso para ver esta página.');
                setLoading(false);
                setTimeout(() => {
                    logout();
                    navigate('/login');
                }, 2000);
                return;
            }

            const clienteId = user.id;
            console.log('1. ID de cliente obtenido del contexto:', clienteId);

            try {
                const apiUrl = `https://lord-wine-backend.onrender.com/api/clientes/${clienteId}`;
                console.log('2. Intentando obtener datos del cliente desde la URL:', apiUrl);
                const response = await fetch(apiUrl);

                console.log('3. Estado de la respuesta de la API:', response.status, response.statusText);

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('4. Error en la respuesta de la API:', errorText);
                    throw new Error(`Error al obtener datos del cliente: ${response.status} ${response.statusText} - ${errorText}`);
                }

                const data = await response.json();
                console.log('5. Datos recibidos de la API:', data);

                setClientData({
                    clNombre: data.clNombre || '',
                    clIdCliente: data.clIdCliente || '',
                    clDireccion: data.clDireccion || '',
                    clTelefono: data.clTelefono || '',
                    clCorreoElectronico: data.clCorreoElectronico || '',
                });
                console.log('6. Datos del cliente asignados al estado:', {
                    clNombre: data.clNombre || '',
                    clIdCliente: data.clIdCliente || '',
                    clDireccion: data.clDireccion || '',
                    clTelefono: data.clTelefono || '',
                    clCorreoElectronico: data.clCorreoElectronico || '',
                });

            } catch (error) {
                console.error("7. Error al cargar datos del cliente:", error);
                setError(error.message || 'Error al obtener datos del cliente. Verifique la consola para más detalles.');
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchClientData();
        }
    }, [user, navigate, logout]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClientData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMessage('');

        if (!user || user.role !== 'Cliente') {
            setError('No se encontró el ID del cliente para actualizar.');
            setLoading(false);
            return;
        }

        const clienteId = user.id;
        try {
            const response = await fetch(`https://lord-wine-backend.onrender.com/api/clientes/${clienteId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(clientData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al actualizar el perfil.');
            }

            setSuccessMessage('¡Perfil actualizado exitosamente!');
            setTimeout(() => {
                navigate('/perfil-cliente');
            }, 1500);

        } catch (err) {
            console.error("Error al actualizar el perfil:", err);
            setError(err.message || 'Hubo un error al actualizar el perfil.');
        } finally {
            setLoading(false);
        }
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
                        <h1 className="text-2xl font-semibold text-black mb-8 text-center border-b pb-4 border-gray-200">
                            Editar Perfil
                        </h1>

                        {loading ? (
                            <div className="flex flex-col items-center justify-center p-10">
                                <AiOutlineLoading3Quarters className="w-12 h-12 text-[#921913] animate-spin" />
                                <p className="mt-4 text-black text-lg">Cargando datos para edición...</p>
                            </div>
                        ) : error ? (
                            <div className="text-center text-[#921913] font-bold mb-4">{error}</div>
                        ) : successMessage ? (
                            <div className="text-center text-green-700 font-bold mb-4">{successMessage}</div>
                        ) : (
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                                <div className="col-span-1">
                                    <label htmlFor="clNombre" className="block text-lg font-medium text-black mb-1">
                                        <User className="inline-block w-4 h-4 mr-2 text-[#921913]" />Nombre Completo
                                    </label>
                                    <input
                                        type="text"
                                        id="clNombre"
                                        name="clNombre"
                                        value={clientData.clNombre}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#921913] focus:border-[#921913] text-base text-black"
                                        required
                                    />
                                </div>

                                <div className="col-span-1">
                                    <label htmlFor="clIdCliente" className="block text-lg font-medium text-black mb-1">
                                        <CreditCard className="inline-block w-4 h-4 mr-2 text-[#921913]" />Identificación
                                    </label>
                                    <input
                                        type="text"
                                        id="clIdCliente"
                                        name="clIdCliente"
                                        value={clientData.clIdCliente}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-base text-black cursor-not-allowed"
                                        readOnly
                                    />
                                </div>

                                <div className="col-span-1">
                                    <label htmlFor="clDireccion" className="block text-lg font-medium text-black mb-1">
                                        <Home className="inline-block w-4 h-4 mr-2 text-[#921913]" />Dirección
                                    </label>
                                    <input
                                        type="text"
                                        id="clDireccion"
                                        name="clDireccion"
                                        value={clientData.clDireccion}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-base text-black"
                                        required
                                    />
                                </div>

                                <div className="col-span-1">
                                    <label htmlFor="clTelefono" className="block text-lg font-medium text-black mb-1">
                                        <Phone className="inline-block w-4 h-4 mr-2 text-[#921913]" />Teléfono
                                    </label>
                                    <input
                                        type="tel"
                                        id="clTelefono"
                                        name="clTelefono"
                                        value={clientData.clTelefono}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-base text-black"
                                        required
                                    />
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="clCorreoElectronico" className="block text-lg font-medium text-black mb-1">
                                        <Mail className="inline-block w-4 h-4 mr-2 text-[#921913]" />Correo Electrónico
                                    </label>
                                    <input
                                        type="email"
                                        id="clCorreoElectronico"
                                        name="clCorreoElectronico"
                                        value={clientData.clCorreoElectronico}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-base text-black"
                                        required
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
                                        onClick={() => navigate('/perfil-cliente')}
                                        className="bg-white hover:bg-gray-300 text-black font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center space-x-2 text-lg"
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