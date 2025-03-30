import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";
import "./Vinos.css";

function Vinos()
{
    return(
        <>
            <div className="page-container">

            <Header />
            <BarraProductos />

            <main className="bg-vistas-vinos">

                <h2 class="titulo-vinos">Vinos Dulces</h2>

                <div className="productos-container-vinos">

                    <div className="product-card-modern-vinos">
                        <img src="/img/Vino Botella.jpg" alt="Vino Encanto del Valle Botella" className="product-image-vinos" />
                        <h5 className="nombre-producto-vinos">Vino Encanto del Valle Botella</h5>
                        <p className="detalle-vinos">Presentación: Caja x 12 unds<br />Botella: 750 ml</p>
                        <p className="price-vinos">Precio Caja: $336.000<br />Precio Detal: $30.000</p>
                    </div>

                    <div className="product-card-modern-vinos">
                        <img src="/img/Vino Mini.jpg" alt="Vino Encanto del Valle Mini" className="product-image-vinos" />
                        <h5 className="nombre-producto-vinos">Vino Encanto del Valle Mini</h5>
                        <p className="detalle-vinos">Presentación: Caja x 24 unds<br />Botella: 150 ml</p>
                        <p className="price-vinos">Precio Caja: $204.000<br />Precio Detal: $10.000</p>
                    </div>

                </div>

            </main>

            <Footer />

            </div>
        </>
    )
}

export default Vinos