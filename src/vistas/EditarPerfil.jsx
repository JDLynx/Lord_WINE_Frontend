import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";

export default function EditarPerfil() {
    const navigate = useNavigate();
    const location = useLocation();

    // Intentamos obtener los datos del perfil desde el estado de la ruta.
    // Si no existen (ej. el usuario entró directo por URL), inicializa con un objeto vacío o valores por defecto.
    // Para una funcionalidad netamente frontend sin backend, si no vienen datos,
    // simplemente no se cargarán "previamente" a menos que los simulemos.
    const initialProfileData = location.state?.currentProfileData || {
        adminCodAdministrador: 'COD001', // Valores por defecto o simulados
        adminIdAdministrador: 'ID12345',
        adminNombre: 'Administrador Demo',
        adminDireccion: 'Calle Ficticia 123',
        adminTelefono: '5551234567',
        adminCorreoElectronico: 'admin@example.com',
    };

    const [formData, setFormData] = useState({
        adminCodAdministrador: initialProfileData.adminCodAdministrador || '',
        adminIdAdministrador: initialProfileData.adminIdAdministrador || '',
        adminNombre: initialProfileData.adminNombre || '',
        adminDireccion: initialProfileData.adminDireccion || '',
        adminTelefono: initialProfileData.adminTelefono || '',
        adminCorreoElectronico: initialProfileData.adminCorreoElectronico || '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false); // Mantener para simular carga

    // En un escenario netamente frontend, si no vienen datos por location.state,
    // no haríamos un fetch. Los datos se basan en initialProfileData o lo que se ingrese.
    // El useEffect para cargar datos desde la API ya no es necesario aquí.
    useEffect(() => {
        // Si no hay datos iniciales pasados por la navegación,
        // podrías cargar datos "mock" si los tuvieras,
        // o simplemente el formulario se inicializa vacío/con defaults.
        // Aquí no hay una lógica de carga inicial desde "localStorage"
        // ya que simularíamos que los datos siempre vienen de la navegación
        // o son valores iniciales.
        // Si quieres simular un "estado guardado" en el navegador:
        const savedAdminData = JSON.parse(localStorage.getItem('currentAdminProfile')) || initialProfileData;
        setFormData((prevData) => ({
            ...prevData,
            ...savedAdminData,
            password: '', // Las contraseñas nunca se guardan en el estado para seguridad
            confirmPassword: '',
        }));
    }, [location.state]); // Depende solo de location.state para cargar datos al navegar.


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        if (errors[name]) {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
        }
    };

    const validateForm = () => {
        let newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{7,15}$/;

        if (!formData.adminCodAdministrador.trim()) newErrors.adminCodAdministrador = 'El código del administrador es requerido.';
        if (!formData.adminIdAdministrador.trim()) newErrors.adminIdAdministrador = 'La identificación es requerida.';
        if (!formData.adminNombre.trim()) newErrors.adminNombre = 'El nombre es requerido.';
        if (!formData.adminDireccion.trim()) newErrors.adminDireccion = 'La dirección es requerida.';
        if (!formData.adminTelefono.trim()) newErrors.adminTelefono = 'El teléfono es requerido.';
        if (!formData.adminCorreoElectronico.trim()) newErrors.adminCorreoElectronico = 'El correo electrónico es requerido.';

        if (formData.adminCorreoElectronico.trim() && !emailRegex.test(formData.adminCorreoElectronico)) {
            newErrors.adminCorreoElectronico = 'El correo electrónico no es válido.';
        }
        if (formData.adminTelefono.trim() && !phoneRegex.test(formData.adminTelefono)) {
            newErrors.adminTelefono = 'El teléfono debe contener solo números (7-15 dígitos).';
        }

        if (formData.password) {
            if (formData.password.length < 6) {
                newErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
            }
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Las contraseñas no coinciden.';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // --- FUNCIONALIDAD DE GUARDADO SIN BACKEND ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (!validateForm()) {
            alert('Por favor, corrige los errores en el formulario.');
            setIsLoading(false);
            return;
        }

        // --- SIMULACIÓN DE GUARDADO (SIN BACKEND) ---
        // Guardamos los datos actualizados en localStorage para que PerfilAdministrador los pueda "leer".
        // Esto simula una persistencia a nivel de navegador.
        const dataToPersist = { ...formData };
        delete dataToPersist.password; // No guardar la contraseña en localStorage
        delete dataToPersist.confirmPassword;

        localStorage.setItem('currentAdminProfile', JSON.stringify(dataToPersist));

        // Simulamos un retraso para que se vea el estado de "Guardando..."
        await new Promise(resolve => setTimeout(resolve, 1000)); 

        alert('Perfil actualizado con éxito (simulado)!');
        setIsLoading(false);

        // Redirigimos a PerfilAdministrador y pasamos los datos actualizados
        // para que PerfilAdministrador pueda tomarlos de 'location.state'
        navigate('/perfil', { 
            state: { 
                currentProfileData: dataToPersist, // Pasamos los datos que "guardamos"
                profileUpdated: true // Indicador para que PerfilAdministrador sepa que hubo una actualización
            } 
        });
    };
    // --- FIN FUNCIONALIDAD DE GUARDADO SIN BACKEND ---

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                navigate('/perfil-administrador');
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => {
            window.removeEventListener('keydown', handleEscape);
        };
    }, [navigate]);

    return (
        <>
            <div className="page-container">
                <Header />
                <BarraProductos />

                <main className="bg-vistas-home min-h-screen py-8 px-4 sm:px-8">
                    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
                        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Editar Perfil de Administrador</h2>

                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                <div className="mb-4">
                                    <label htmlFor="adminCodAdministrador" className="block text-gray-700 text-sm font-bold mb-2">
                                        Código del Administrador:
                                    </label>
                                    <input
                                        type="text"
                                        id="adminCodAdministrador"
                                        name="adminCodAdministrador"
                                        value={formData.adminCodAdministrador}
                                        onChange={handleChange}
                                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 ${errors.adminCodAdministrador ? 'border-red-500' : 'focus:ring-red-500'}`}
                                        readOnly
                                        required
                                    />
                                    {errors.adminCodAdministrador && <p className="text-red-500 text-xs italic mt-1">{errors.adminCodAdministrador}</p>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="adminIdAdministrador" className="block text-gray-700 text-sm font-bold mb-2">
                                        Identificación del Administrador:
                                    </label>
                                    <input
                                        type="text"
                                        id="adminIdAdministrador"
                                        name="adminIdAdministrador"
                                        value={formData.adminIdAdministrador}
                                        onChange={handleChange}
                                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 ${errors.adminIdAdministrador ? 'border-red-500' : 'focus:ring-red-500'}`}
                                        required
                                    />
                                    {errors.adminIdAdministrador && <p className="text-red-500 text-xs italic mt-1">{errors.adminIdAdministrador}</p>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="adminNombre" className="block text-gray-700 text-sm font-bold mb-2">
                                        Nombre Completo:
                                    </label>
                                    <input
                                        type="text"
                                        id="adminNombre"
                                        name="adminNombre"
                                        value={formData.adminNombre}
                                        onChange={handleChange}
                                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 ${errors.adminNombre ? 'border-red-500' : 'focus:ring-red-500'}`}
                                        required
                                    />
                                    {errors.adminNombre && <p className="text-red-500 text-xs italic mt-1">{errors.adminNombre}</p>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="adminDireccion" className="block text-gray-700 text-sm font-bold mb-2">
                                        Dirección:
                                    </label>
                                    <input
                                        type="text"
                                        id="adminDireccion"
                                        name="adminDireccion"
                                        value={formData.adminDireccion}
                                        onChange={handleChange}
                                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 ${errors.adminDireccion ? 'border-red-500' : 'focus:ring-red-500'}`}
                                        required
                                    />
                                    {errors.adminDireccion && <p className="text-red-500 text-xs italic mt-1">{errors.adminDireccion}</p>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="adminTelefono" className="block text-gray-700 text-sm font-bold mb-2">
                                        Teléfono:
                                    </label>
                                    <input
                                        type="text"
                                        id="adminTelefono"
                                        name="adminTelefono"
                                        value={formData.adminTelefono}
                                        onChange={handleChange}
                                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 ${errors.adminTelefono ? 'border-red-500' : 'focus:ring-500'}`}
                                        required
                                    />
                                    {errors.adminTelefono && <p className="text-red-500 text-xs italic mt-1">{errors.adminTelefono}</p>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="adminCorreoElectronico" className="block text-gray-700 text-sm font-bold mb-2">
                                        Correo Electrónico:
                                    </label>
                                    <input
                                        type="email"
                                        id="adminCorreoElectronico"
                                        name="adminCorreoElectronico"
                                        value={formData.adminCorreoElectronico}
                                        onChange={handleChange}
                                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 ${errors.adminCorreoElectronico ? 'border-red-500' : 'focus:ring-red-500'}`}
                                        required
                                    />
                                    {errors.adminCorreoElectronico && <p className="text-red-500 text-xs italic mt-1">{errors.adminCorreoElectronico}</p>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                                        Nueva Contraseña: (Opcional, dejar en blanco para no cambiar)
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500' : 'focus:ring-red-500'}`}
                                    />
                                    {errors.password && <p className="text-red-500 text-xs italic mt-1">{errors.password}</p>}
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
                                        Confirmar Contraseña:
                                    </label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 ${errors.confirmPassword ? 'border-red-500' : 'focus:ring-red-500'}`}
                                    />
                                    {errors.confirmPassword && <p className="text-red-500 text-xs italic mt-1">{errors.confirmPassword}</p>}
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-6">
                                <button
                                    type="submit"
                                    className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Guardando...' : 'Guardar Cambios'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => navigate('/perfil')} // Botón de cancelar que regresa a la vista de perfil
                                    className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
                                    disabled={isLoading}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}