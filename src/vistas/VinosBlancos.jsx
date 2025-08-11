import React, { useState, useEffect } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'; 
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";
import TarjetaProducto from '../components/TarjetaProducto';
import "./VinosBlancos.css";

function VinosBlancos() {
  const [vinosBlancosProductos, setVinosBlancosProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('https://lord-wine-backend.onrender.com/api/productos'); 
        
        if (!response.ok) {
            throw new Error('Error al cargar los productos');
        }

        const productosData = await response.json();
        
        const productosFiltrados = productosData.filter(producto => producto.category === 'Vino Blanco');
        
        setVinosBlancosProductos(productosFiltrados);
      } catch (err) {
        console.error("Error al obtener los productos:", err);
        setError("No se pudieron cargar los productos. Inténtalo de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProductos();
  }, []); 

  return (
    <>
      <div className="page-container">
        <Header />
        <BarraProductos />

        <main className="bg-vistas-vinos-blancos">
          <h2 className="titulo-vinos-blancos">Vinos Blancos</h2>
          
          {loading ? (
            // spinner de carga
            <div className="flex flex-col items-center justify-center flex-grow p-10">
                <AiOutlineLoading3Quarters className="w-12 h-12 text-[#921913] animate-spin" />
                <p className="mt-4 text-gray-600 text-lg">Cargando productos...</p>
            </div>
          ) : error ? (
            // mensaje de error directamente en un párrafo
            <p className="text-center text-[#921913] text-xl font-semibold p-10">
                {error}
            </p>
          ) : vinosBlancosProductos.length === 0 ? (
            // mensaje de "no hay productos" directamente en un párrafo
            <p className="text-center text-gray-600 text-xl font-semibold p-10">
                No se encontraron Vinos Blancos en este momento.
            </p>
          ) : (
            // productos si todo está bien
            <div className="productos-container-vinos-blancos">
              {vinosBlancosProductos.map(producto => (
                <TarjetaProducto 
                  key={producto.prodIdProducto} 
                  producto={producto} 
                  sufijoClaseCategoria="vinos-blancos" 
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

export default VinosBlancos;
