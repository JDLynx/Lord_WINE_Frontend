import React, { useState, useContext } from "react";
import { ShoppingCart, Trash2, XCircle } from "lucide-react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";
import { usarCarrito } from '../context/ContextoCarrito';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import "./CarritoCompras.css";

export default function CarritoCompras() {
    const { itemsCarrito, eliminarDelCarrito, actualizarCantidad, vaciarCarrito } = usarCarrito();
    const { user } = useContext(AuthContext);
    const [mostrarModalPago, setMostrarModalPago] = useState(false);
    const [mostrarModalExitoPago, setMostrarModalExitoPago] = useState(false);
    const [mostrarModalQR, setMostrarModalQR] = useState(false);
    const [mensajeError, setMensajeError] = useState("");

    const total = itemsCarrito.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const handleActualizarCantidad = (productoId, event) => {
        const nuevaCantidad = parseInt(event.target.value);
        if (!isNaN(nuevaCantidad) && nuevaCantidad >= 0) {
            actualizarCantidad(productoId, nuevaCantidad);
        }
    };

    const handleProcederPago = () => {
        if (!user) {
            setMensajeError("Debes iniciar sesión para realizar un pedido.");
            return;
        }
        if (user.role !== 'Cliente') {
            setMensajeError("Acceso denegado. Solo los clientes pueden realizar pedidos.");
            return;
        }

        setMostrarModalPago(true);
    };

    const handleConfirmarPago = async () => {
        setMostrarModalPago(false);
        setMostrarModalQR(true);
    };

    const handleFinalizarPagoQR = async () => {
        const backendUrl = "https://lord-wine-backend.onrender.com";
        const token = localStorage.getItem("token");

        if (!user || !token) {
            setMensajeError("No se pudo obtener el token de autenticación. Por favor, inicia sesión de nuevo.");
            setMostrarModalQR(false);
            return;
        }

        const pedidoData = {
            clCodCliente: user.id,
            serIdServicioEmpresarial: 1,
            items: itemsCarrito.map(item => ({
                prodIdProducto: item.id,
                cantidad: item.quantity
            }))
        };

        try {
            const response = await fetch(`${backendUrl}/api/pedidos/crear-desde-carrito`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(pedidoData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (response.status === 403) {
                    throw new Error(errorData.error || "Acceso denegado. Solo los clientes pueden realizar pedidos.");
                }
                throw new Error(errorData.error || "Ocurrió un error al procesar el pedido.");
            }

            const resultado = await response.json();
            console.log("Pedido creado exitosamente:", resultado);

            vaciarCarrito();
            setMostrarModalQR(false);
            setMostrarModalExitoPago(true);
            setMensajeError("");
        } catch (error) {
            console.error("Error al confirmar el pago:", error);
            setMensajeError(error.message);
        }
    };
    
    const isClient = user?.role === 'Cliente';

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <BarraProductos />

            <main
                className="flex-grow flex flex-col items-center justify-center w-full py-8 px-4 sm:px-8 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/img/Viñedo.jpg')" }}
            >
                <div
                    className="p-6 shadow-lg rounded-2xl w-full max-w-5xl md:w-3/4 lg:w-2/3"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                >
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h1 className="text-3xl font-semibold text-center mb-8 text-black">Tu Carrito de Compras</h1>
                        {itemsCarrito.length === 0 ? (
                            <div className="text-center text-gray-600 p-8">
                                <div className="flex justify-center items-center mb-4 text-[#921913]">
                                    <ShoppingCart className="w-20 h-20" />
                                </div>
                                <h2 className="text-2xl font-semibold mb-2 text-[#921913]">Tu carrito está vacío</h2>
                                <p className="text-lg mb-6 text-black">Parece que aún no has agregado nada a tu carrito. ¡Explora nuestros productos!</p>
                                <Link
                                    to="/"
                                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-[#921913] hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-300"
                                >
                                    Ir a la Tienda
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 space-y-6">
                                    {itemsCarrito.map((item) => (
                                        <div key={item.id} className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-24 h-24 object-cover rounded-md mr-6 border border-gray-200"
                                            />
                                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2 items-center">
                                                <div>
                                                    <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                                                    <p className="text-gray-600 text-sm">{item.presentation}</p>
                                                </div>
                                                <div className="flex items-center justify-end md:justify-start">
                                                    <span className="text-lg font-bold text-blue-600 mr-4">${(item.price * item.quantity).toLocaleString('es-CO')}</span>
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        value={item.quantity}
                                                        onChange={(e) => handleActualizarCantidad(item.id, e)}
                                                        className="w-20 text-center border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                                                    />
                                                    <button
                                                        onClick={() => eliminarDelCarrito(item.id)}
                                                        className="ml-4 p-2 text-[#921913] hover:text-red-700 transition duration-200 rounded-full hover:bg-red-100"
                                                        title="Eliminar producto"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="flex justify-end mt-6">
                                        <button
                                            onClick={vaciarCarrito}
                                            className="flex items-center px-4 py-2 bg-[#921913] text-white rounded-md hover:bg-red-700 transition duration-300 text-xl"
                                        >
                                            <Trash2 className="w-4 h-4 mr-2" /> Vaciar Carrito
                                        </button>
                                    </div>
                                </div>

                                <div className="lg:col-span-1 bg-gray-50 p-6 rounded-lg shadow-md sticky top-4">
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Resumen del Pedido</h2>
                                    <div className="space-y-4">
                                        <div className="flex justify-between text-black">
                                            <span>Subtotal:</span>
                                            <span className="font-semibold">${total.toLocaleString('es-CO')}</span>
                                        </div>
                                        <div className="flex justify-between text-black">
                                            <span>Envío:</span>
                                            <span className="font-semibold">Gratis</span>
                                        </div>
                                        <div className="border-t border-gray-300 pt-4 flex justify-between items-center text-xl font-bold text-black">
                                            <span>Total:</span>
                                            <span className="text-[#921913]">${total.toLocaleString('es-CO')}</span>
                                        </div>
                                    </div>
                                    {isClient ? (
                                        <button
                                            onClick={handleProcederPago}
                                            className="mt-8 w-full bg-green-700 hover:bg-green-600 text-white font-semibold py-3 rounded-full shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                        >
                                            Confirmar Pedido
                                        </button>
                                    ) : (
                                        <div className="mt-8 text-center p-3 rounded-lg border border-red-400 bg-red-100 text-red-700">
                                            <p className="font-semibold">Solo los clientes pueden confirmar pedidos.</p>
                                            <p>Por favor, inicia sesión con una cuenta de cliente.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        {mensajeError && (
                            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                                <p className="font-bold">Error:</p>
                                <p>{mensajeError}</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {mostrarModalPago && (
                <div className="fixed inset-0 flex justify-center items-center z-50">
                    <div className="absolute inset-0 bg-gray-500/20 backdrop-blur-sm"></div>
                    <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full relative z-10">
                        <button
                            onClick={() => setMostrarModalPago(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition duration-200"
                            title="Cerrar"
                        >
                            <XCircle className="w-6 h-6" />
                        </button>
                        <h2 className="text-3xl font-semibold text-black mb-6 text-center">Confirmar Pedido</h2>
                        <div className="mb-6 border-b border-gray-200 pb-4">
                            <h3 className="text-xl font-semibold text-black mb-3">Detalle del Pedido:</h3>
                            {itemsCarrito.map((item) => (
                                <div key={item.id} className="flex justify-between items-center py-1">
                                    <span className="text-black">{item.name} (x{item.quantity})</span>
                                    <span className="font-medium text-black">${(item.price * item.quantity).toLocaleString('es-CO')}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between items-center text-2xl font-semibold text-black mb-6">
                            <span>Total a Pagar:</span>
                            <span className="text-green-700">${total.toLocaleString('es-CO')}</span>
                        </div>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={() => setMostrarModalPago(false)}
                                className="px-6 py-3 bg-gray-300 text-black rounded-full hover:bg-gray-400 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleConfirmarPago}
                                className="px-6 py-3 bg-green-700 text-white rounded-full hover:bg-green-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                Confirmar Pedido
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {mostrarModalQR && (
                <div className="fixed inset-0 flex justify-center items-center z-50">
                    <div className="absolute inset-0 bg-gray-500/20 backdrop-blur-sm"></div>
                    <div className="bg-white rounded-lg shadow-xl p-8 max-w-sm w-full relative z-10">
                        <button
                            onClick={() => setMostrarModalQR(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition duration-200"
                            title="Cerrar"
                        >
                            <XCircle className="w-6 h-6" />
                        </button>
                        <h2 className="text-3xl font-bold text-black mb-6 text-center">LordWine Nequi</h2>
                        <div className="flex justify-center mb-6">
                            <div className="p-4 border-2 border-gray-300 rounded-lg">
                                <img src="/img/QR_Nequi.jpg" alt="Código QR de Pago" className="w-48 h-48" />
                            </div>
                        </div>
                        <button
                            onClick={handleFinalizarPagoQR}
                            className="mt-4 w-full bg-[#921913] text-white font-semibold py-3 rounded-full hover:bg-red-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            Finalizar Pedido
                        </button>
                    </div>
                </div>
            )}

            {mostrarModalExitoPago && (
                <div className="fixed inset-0 flex justify-center items-center z-50">
                    <div className="absolute inset-0 bg-gray-500/20 backdrop-blur-sm"></div>
                    <div className="bg-white rounded-lg shadow-xl p-8 max-w-sm w-full relative z-10 text-center">
                        <h2 className="text-2xl font-semibold text-green-700 mb-4">¡Pedido Exitoso!</h2>
                        <p className="text-black mb-6">Gracias por tu compra. Tu pedido ha sido procesado.</p>
                        <button
                            onClick={() => setMostrarModalExitoPago(false)}
                            className="px-6 py-3 bg-green-700 text-white rounded-full hover:bg-green-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}