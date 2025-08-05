import React, { useState, useEffect } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'; 
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";
import TarjetaProducto from '../components/TarjetaProducto';
import "./Home.css";

export default function Home() {
    const [productosHome, setProductosHome] = useState([]);
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

          setProductosHome(productosData);
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
            <div className="page-container-home">
                <Header />
                <BarraProductos />

                <main className="bg-vistas-home">
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
                    ) : productosHome.length === 0 ? (
                        // mensaje de "no hay productos" directamente en un párrafo
                        <p className="text-center text-gray-600 text-xl font-semibold p-10">
                            No se encontraron productos en este momento.
                        </p>
                    ) : (
                        // productos si todo está bien
                        <div className="productos-container-home">
                            {productosHome.map(producto => (
                                <TarjetaProducto
                                    key={producto.prodIdProducto}
                                    producto={producto}
                                    sufijoClaseCategoria="home"
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
