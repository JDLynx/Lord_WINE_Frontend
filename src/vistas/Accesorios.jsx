import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";
import "./Accesorios.css";

function Accesorios()
{
    return(
        <>
        <div className="page-container">

        <Header />
        <BarraProductos />

        <main className="bg-vistas-accesorios">

            <h2 className="titulo-accesorios">Accesorios</h2>

            <div className="productos-container-accesorios">

                <div className="product-card-modern-accesorios">
                    <img src="/img/Proximamente.png" alt="Proximamente" className="product-image-accesorios" />
                </div>

                <div className="product-card-modern-accesorios">
                    <img src="/img/Proximamente.png" alt="Proximamente" className="product-image-accesorios" />
                </div>

                <div className="product-card-modern-accesorios">
                    <img src="/img/Proximamente.png" alt="Proximamente" className="product-image-accesorios" />
                </div>
                    
            </div>

        </main>

        <Footer />

        </div>
        </>
    )
}

export default Accesorios