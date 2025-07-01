// src/vistas/Home.jsx
import "./Home.css";
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";
import TarjetaProducto from '../components/TarjetaProducto'; // Importar TarjetaProducto
import datosProductos from '../data/DatosProductos'; // Importar tus datos de productos

export default function Home() {
    // Filtra los productos que quieres mostrar en la Home
    // Por ejemplo, aquí mostramos los vinos, las mistelas y el zumo
    const productosHome = datosProductos.filter(producto => 
        producto.category === 'vinos' || 
        producto.category === 'mistelas' ||
        producto.category === 'zumo'
    );

    return (
        <>
            <div className="page-container-home">
                <Header />
                <BarraProductos />

                <main className="bg-vistas-home">
                    <div className="productos-container-home">
                        {/* Mapear los productos para usar TarjetaProducto */}
                        {productosHome.map(producto => (
                            <TarjetaProducto 
                                key={producto.id} 
                                producto={producto} 
                                sufijoClaseCategoria="home" // Usamos "home" para las clases CSS específicas de Home
                            />
                        ))}
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}