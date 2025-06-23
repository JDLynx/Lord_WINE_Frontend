import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from '../components/BarraProductos';
import { Store, MapPin, Phone, Clock, Globe } from 'lucide-react';

export default function MisTiendasFisicas() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    // Simular carga de ubicaciones de tiendas físicas
    const simulatedStores = [
      {
        id: 1,
        name: 'Tienda Central Popayán',
        address: 'Calle 5 #4-20, Centro, Popayán, Cauca',
        phone: '602-8234567',
        schedule: 'Lun-Vie: 9am-7pm, Sáb: 10am-5pm',
        mapUrl: 'https://maps.google.com/?q=Calle+5+%234-20,+Popay%C3%A1n', // Enlace simulado a Google Maps
      },
      {
        id: 2,
        name: 'Tienda Norte Cali',
        address: 'Avenida 6N #47-15, Cali, Valle del Cauca',
        phone: '602-3789012',
        schedule: 'Lun-Vie: 9:30am-8pm, Sáb: 10am-6pm',
        mapUrl: 'https://maps.google.com/?q=Avenida+6N+%2347-15,+Cali',
      },
      {
        id: 3,
        name: 'Tienda Sur Medellín',
        address: 'Carrera 43A #18 Sur-135, Envigado, Antioquia',
        phone: '604-4567890',
        schedule: 'Lun-Vie: 10am-7:30pm, Sáb: 10am-4pm',
        mapUrl: 'https://maps.google.com/?q=Carrera+43A+%2318+Sur-135,+Envigado',
      },
    ];
    setTimeout(() => {
      setStores(simulatedStores);
    }, 500);
  }, []);

  const handleOpenMap = (url) => {
    window.open(url, '_blank'); // Abre el enlace en una nueva pestaña
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
            <Store className="w-8 h-8 text-red-600" />
            <span>Nuestras Tiendas Físicas</span>
          </h2>

          {stores.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stores.map(store => (
                <div key={store.id} className="bg-gray-50 rounded-lg shadow-sm p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                      <Store className="w-5 h-5 text-red-600" />
                      <span>{store.name}</span>
                    </h3>
                    <p className="text-gray-700 mb-1 flex items-center space-x-2"><MapPin className="w-4 h-4 text-gray-500" /><span>{store.address}</span></p>
                    <p className="text-gray-700 mb-1 flex items-center space-x-2"><Phone className="w-4 h-4 text-gray-500" /><span>{store.phone}</span></p>
                    <p className="text-gray-700 mb-4 flex items-center space-x-2"><Clock className="w-4 h-4 text-gray-500" /><span>Horario: {store.schedule}</span></p>
                  </div>
                  <div>
                    <button
                      onClick={() => handleOpenMap(store.mapUrl)}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-5 rounded-full shadow-md transition-colors flex items-center space-x-2"
                    >
                      <Globe size={20} />
                      <span>Ver en Mapa</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 text-xl mt-12">No hay información de tiendas físicas disponible.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}