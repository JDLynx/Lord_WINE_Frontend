import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";
import "./CremasWhisky.css";

function CremasWhisky()
{
    return(
        <>
            <div className="page-container">

            <Header />
            <BarraProductos />

            <main className="bg-vistas-cremas-whisky">

                <h2 className="titulo-cremas-whisky">Cremas de Whisky</h2>

                <div className="productos-container-cremas-whisky">

                    <div className="product-card-modern-cremas-whisky">
                        <img src="/img/Proximamente.png" alt="Proximamente" className="product-image-cremas-whisky" />
                    </div>

                    <div className="product-card-modern-cremas-whisky">
                        <img src="/img/Proximamente.png" alt="Proximamente" className="product-image-cremas-whisky" />
                    </div>

                    <div className="product-card-modern-cremas-whisky">
                        <img src="/img/Proximamente.png" alt="Proximamente" className="product-image-cremas-whisky" />
                    </div>
                    
                </div>

            </main>

            <Footer />

            </div>
        </>
    )
}

export default CremasWhisky