import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from '../components/BarraProductos';
import { ShoppingCart, PlusCircle, MinusCircle, Trash2, CheckCircle, Package } from 'lucide-react';

export default function MiCarrito() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Simular carga de ítems del carrito al inicio
    const simulatedCart = [
      { id: 1, name: 'Vino Tinto Reserva', price: 15.99, quantity: 2, imageUrl: 'https://placehold.co/100x100/F0F0F0/000000?text=Vino' },
      { id: 2, name: 'Crema de Whisky Clásica', price: 22.50, quantity: 1, imageUrl: 'https://placehold.co/100x100/D0D0D0/000000?text=Whisky' },
    ];
    setCartItems(simulatedCart);
  }, []);

  useEffect(() => {
    // Calcular el precio total cada vez que los ítems del carrito cambian
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotalPrice(total);
  }, [cartItems]);

  const handleQuantityChange = (id, delta) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto del carrito?')) {
      setCartItems(prevItems => prevItems.filter(item => item.id !== id));
      alert('Producto eliminado del carrito (simulado).');
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Tu carrito está vacío. Agrega productos antes de continuar.');
      return;
    }
    alert(`Procesando compra por $${totalPrice.toFixed(2)} (simulado). Redirigiendo a la pasarela de pago...`);
    setCartItems([]); // Vaciar el carrito después de "comprar"
  };

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      <BarraProductos />
      <main 
        className="flex-grow flex flex-col items-center w-full py-8 px-4 sm:px-8 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/img/Viñedo.jpg')" }}
      >
        <div className="max-w-4xl mx-auto w-full bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-red-600 mb-6 text-center flex items-center justify-center space-x-2">
            <ShoppingCart className="w-8 h-8 text-red-600" />
            <span>Mi Carrito de Compras</span>
          </h2>
          
          {cartItems.length > 0 ? (
            <>
              <div className="space-y-4 mb-8">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm">
                    <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md mr-4" />
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-gray-600">${item.price.toFixed(2)} c/u</p>
                    </div>
                    <div className="flex items-center space-x-2 mr-4">
                      <button onClick={() => handleQuantityChange(item.id, -1)} className="p-1 rounded-full bg-red-200 hover:bg-red-300 text-red-800 transition-colors"><MinusCircle size={20} /></button>
                      <span className="font-bold text-gray-800">{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item.id, 1)} className="p-1 rounded-full bg-red-200 hover:bg-red-300 text-red-800 transition-colors"><PlusCircle size={20} /></button>
                    </div>
                    <button onClick={() => handleRemoveItem(item.id)} className="text-red-600 hover:text-red-800 transition-colors" title="Eliminar"><Trash2 size={24} /></button>
                  </div>
                ))}
              </div>

              <div className="text-right text-2xl font-bold text-gray-800 mb-8 border-t pt-4">
                Total: ${totalPrice.toFixed(2)}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleCheckout}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 flex items-center space-x-2 text-lg"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Proceder al Pago</span>
                </button>
              </div>
            </>
          ) : (
            <div className="text-center text-gray-500 text-xl mt-12">
              <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p>Tu carrito de compras está vacío.</p>
              <p className="text-lg mt-2">¡Explora nuestros productos y agrega tus favoritos!</p>
              <button
                onClick={() => alert('Navegar a la página de productos (simulado)')}
                className="mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-5 rounded-full shadow-md transition-colors"
              >
                Ver Productos
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}