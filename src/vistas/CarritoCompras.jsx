// src/vistas/CarritoCompras.jsx
import React, { useState, useEffect } from "react";
import { ShoppingCart, Trash2, XCircle } from "lucide-react"; // Importar XCircle
import { AiOutlineLoading3Quarters } from 'react-icons/ai'; // Importar el spinner de react-icons
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";
import { usarCarrito } from '../context/ContextoCarrito';
import { Link } from 'react-router-dom';
import "./CarritoCompras.css";

export default function CarritoCompras() {
  const { itemsCarrito, eliminarDelCarrito, actualizarCantidad, vaciarCarrito, loading, error } = usarCarrito();
  const [mostrarModalPago, setMostrarModalPago] = useState(false);

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
    setMostrarModalPago(true);
  };

  const handleConfirmarPago = () => {
    alert("¡Pago simulado realizado con éxito! Gracias por tu compra.");
    vaciarCarrito();
    setMostrarModalPago(false);
  };

  return (
    <div className="page-container">
      <Header />
      <BarraProductos />

      {/* El main ahora siempre se renderiza, y el contenido dentro de él es condicional */}
      <main 
        className="flex-grow flex flex-col items-center w-full py-8 px-4 sm:px-8 bg-cover bg-center bg-no-repeat" 
        style={{ backgroundImage: "url('/img/Viñedo.jpg')" }} // Aplicar el fondo del viñedo aquí
      >
        <div className="max-w-6xl mx-auto w-full"> {/* Contenedor principal del contenido del carrito */}
          {loading ? (
            // Contenedor de carga dentro del main
            <div className="flex flex-col items-center justify-center p-10 min-h-[50vh] bg-white bg-opacity-80 rounded-lg shadow-lg">
              <AiOutlineLoading3Quarters className="w-16 h-16 text-red-600 animate-spin mb-4" />
              <p className="text-xl font-semibold text-gray-800">Cargando carrito...</p>
            </div>
          ) : error ? (
            // Contenedor de error dentro del main
            <div className="flex flex-col items-center justify-center p-10 min-h-[50vh] bg-white bg-opacity-80 rounded-lg shadow-lg">
              <XCircle className="w-16 h-16 text-red-600 mb-4" />
              <p className="text-xl font-semibold text-red-700">Error al cargar el carrito:</p>
              <p className="text-lg text-red-600 text-center max-w-md">{error}</p>
            </div>
          ) : (
            // Contenido normal del carrito
            <section className="container mx-auto mt-8 bg-white rounded-lg shadow-lg p-6">
              <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Tu Carrito de Compras</h1>

              {itemsCarrito.length === 0 ? (
                <div className="text-center text-gray-600 p-8">
                  <div className="flex justify-center items-center mb-4 text-red-500">
                    <ShoppingCart className="w-20 h-20" />
                  </div>
                  <h2 className="text-2xl font-semibold mb-2">Tu carrito está vacío</h2>
                  <p className="text-lg mb-6">Parece que aún no has agregado nada a tu carrito. ¡Explora nuestros productos!</p>
                  <Link
                    to="/"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-300"
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
                              className="ml-4 p-2 text-red-500 hover:text-red-700 transition duration-200 rounded-full hover:bg-red-100"
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
                        className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                      >
                        <Trash2 className="w-4 h-4 mr-2" /> Vaciar Carrito
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-1 bg-gray-50 p-6 rounded-lg shadow-md sticky top-4">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Resumen del Pedido</h2>
                    <div className="space-y-4">
                      <div className="flex justify-between text-gray-700">
                        <span>Subtotal:</span>
                        <span className="font-semibold">${total.toLocaleString('es-CO')}</span>
                      </div>
                      <div className="flex justify-between text-gray-700">
                        <span>Envío:</span>
                        <span className="font-semibold">Gratis</span>
                      </div>
                      <div className="border-t border-gray-300 pt-4 flex justify-between items-center text-xl font-bold text-gray-900">
                        <span>Total:</span>
                        <span className="text-red-700">${total.toLocaleString('es-CO')}</span>
                      </div>
                    </div>
                    <button
                      onClick={handleProcederPago}
                      className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-full shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Proceder al Pago
                    </button>
                  </div>
                </div>
              )}
            </section>
          )} {/* Cierre del condicional para loading/error/contenido normal */}
        </div>
      </main>

      {/* Modal de Pago */}
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
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Confirmar Pedido</h2>

            <div className="mb-6 border-b border-gray-200 pb-4">
              <h3 className="text-xl font-semibold text-gray-700 mb-3">Detalle del Pedido:</h3>
              {itemsCarrito.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-1">
                  <span className="text-gray-600">{item.name} (x{item.quantity})</span>
                  <span className="font-medium text-gray-800">${(item.price * item.quantity).toLocaleString('es-CO')}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center text-2xl font-bold text-black mb-6">
              <span>Total a Pagar:</span>
              <span className="text-green-700">${total.toLocaleString('es-CO')}</span>
            </div>

            <p className="text-center text-gray-600 mb-8">
              Esta es una simulación del proceso de pago. Al confirmar, tu pedido será procesado y el carrito se vaciará.
            </p>

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setMostrarModalPago(false)}
                className="px-6 py-3 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmarPago}
                className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Confirmar Pago
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
