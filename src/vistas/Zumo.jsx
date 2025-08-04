import React, { useState, useEffect } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";
import TarjetaProducto from '../components/TarjetaProducto';
import "./Zumo.css";

function Zumo() {
  const [zumoProductos, setZumoProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/productos'); 
        
        if (!response.ok) {
            throw new Error('Error al cargar los productos');
        }

        const productosData = await response.json();
        
        // CORRECCIÓN: Se cambia el filtro a 'producto.category' para que coincida con tus datos
        const productosFiltrados = productosData.filter(producto => producto.category === 'Zumo');
        
        setZumoProductos(productosFiltrados);
      } catch (err) {
        console.error("Error al obtener los productos:", err);
        setError("No se pudieron cargar los productos. Inténtalo de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProductos();
  }, []);

  if (error) {
      return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  return (
    <>
      <div className="page-container">
        <Header />
        <BarraProductos />

        <main className="bg-vistas-zumo">
          <h2 className="titulo-zumo">Zumo</h2>
          
          {loading ? (
            <div className="flex flex-col items-center justify-center flex-grow p-10">
                <AiOutlineLoading3Quarters className="w-12 h-12 text-[#921913] animate-spin" />
                <p className="mt-4 text-gray-600 text-lg">Cargando productos...</p>
            </div>
          ) : (
            <div className="productos-container-zumo">
              {zumoProductos.map(producto => (
                <TarjetaProducto 
                  key={producto.prodIdProducto} 
                  producto={producto} 
                  sufijoClaseCategoria="zumo" 
                />
              ))}
            </div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}

export default Zumo;