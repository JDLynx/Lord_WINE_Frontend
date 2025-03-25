import React from 'react'

export default function Home() {
    return (
        <>
            <main className=''>
                <div className="@container py-5 border">

                    <div className="flex flex-wrap justify-center">

                        <h2 className="text-center mb-5 w-full"></h2>

                        <div className="w-full lg:w-1/3 md:w-1/2 sm:w-1/2 mb-7 flex justify-center px-4">

                            <div className="product-card-modern w-full">
                                <img src="/img/Vino Botella.jpg" alt="Vino Encanto del Valle Botella" className="w-full rounded" />
                                <h5 className="mt-3">Vino Encanto del Valle Botella</h5>
                                <p>Presentación: Caja x 12 unds<br></br>Botella: 750 ml</p>
                                <p className="price">Precio Caja: $336.000<br></br>Precio Detal: $30.000</p>
                            </div>

                        </div>

                        <div className="w-full lg:w-1/3 md:w-1/2 sm:w-1/2 mb-7 flex justify-center px-4">

                            <div className="product-card-modern w-full">
                                <img src="/img/Vino Mini.jpg" alt="Vino Encanto del Valle Mini" className="rounded w-full" />
                                <h5 className="mt-3">Vino Encanto del Valle Mini</h5>
                                <p>Presentación: Caja x 24 unds<br></br>Botella: 150 ml</p>
                                <p className="price">Precio Caja: $204.000<br></br>Precio Detal: $10.000</p>
                            </div>

                        </div>

                        <div className="w-full lg:w-1/3 md:w-1/2 sm:w-1/2 mb-7 flex justify-center px-4">

                            <div className="product-card-modern w-full">
                                <img src="/img/Mistela Lulo.jpg" alt="Mistela de Lulo" className="rounded w-full" />
                                <h5 className="mt-3">Mistela de Lulo</h5>
                                <p>Presentación: Botella 500 ml</p>
                                <p className="price">Precio: $32.000</p>
                            </div>

                        </div>

                        <div className="w-full lg:w-1/3 md:w-1/2 sm:w-1/2 mb-7 flex justify-center px-4">

                            <div className="product-card-modern w-full">
                                <img src="../../img/Mistela Maracuyá.jpg" alt="Mistela de Maracuyá" class="img-fluid rounded"></img>
                                <h5 className="mt-3">Mistela de Maracuyá</h5>
                                <p>Presentación: Botella 500 ml</p>
                                <p className="price">Precio: $32.000</p>
                            </div>

                        </div>

                        <div className="w-full lg:w-1/3 md:w-1/2 sm:w-1/2 mb-7 flex justify-center px-4">

                            <div className="product-card-modern w-full">
                                <img src="/img/Zumo De Uva.jpg" alt="Zumo Integral de Uva" className="rounded w-full" />
                                <h5 className="mt-3">Zumo Integral de Uva</h5>
                                <p>Presentación: Caja x 24 unds<br></br>Botella: 250 ml</p>
                                <p className="price">Precio Caja: $179.990<br></br>Precio Detal: $10.000</p>
                            </div>

                        </div>

                    </div>

                </div>
            </main>

            <Footer />
        </>
    )
}
