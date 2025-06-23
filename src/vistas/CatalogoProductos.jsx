import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from '../components/BarraProductos';
import { Package, Tag, DollarSign, ShoppingCart } from 'lucide-react';

export default function CatalogoProductos() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Vino Tinto Gran Reserva (750ml)', category: 'Vinos', price: 75.00, imageUrl: 'https://placehold.co/150x150/F0F0F0/000000?text=Vino' },
    { id: 2, name: 'Cremas de Whisky Irlandesa (700ml)', category: 'Cremas Whisky', price: 45.00, imageUrl: 'https://placehold.co/150x150/D0D0D0/000000?text=Whisky' },
    { id: 3, name: 'Mistela Artesanal (500ml)', category: 'Mistelas', price: 30.00, imageUrl: 'https://placehold.co/150x150/C0C0C0/000000?text=Mistela' },
    { id: 4, name: 'Zumo de Uva Natural (1L)', category: 'Zumo', price: 15.00, imageUrl: 'https://placehold.co/150x150/A0A0A0/000000?text=Zumo' },
    { id: 5, name: 'Sacacorchos de Lujo', category: 'Accesorios', price: 25.00, imageUrl: 'https://placehold.co/150x150/909090/000000?text=Sacacorchos' },
    { id: 6, name: 'Kit de Vinos para Degustación', category: 'Kits', price: 150.00, imageUrl: 'https://placehold.co/150x150/808080/000000?text=Kit' },
  ]);

  const handleAddToCart = (product) => {
    alert(`"${product.name}" añadido al carrito (simulado).`);
    // En una aplicación real, aquí iría la lógica para agregar al estado global del carrito o al backend.
  };

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      <BarraProductos />
      <main
        className="flex-grow flex flex-col items-center w-full py-8 px-4 sm:px-8 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/img/Viñedo.jpg')" }}
      >
        <div className="max-w-6xl mx-auto w-full bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center space-x-2">
            <Package className="w-8 h-8 text-red-600" /> {/* Changed from yellow to red */}
            <span>Catálogo de Productos</span>
          </h2>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <div key={product.id} className="bg-gray-50 rounded-lg shadow-sm overflow-hidden flex flex-col items-center p-4 text-center">
                  <img src={product.imageUrl} alt={product.name} className="w-32 h-32 object-cover rounded-md mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-600 flex items-center space-x-1 mb-2">
                    <Tag className="w-4 h-4" /><span>{product.category}</span>
                  </p>
                  <p className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-1">
                    {/* Kept green for price, as it signifies money/positive */}
                    <DollarSign className="w-5 h-5 text-green-600" /><span>${product.price.toFixed(2)}</span>
                  </p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full shadow-md transition-colors flex items-center space-x-2" // Changed from yellow to red
                  >
                    <ShoppingCart size={20} />
                    <span>Añadir al Carrito</span>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 text-xl mt-12">No hay productos disponibles en el catálogo.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}