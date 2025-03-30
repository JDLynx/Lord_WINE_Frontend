import "./Home.css";
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";

export default function Home()
{
    return(
        <>
            <div className="page-container-home">

                <Header />
                <BarraProductos />

                <main className="bg-vistas-home">

                    <div className="productos-container-home">

                        <div className="product-card-modern-home">
                            <img src="/img/Vino Botella.jpg" alt="Vino Encanto del Valle Botella" className="product-image-home" />
                            <h5 className="nombre-producto-home">Vino Encanto del Valle Botella</h5>
                            <p className="detalle-home">Presentación: Caja x 12 unds<br />Botella: 750 ml</p>
                            <p className="price-home">Precio Caja: $336.000<br />Precio Detal: $30.000</p>
                        </div>

                        <div className="product-card-modern-home">
                            <img src="/img/Vino Mini.jpg" alt="Vino Encanto del Valle Mini" className="product-image-home" />
                            <h5 className="nombre-producto-home">Vino Encanto del Valle Mini</h5>
                            <p className="detalle-home">Presentación: Caja x 24 unds<br />Botella: 150 ml</p>
                            <p className="price-home">Precio Caja: $204.000<br />Precio Detal: $10.000</p>
                        </div>

                        <div className="product-card-modern-home">
                            <img src="/img/Mistela Lulo.jpg" alt="Mistela de Lulo" className="product-image-home" />
                            <h5 className="nombre-producto-home">Mistela de Lulo</h5>
                            <p className="detalle-home">Presentación: Botella 500 ml</p>
                            <p className="price-home">Precio: $32.000</p>
                        </div>

                        <div className="product-card-modern-home">
                            <img src="/img/Mistela Maracuyá.jpg" alt="Mistela de Maracuyá" className="product-image-home" />
                            <h5 className="nombre-producto-home">Mistela de Maracuyá</h5>
                            <p className="detalle-home">Presentación: Botella 500 ml</p>
                            <p className="price-home">Precio: $32.000</p>
                        </div>

                        <div className="product-card-modern-home">
                            <img src="/img/Zumo De Uva.jpg" alt="Zumo Integral de Uva" className="product-image-home" />
                            <h5 className="nombre-producto-home">Zumo Integral de Uva</h5>
                            <p className="detalle-home">Presentación: Caja x 24 unds<br />Botella: 250 ml</p>
                            <p className="price-home">Precio Caja: $179.990<br />Precio Detal: $10.000</p>
                        </div>

                    </div>

                </main>

                <Footer />
                
            </div>
        </>
    );
}