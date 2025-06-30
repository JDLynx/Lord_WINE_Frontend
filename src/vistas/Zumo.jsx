import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";
import TarjetaProducto from '../components/TarjetaProducto';
import datosProductos from '../data/DatosProductos';
import "./Zumo.css";

function Zumo() {
  // Filtrar los productos para esta categoría
  const zumoProductos = datosProductos.filter(producto => producto.category === 'zumo');

  return (
    <>
      <div className="page-container">
        <Header />
        <BarraProductos />

        <main className="bg-vistas-zumo">
          <h2 className="titulo-zumo">Zumo</h2>

          <div className="productos-container-zumo">
            {zumoProductos.map(producto => (
              <TarjetaProducto key={producto.id} producto={producto} sufijoClaseCategoria="zumo" />
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default Zumo;