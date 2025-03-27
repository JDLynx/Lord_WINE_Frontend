import React from "react";
import { ShoppingCart } from "lucide-react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";
import "./CarritoCompras.css";

export default function CarritoCompras()
{
    return(
        <div className="page-container">

            <Header />
            <BarraProductos />

            <main className="bg-vistas">

                <section className="m-8 aviso_carrito text-center">

                    <div className="flex justify-center items-center">
                        <ShoppingCart className="w-10 h-10" />
                    </div>

                    <h2>Tu carrito está vacío</h2>
                    <p>Agrega productos para verlos aquí</p>
                    
                </section>

            </main>

            <Footer />

        </div>
    );
}