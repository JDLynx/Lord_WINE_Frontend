import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";
import TarjetaProducto from '../components/TarjetaProducto';
import datosProductos from '../data/DatosProductos';
import "./Accesorios.css";

function Accesorios() {
  // Filtrar los productos para esta categoría
  const accesoriosProductos = datosProductos.filter(producto => producto.category === 'accesorios');

  return (
    <>
      <div className="page-container">
        <Header />
        <BarraProductos />

        <main className="bg-vistas-accesorios">
          <h2 className="titulo-accesorios">Accesorios</h2>

          <div className="productos-container-accesorios">
            {accesoriosProductos.map(producto => (
              <TarjetaProducto key={producto.id} producto={producto} sufijoClaseCategoria="accesorios" />
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default Accesorios;