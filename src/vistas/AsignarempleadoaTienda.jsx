import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from '../components/BarraProductos';

export default function AsignarEmpleadoaTienda() {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    // Estados para tiendas
    const [stores, setStores] = useState([]);
    const [storesLoading, setStoresLoading] = useState(true);

    const showNotification = (msg, type = 'success') => {
        setMessage(msg);
        setMessageType(type);
        setTimeout(() => {
        setMessage('');
        setMessageType('');
        }, 3000);
    };

    const fetchEmpleados = async () => {
        try {
        const res = await fetch('https://lord-wine-backend.onrender.com/api/empleados');
        const data = await res.json();
        setEmployees(data);
        } catch (error) {
        console.error('Error al cargar empleados:', error);
        showNotification('Error al cargar los empleados.', 'error');
        }
    };

    const fetchTiendas = async () => {
        setStoresLoading(true);
        try {
        const res = await fetch('https://lord-wine-backend.onrender.com/api/tiendas-fisicas');
        if (!res.ok) {
            throw new Error('Error al cargar las tiendas: ' + res.statusText);
        }
        const data = await res.json();
        const formattedData = data.map(store => ({
            tiendIdTiendaFisica: store.tiendIdTiendaFisica,
            tiendNombre: store.tiendNombre,
        }));
        setStores(formattedData);
        console.log("Tiendas cargadas correctamente:", formattedData);
        } catch (error) {
        console.error('Error al cargar tiendas:', error);
        showNotification('Error al cargar las tiendas disponibles.', 'error');
        } finally {
        setStoresLoading(false);
        }
    };

    useEffect(() => {
        fetchEmpleados();
        fetchTiendas();
    }, []);

    const handleStoreChange = async (employeeId, newStoreId) => {
        const updatedEmployees = employees.map(emp =>
        emp.emplCodEmpleado === employeeId ? { ...emp, emplCodTienda: newStoreId } : emp
        );
        setEmployees(updatedEmployees);

        try {
        const res = await fetch(`https://lord-wine-backend.onrender.com/api/empleados/${employeeId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ emplCodTienda: newStoreId }),
        });

        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || 'Error al actualizar el empleado.');
        }
        showNotification('Tienda del empleado actualizada correctamente.', 'success');
        } catch (error) {
        console.error('Error al actualizar tienda:', error);
        showNotification(`Error al actualizar tienda: ${error.message}`, 'error');
        fetchEmpleados();
        }
    };

    const filtered = employees.filter(emp =>
        Object.values(emp).some(value =>
        typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <div className="page-container min-h-screen flex flex-col">
        <Header />
        <BarraProductos />
        <main className="bg-vistas-home py-8 px-4 sm:px-8 flex-grow overflow-y-auto">
            <div className="w-full mx-auto bg-white rounded-2xl shadow-lg p-10 mt-8">
            <h1 className="text-2xl font-semibold text-black mb-2 text-center">Asignación de Empleados a Tiendas</h1>
            <p className="text-center text-black mb-8 text-xl">
                Asigna empleados a una tienda física seleccionando la opción en el menú desplegable.
            </p>

            {message && messageType === 'error' && (
                <div className={`fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 transition-opacity duration-300 ${
                messageType === 'error' ? 'bg-red-500 text-white' : ''
                }`}>
                {message}
                </div>
            )}

            <div className="flex justify-center mb-6">
                <input
                type="text"
                placeholder="Buscar"
                className="w-full max-w-xs border border-gray-300 rounded px-4 py-2 text-black text-left text-lg focus:border-black focus:outline-none"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="overflow-auto max-h-[60vh] shadow-md rounded">
                <table className="min-w-full bg-white text-black">
                <thead className="bg-gray-100 sticky top-0">
                    <tr>
                    <th className="px-4 py-2 text-left text-lg font-medium text-black">ID</th>
                    <th className="px-4 py-2 text-left text-lg font-medium text-black">Identificación</th>
                    <th className="px-4 py-2 text-left text-lg font-medium text-black">Nombre</th>
                    <th className="px-4 py-2 text-left text-lg font-medium text-black">ID Tienda</th>
                    <th className="px-4 py-2 text-left text-lg font-medium text-black">Tienda</th>
                    <th className="px-4 py-2 text-left text-lg font-medium text-black">Dirección</th>
                    <th className="px-4 py-2 text-left text-lg font-medium text-black">Teléfono</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map(emp => (
                    <tr key={emp.emplCodEmpleado}>
                        <td className="px-4 py-2 text-left text-base">{emp.emplCodEmpleado}</td>
                        <td className="px-4 py-2 text-left text-base">{emp.emplIdEmpleado}</td>
                        <td className="px-4 py-2 text-left whitespace-nowrap text-base">{emp.emplNombre}</td>
                        <td className="px-4 py-2 text-left text-base">{emp.emplCodTienda || 'N/A'}</td>
                        <td className="px-4 py-2 text-left text-base">
                        {storesLoading ? (
                            <p>Cargando...</p>
                        ) : (
                            <select
                            value={emp.emplCodTienda || ''}
                            onChange={(e) => handleStoreChange(emp.emplCodEmpleado, e.target.value)}
                            className="w-full border px-2 py-1 rounded text-black"
                            >
                            <option value="">Sin tienda</option>
                            {stores.map(store => (
                                <option key={store.tiendIdTiendaFisica} value={store.tiendIdTiendaFisica}>
                                {store.tiendNombre}
                                </option>
                            ))}
                            </select>
                        )}
                        </td>
                        <td className="px-4 py-2 text-left break-words max-w-[250px] whitespace-normal text-base">{emp.emplDireccion}</td>
                        <td className="px-4 py-2 text-left text-base">{emp.emplTelefono}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </div>
        </main>
        <Footer />
        </div>
    );
}
