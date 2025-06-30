import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";
import TarjetaProducto from '../components/TarjetaProducto';
import datosProductos from '../data/DatosProductos';
import "./Vinos.css";

function Vinos() {
  const vinosProductos = datosProductos.filter(producto => producto.category === 'vinos');

  return (
    <>
      <div className="page-container">
        <Header />
        <BarraProductos />

        <main className="bg-vistas-vinos">
          <h2 className="titulo-vinos">Vinos Dulces</h2>

          <div className="productos-container-vinos">
            {vinosProductos.map(producto => (
              <TarjetaProducto key={producto.id} producto={producto} sufijoClaseCategoria="vinos" />
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default Vinos;