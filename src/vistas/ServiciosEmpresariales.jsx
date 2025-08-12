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
    '1': '/img/Cata_Domicilio.png', 
    '2': '/img/Personalizacion_Etiquetas.jpg',
    '3': '/img/Eventos_Corporativos.jpg',
    '7': '/img/Alquiler_Barra_Movil.jpg',
    '8': '/img/Cata_Vino_Corporativa.png',
    '9': '/img/Servicio_Cocteleria_Personalizada.jpg',
    '10': '/img/Maridaje_Gourmet.jpg',
    '11': '/img/Taller_Mixologia.jpg',
    '12': '/img/Asesoria_Carta_Vinos.jpg',
    '13': '/img/Capacitacion_Servicio_Bebidas.jpg',
    '14': '/img/Suministro_Licores_Eventos.jpg',
    '15': '/img/Ambientacion_Bar_Eventos.jpg',
    '16': '/img/Experiencia_Sensorial.jpg',
    '17': '/img/Diseño_Carta_Licores.jpg',
    '18': '/img/Refrigerio_Vino.jpg',
    '19': '/img/Staff_Servicio_Eventos.jpg',
    '20': '/img/Montaje_Express_Barra_Vinos.jpg',
    '21': '/img/Tienda_Movil_Eventos.jpg',
    '22': '/img/Degustacion_Tematica_Licores.jpg',
    '23': '/img/Licorera_Ferias.jpg',
    '24': '/img/Taller_Vinos_Ejecutivos.jpg',
    '25': '/img/Alquiler_Cristaleria_Premium.jpg',
    '26': '/img/Muestra_Comercial_Marca.jpg',
    '27': '/img/Cava_Personalizada_Empresas.jpg',
    '28': '/img/Eventos_Networking_Vino.jpg',
    '29': '/img/Catering_Vinos_Premium.jpg',
    '30': '/img/Kit_Empresarial_Regalo.jpg',
    '31': '/img/Puesta_Escena_Lanzamiento.jpg',
    '32': '/img/Desarrollado_Marca_Licor.jpg',
    '33': '/img/Distribucion_Institucional_Vinos.jpg',
    '34': '/img/Ruta_Vino_Empresas.jpg',
    '35': '/img/Licor_Corporativo_Personalizado.jpg',
    '36': '/img/Activacion_Centros_Comerciales_Vinos.png',
  };

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const response = await fetch('https://lord-wine-backend.onrender.com/api/servicios-empresariales');
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
            Contamos con una amplia gama de vinos, licores y cócteles para satisfacer tus necesidades.<br></br><strong>Para más información: </strong> Contactenos al 3006578 888
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
