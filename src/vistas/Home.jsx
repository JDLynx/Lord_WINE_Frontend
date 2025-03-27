import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";
import "./Home.css";

export default function Home() {
    return (
        <>
            <div className="page-container">
                <Header />
                <BarraProductos />

                <main className="bg-vistas">
                    <div className="productos-container">

                        <div className="flex flex-wrap justify-center">

                            <div className="w-full lg:w-1/3 md:w-1/2 sm:w-1/2 mb-3 flex justify-center px-2">
                                <div className="product-card-modern w-full">
                                    <img src="/img/Vino Botella.jpg" alt="Vino Encanto del Valle Botella" className="w-full rounded" />
                                    <h5 className="mt-3">Vino Encanto del Valle Botella</h5>
                                    <p>Presentación: Caja x 12 unds<br />Botella: 750 ml</p>
                                    <p className="price">Precio Caja: $336.000<br />Precio Detal: $30.000</p>
                                </div>
                            </div>

                            <div className="w-full lg:w-1/3 md:w-1/2 sm:w-1/2 mb-3 flex justify-center px-2">
                                <div className="product-card-modern w-full">
                                    <img src="/img/Vino Mini.jpg" alt="Vino Encanto del Valle Mini" className="rounded w-full" />
                                    <h5 className="mt-3">Vino Encanto del Valle Mini</h5>
                                    <p>Presentación: Caja x 24 unds<br />Botella: 150 ml</p>
                                    <p className="price">Precio Caja: $204.000<br />Precio Detal: $10.000</p>
                                </div>
                            </div>

                            <div className="w-full lg:w-1/3 md:w-1/2 sm:w-1/2 mb-3 flex justify-center px-2">
                                <div className="product-card-modern w-full">
                                    <img src="/img/Mistela Lulo.jpg" alt="Mistela de Lulo" className="rounded w-full" />
                                    <h5 className="mt-3">Mistela de Lulo</h5>
                                    <p>Presentación: Botella 500 ml</p>
                                    <p className="price">Precio: $32.000</p>
                                </div>
                            </div>

                            <div className="w-full lg:w-1/3 md:w-1/2 sm:w-1/2 mb-3 flex justify-center px-2">
                                <div className="product-card-modern w-full">
                                    <img src="/img/Mistela Maracuyá.jpg" alt="Mistela de Maracuyá" className="rounded w-full" />
                                    <h5 className="mt-3">Mistela de Maracuyá</h5>
                                    <p>Presentación: Botella 500 ml</p>
                                    <p className="price">Precio: $32.000</p>
                                </div>
                            </div>

                            <div className="w-full lg:w-1/3 md:w-1/2 sm:w-1/2 mb-3 flex justify-center px-2">
                                <div className="product-card-modern w-full">
                                    <img src="/img/Zumo De Uva.jpg" alt="Zumo Integral de Uva" className="rounded w-full" />
                                    <h5 className="mt-3">Zumo Integral de Uva</h5>
                                    <p>Presentación: Caja x 24 unds<br />Botella: 250 ml</p>
                                    <p className="price">Precio Caja: $179.990<br />Precio Detal: $10.000</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}