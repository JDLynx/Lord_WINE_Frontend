import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";
import "./Mistelas.css";

function Mistelas()
{
    return(
        <>
            <div className="page-container">

            <Header />
            <BarraProductos />

            <main className="bg-vistas-mistelas">

                <h2 className="titulo-mistelas">Mistelas</h2>

                <div className="productos-container-mistelas">

                    <div className="product-card-modern-mistelas">
                        <img src="/img/Mistela Lulo.jpg" alt="Mistela de Lulo" className="product-image-mistelas" />
                        <h5 className="nombre-producto-mistelas">Mistela de Lulo</h5>
                        <p className="detalle-mistelas">Presentación: Botella 500 ml</p>
                        <p className="price-mistelas">Precio: $32.000</p>
                    </div>

                    <div className="product-card-modern-mistelas">
                        <img src="/img/Mistela Maracuyá.jpg" alt="Mistela de Maracuyá" className="product-image-mistelas" />
                        <h5 className="nombre-producto-mistelas">Mistela de Maracuyá</h5>
                        <p className="detalle-mistelas">Presentación: Botella 500 ml</p>
                        <p className="price-mistelas">Precio: $30.000</p>
                    </div>

                </div>

            </main>

            <Footer />

            </div>
        </>
    )
}

export default Mistelas