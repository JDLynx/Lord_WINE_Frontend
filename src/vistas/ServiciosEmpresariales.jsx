import React, { useState, useEffect } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'; 
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from '../components/BarraProductos';
import "./ServiciosEmpresariales.css";

function ServiciosEmpresariales() {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Objeto de mapeo de IDs de servicio a URLs de imágenes
  const serviceImages = {
    '1': '',
    '2': '',
    '3': '',
  };

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/servicios-empresariales');
        if (!response.ok) {
          throw new Error('Error al cargar los datos');
        }
        const data = await response.json();
        setServicios(data);
      } catch (err) {
        console.error("Error al obtener servicios empresariales:", err);
        setError("No se pudieron cargar los servicios. Inténtalo de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchServicios();
  }, []);

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

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

        {loading ? (
          <div className="flex flex-col items-center justify-center flex-grow p-10">
            <AiOutlineLoading3Quarters className="w-12 h-12 text-[#a52a2a] animate-spin" />
            <p className="mt-4 text-gray-600 text-lg">Cargando servicios...</p>
          </div>
        ) : (
          <div className="servicios-container">
            {servicios.map((servicio) => (
              <div
                key={servicio.serIdServicioEmpresarial}
                className="servicio-card"
              >
                <img
                  src={serviceImages[servicio.serIdServicioEmpresarial] || 'https://placehold.co/400x300/36454F/FFFFFF?text=Servicio'}
                  alt={servicio.serNombre}
                  className="servicio-img"
                />
                <div className="servicio-info">
                  <h3>
                    {servicio.serNombre}
                  </h3>
                  <p>
                    {servicio.serDescripcion}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default ServiciosEmpresariales;
