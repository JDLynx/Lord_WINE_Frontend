import React from "react";
import { ShoppingCart } from "lucide-react";

export default function CarritoCompras() {
    return (
        <main className="bg-vistas">
            <section className="m-8 aviso_carrito text-center">
                <div className="flex justify-center items-center">
                    <ShoppingCart className="w-10 h-10" />
                </div>
                <h2 className="">Tu carrito está vacío</h2>
                <p className="">Agrega productos para verlos aquí</p>
            </section>
        </main>
    );
}

