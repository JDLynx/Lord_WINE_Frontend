import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";
import TarjetaProducto from '../components/TarjetaProducto';
import datosProductos from '../data/DatosProductos';
import "./Mistelas.css";

function Mistelas() {
  const mistelasProductos = datosProductos.filter(producto => producto.category === 'mistelas');

  return (
    <>
      <div className="page-container">
        <Header />
        <BarraProductos />

        <main className="bg-vistas-mistelas">
          <h2 className="titulo-mistelas">Mistelas</h2>

          <div className="productos-container-mistelas">
            {mistelasProductos.map(producto => (
              <TarjetaProducto key={producto.id} producto={producto} sufijoClaseCategoria="mistelas" />
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default Mistelas;