import React, { useState, useEffect } from 'react';
import Header from '../components/Header'; // Adjust path if needed
import Footer from '../components/Footer'; // Adjust path if needed
import BarraProductos from "../components/BarraProductos"; // Adjust path if needed
import { X } from 'lucide-react'; // Assuming 'X' is from lucide-react. Adjust if it's from another library.

export default function CambiarContraseña() {

    // Estado para los datos del formulario
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    });

    // Estado para los errores de validación
    const [errors, setErrors] = useState({});
    // Estado para manejar si los datos del perfil se están cargando
    const [isLoading, setIsLoading] = useState(true); // Keep loading state
    // Estado para almacenar errores de carga del perfil
    const [profileLoadError, setProfileLoadError] = useState(null);

    // Function to validate the form
    const validateForm = () => {
        const newErrors = {};

        // Validation only applies if a new password is being entered
        if (formData.password) {
            if (formData.password.length < 6) {
                newErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
            }
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Las contraseñas no coinciden.';
            }
        } else {
            // If no password is provided, it's considered valid if not mandatory to change
            // If it *is* mandatory to enter a password here, you'd add an error like:
            // newErrors.password = 'Por favor, introduce una nueva contraseña.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    // useEffect to load admin details (mainly for adminCod, but can show loading)
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setProfileLoadError(null);

            const adminCod = localStorage.getItem('adminCodAdministrador');

            if (!adminCod) {
                console.error("No se encontró el adminCodAdministrador en localStorage.");
                setProfileLoadError("No se pudo cargar el perfil: ID de administrador no encontrado.");
                setIsLoading(false);
                return;
            }

            // In this component, we don't necessarily need to fetch the *full* profile data
            // since we are only changing the password. We primarily need adminCod.
            // However, keeping the fetch operation can confirm the adminCod is valid.
            try {
                const response = await fetch(`https://lord-wine-backend.onrender.com/api/administradores/${adminCod}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                // No need to set formData from fetched data, password fields should start empty.
                // const data = await response.json(); // If you need other data from here for the form, use it.
            } catch (error) {
                console.error("Error al verificar los datos del administrador:", error);
                setProfileLoadError("Hubo un error al verificar tu acceso. Por favor, inténtalo de nuevo.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    // Manejador de cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        // Limpiar el error cuando el usuario empieza a escribir
        if (errors[name]) {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
        }
    };

    // Manejador de envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            alert('Por favor, corrige los errores en el formulario.');
            return;
        }

        const adminCod = localStorage.getItem('adminCodAdministrador');

        if (!adminCod) {
            alert("No se pudo actualizar la contraseña: ID de administrador no encontrado.");
            return;
        }

        // Prepare data to send: ONLY the new password
        const dataToSave = {
            adminContrasena: formData.password, // IMPORTANT: Confirm this field name with your backend
        };

        // If password is empty, and it's optional, then maybe don't send the request.
        // But your form implies a password change, so it should be filled.
        if (!formData.password) {
            alert("Por favor, ingresa la nueva contraseña.");
            return;
        }

        console.log('Datos a guardar (contraseña):', dataToSave);

        try {
            const response = await fetch(`https://lord-wine-backend.onrender.com/api/administradores/${adminCod}`, {
                method: 'PUT', // Use PUT or PATCH depending on your API
                headers: {
                    'Content-Type': 'application/json',
                    // Include authentication headers if necessary (e.g., 'Authorization': `Bearer ${token}`)
                },
                body: JSON.stringify(dataToSave),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Error HTTP: ${response.status}`);
            }

            const result = await response.json();
            console.log('Contraseña actualizada con éxito:', result);
            alert('¡Contraseña actualizada con éxito!');

            window.history.back(); // Go back to the previous page (PerfilAdministrador)

        } catch (error) {
            console.error('Error al actualizar la contraseña:', error);
            alert(`Hubo un error al actualizar la contraseña: ${error.message || 'Error desconocido'}. Inténtalo de nuevo.`);
        }
    };

    // Function to go back to the previous page
    const handleGoBack = () => {
        window.history.back();
    };

    if (isLoading) {
        return (
            <>
                <Header />
                <BarraProductos />
                <main className="bg-vistas-home min-h-screen py-8 px-4 sm:px-8 flex justify-center items-center">
                    <p>Cargando información...</p>
                </main>
                <Footer />
            </>
        );
    }

    if (profileLoadError) {
        return (
            <>
                <Header />
                <BarraProductos />
                <main className="bg-vistas-home min-h-screen py-8 px-4 sm:px-8 flex justify-center items-center">
                    <p className="text-red-500">{profileLoadError}</p>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <div className="page-container">
                <Header />
                <BarraProductos />

                <main className="bg-vistas-home min-h-screen py-8 px-4 sm:px-8">
                    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-xl relative">
                        <button
                            onClick={handleGoBack}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
                            aria-label="Volver"
                        >
                            <X size={24} />
                        </button>

                        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Cambiar Contraseña de Administrador</h2>

                        <form onSubmit={handleSubmit}>

                            {/* Campo: password (Nueva Contraseña) */}
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                                    Nueva Contraseña:
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

                            {/* Campo: confirmPassword (Confirmar Contraseña) */}
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

                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
                                >
                                    Guardar Cambios
                                </button>
                                <button
                                    type="button"
                                    onClick={handleGoBack}
                                    className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
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