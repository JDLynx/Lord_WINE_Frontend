import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";
import "./Zumo.css";

function Zumo()
{
    return(
        <>
            <div className="page-container">

            <Header />
            <BarraProductos />

            <main className="bg-vistas-zumo">

                <h2 className="titulo-zumo">Zumo</h2>

                <div className="productos-container-zumo">

                    <div className="product-card-modern-zumo">
                        <img src="/img/Zumo De Uva.jpg" alt="Zumo De Uva" className="product-image-zumo" />
                        <h5 className="nombre-producto-zumo">Zumo Integral de Uva</h5>
                        <p className="detalle-zumo">Presentación: Caja x 24 unds<br />Botella: 250 ml</p>
                        <p className="price-zumo">Precio Caja: $179.990<br />Precio Detal: $10.000</p>
                    </div>

                </div>

            </main>

            <Footer />

            </div>
        </>
    )
}

export default Zumo