import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from '../components/BarraProductos';
import "./ServiciosEmpresariales.css";

const servicios = [
  {
    id: 1,
    title: "Eventos Empresariales",
    text: "Ofrecemos vinos y licores exclusivos para tus eventos empresariales y reuniones corporativas.",
    image: "/img/LORD WINE - Servicios Empresariales 1.jpg",
  },
  {
    id: 2,
    title: "Distribución Mayorista",
    text: "Proveemos productos de alta calidad para distribuidores y comerciantes con precios especiales.",
    image: "/img/LORD WINE - Servicios Empresariales 2.jpg",
  },
  {
    id: 3,
    title: "Asesoría y Catas",
    text: "Brindamos asesoría especializada en vinos y organizamos catas privadas para tu empresa.",
    image: "/img/LORD WINE - Servicios Empresariales 3.jpg",
  },
];

function ServiciosEmpresariales() {
  return (
    <div className="page-container">
      <Header />
      <BarraProductos />

      <main className="servicios-main">
        <div className="text-container">
          <h2>Servicios <span>Empresariales</span></h2>
          <p>
            En <strong>LORD WINE</strong>, ofrecemos soluciones personalizadas para empresas, eventos y distribuidores. 
            Contamos con una amplia gama de vinos, licores y cócteles para satisfacer tus necesidades.
          </p>
        </div>

        <div className="servicios-container">
          {servicios.map((servicio) => (
            <div key={servicio.id} className="servicio-card">
              <img src={servicio.image} alt={servicio.title} className="servicio-img" />
              <div className="servicio-info">
                <h3>{servicio.title}</h3>
                <p>{servicio.text}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ServiciosEmpresariales;