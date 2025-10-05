import React, { useState, useEffect, useMemo } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'; 
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";
import TarjetaProducto from '../components/TarjetaProducto';
import { usarBusqueda } from '../context/ContextoBusqueda';
import "./Home.css";

export default function Home() {
    const [productosHome, setProductosHome] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { searchQuery } = usarBusqueda(); 

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch('https://lord-wine-backend.onrender.com/api/productos');

                if (!response.ok) {
                    throw new Error('Error al cargar los productos');
                }

                const productosData = await response.json();
                const productosNormalizados = productosData.map(p => ({
                    ...p,
                    prodNombre: p.prodNombre || "", 
                }));

                setProductosHome(productosNormalizados);
            } catch (err) {
                console.error("Error al obtener los productos:", err);
                setError("No se pudieron cargar los productos. Inténtalo de nuevo más tarde.");
            } finally {
                setLoading(false);
            }
        };

        fetchProductos();
    }, []);

    const productosFiltrados = useMemo(() => {
        if (!searchQuery) {
            return productosHome;
        }

        const queryLowerCase = searchQuery.toLowerCase().trim();

        // Filtr0 por nombre del producto
        return productosHome.filter(producto =>
            producto.prodNombre.toLowerCase().includes(queryLowerCase)
        );
    }, [productosHome, searchQuery]);

    const hayResultados = productosFiltrados.length > 0;

    const isSearchActiveAndFewResults = 
        searchQuery && productosFiltrados.length > 0 && productosFiltrados.length <= 4;
        
    const containerClass = isSearchActiveAndFewResults 
        ? "productos-container-search"
        : "productos-container-home";

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
                        // mensaje de error
                        <p className="text-center text-[#921913] text-xl font-semibold p-10">
                            {error}
                        </p>
                    ) : productosHome.length === 0 && !error ? (
                        // mensaje de "no hay productos" inicial
                        <p className="text-center text-gray-600 text-xl font-semibold p-10">
                            No se encontraron productos en este momento.
                        </p>
                    ) : !hayResultados && searchQuery ? (
                        // Mensaje de "no hay resultados de búsqueda"
                        <p className="text-center text-gray-600 text-xl font-semibold p-10">
                            No se encontraron resultados para "{searchQuery}".
                        </p>
                    ) : (
                        <div className={containerClass}>
                            {productosFiltrados.map(producto => (
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