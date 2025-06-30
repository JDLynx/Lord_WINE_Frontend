import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";
import TarjetaProducto from '../components/TarjetaProducto';
import datosProductos from '../data/DatosProductos';
import "./CremasWhisky.css";

function CremasWhisky() {
  const cremasWhiskyProductos = datosProductos.filter(producto => producto.category === 'cremas-whisky');

  return (
    <>
      <div className="page-container">
        <Header />
        <BarraProductos />

        <main className="bg-vistas-cremas-whisky">
          <h2 className="titulo-cremas-whisky">Cremas de Whisky</h2>

          <div className="productos-container-cremas-whisky">
            {cremasWhiskyProductos.map(producto => (
              <TarjetaProducto key={producto.id} producto={producto} sufijoClaseCategoria="cremas-whisky" />
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default CremasWhisky;