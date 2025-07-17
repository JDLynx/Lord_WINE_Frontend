// src/vistas/Vinos.jsx
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";
import TarjetaProducto from '../components/TarjetaProducto';
import { XCircle } from 'lucide-react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import "./Vinos.css";

function Vinos() {
    const [productosVinos, setProductosVinos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_PRODUCTOS_URL = 'http://localhost:3000/api/productos'; 

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch(API_PRODUCTOS_URL);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                
                const productosFiltrados = data.filter(producto => producto.category === 'vinos');
                setProductosVinos(productosFiltrados);
            } catch (err) {
                console.error("Error al obtener productos del backend:", err);
                setError("No se pudieron cargar los productos de Vinos. Intenta de nuevo más tarde.");
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

                <main className="bg-vistas-vinos">
                    <h2 className="titulo-vinos">Vinos Dulces</h2>
                    {loading ? (
                        <div className="flex flex-col items-center justify-center flex-grow p-10 min-h-[50vh]">
                            <AiOutlineLoading3Quarters className="w-16 h-16 text-red-600 animate-spin mb-4" />
                            <p className="text-xl font-semibold text-gray-800">Cargando Vinos Dulces...</p>
                        </div>
                    ) : error ? (
                        <div className="flex flex-col items-center justify-center flex-grow p-10 min-h-[50vh]">
                            <XCircle className="w-16 h-16 text-red-600 mb-4" />
                            <p className="text-xl font-semibold text-red-700">Error al cargar los productos:</p>
                            <p className="text-lg text-red-600 text-center max-w-md">{error}</p>
                        </div>
                    ) : (
                        <div className="productos-container-vinos">
                            {productosVinos.length === 0 ? (
                                <div className="text-center text-gray-600 p-8">
                                    <h2 className="text-2xl font-semibold mb-2">No hay Vinos Dulces disponibles.</h2>
                                    <p className="text-lg">Por favor, inténtalo de nuevo más tarde o explora otras categorías.</p>
                                </div>
                            ) : (
                                productosVinos.map(producto => (
                                    <TarjetaProducto 
                                        key={producto.prodIdProducto} 
                                        producto={{
                                            id: producto.prodIdProducto, 
                                            name: producto.prodNombre, 
                                            description: producto.prodDescripcion, 
                                            price: parseFloat(producto.prodPrecio), 
                                            image: producto.prodImagenUrl || `https://placehold.co/200x200/cccccc/333333?text=${producto.prodNombre}`, 
                                            presentation: producto.prodPresentacion || '', 
                                            category: producto.categIdCategoria, 
                                            comingSoon: false 
                                        }}
                                        sufijoClaseCategoria="vinos" 
                                    />
                                ))
                            )}
                        </div>
                    )}
                </main>

                <Footer />
            </div>
        </>
    );
}

export default Vinos;
