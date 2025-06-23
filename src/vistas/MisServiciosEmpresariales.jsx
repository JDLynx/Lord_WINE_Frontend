import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from '../components/BarraProductos';
import { Briefcase, Info, DollarSign, Calendar } from 'lucide-react';

export default function MisServiciosEmpresariales() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Simular la carga de servicios empresariales disponibles
    const simulatedServices = [
      {
        id: 1,
        name: 'Asesoría Personalizada de Vinos',
        description: 'Sesión individual con un sommelier para recomendaciones de maridaje y compra.',
        price: 75.00,
        duration: '1 hora',
      },
      {
        id: 2,
        name: 'Cata Privada a Domicilio',
        description: 'Experiencia de cata guiada de 5 vinos selectos en la comodidad de su hogar.',
        price: 250.00,
        duration: '2 horas',
      },
      {
        id: 3,
        name: 'Logística de Eventos (Vinos y Licores)',
        description: 'Gestión completa de suministro de bebidas para su evento o celebración.',
        price: 'Personalizado',
        duration: 'N/A',
      },
      {
        id: 4,
        name: 'Regalos Corporativos Personalizados',
        description: 'Creación de cestas de regalo exclusivas con nuestros productos para clientes o empleados.',
        price: 'Personalizado',
        duration: 'N/A',
      },
    ];
    setTimeout(() => {
      setServices(simulatedServices);
    }, 500);
  }, []);

  const handleRequestInfo = (serviceName) => {
    alert(`Has solicitado más información sobre: ${serviceName}. Nos pondremos en contacto contigo pronto (simulado).`);
    // En una app real, aquí se enviaría una solicitud al backend o se abriría un formulario de contacto.
  };

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      <BarraProductos />
      <main
        className="flex-grow flex flex-col items-center w-full py-8 px-4 sm:px-8 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/img/Viñedo.jpg')" }}
      >
        <div className="max-w-6xl mx-auto w-full bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-red-600 mb-6 text-center flex items-center justify-center space-x-2">
            <Briefcase className="w-8 h-8 text-red-600" />
            <span>Nuestros Servicios Empresariales</span>
          </h2>

          {services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map(service => (
                <div key={service.id} className="bg-gray-50 rounded-lg shadow-sm p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                      <Briefcase className="w-5 h-5 text-red-600" />
                      <span>{service.name}</span>
                    </h3>
                    <p className="text-gray-700 mb-4">{service.description}</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-800 flex items-center space-x-2 mb-2">
                      {/* Kept green for price, as it signifies money/positive */}
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <span>Precio: {typeof service.price === 'number' ? `$${service.price.toFixed(2)}` : service.price}</span>
                    </p>
                    {service.duration !== 'N/A' && (
                      <p className="text-gray-600 flex items-center space-x-2 mb-4">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span>Duración: {service.duration}</span>
                      </p>
                    )}
                    <button
                      onClick={() => handleRequestInfo(service.name)}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-5 rounded-full shadow-md transition-colors flex items-center space-x-2"
                    >
                      <Info size={20} />
                      <span>Solicitar Información</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 text-xl mt-12">No hay servicios empresariales disponibles en este momento.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}