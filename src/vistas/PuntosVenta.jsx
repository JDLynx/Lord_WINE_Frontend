import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";

export default function PuntosVenta() {
  useEffect(() => {
    const mapElement = document.getElementById("map");
    if (!mapElement._leaflet_id) {
      const initialCoords = [3.437281, -76.521774];

      const map = L.map("map").setView(initialCoords, 8);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      const tiendas = [
        {
          nombre: "Popayán",
          coords: [2.440546, -76.605317],
          direccion: "Cra 5 # 5-51, Centro, Popayán, Cauca",
        },
        {
          nombre: "Cali",
          coords: [3.437281, -76.521774],
          direccion: "Cl. 19 #21-91 a 21-1, Cali, Valle del Cauca",
        },
        {
          nombre: "Palmira",
          coords: [3.530907, -76.296922],
          direccion: "Cl. 34 #26-2 a 26-96, Palmira, Valle del Cauca",
        },
        {
          nombre: "Ginebra",
          coords: [3.725009, -76.266778],
          direccion: "Cl. 8 #2-83 a 2-1, Ginebra, Valle del Cauca",
        },
      ];

      const storeList = document.getElementById("store-list");

      tiendas.forEach((tienda) => {
        const marker = L.marker(tienda.coords)
          .addTo(map)
          .bindPopup(`<b>${tienda.nombre}</b><br>${tienda.direccion}`);

        const li = document.createElement("li");
        li.className = "cursor-pointer p-2 border-b border-gray-300 hover:bg-gray-700 text-left text-lg";
        li.innerHTML = `<b>${tienda.nombre}</b><br>${tienda.direccion}`;
        li.addEventListener("click", () => {
          map.setView(tienda.coords, 14);
          marker.openPopup();
        });
        storeList.appendChild(li);
      });
    }
  }, []);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <BarraProductos />

        <main
          className="flex-grow flex flex-col items-center w-full py-8 px-4 sm:px-8 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/img/Viñedo.jpg')" }}
        >
          <div
            className="p-6 shadow-lg text-white rounded-2xl w-full max-w-5xl md:w-3/4 lg:w-2/3"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
          >
            <h2 className="text-center font-semibold text-xl mb-4">Encuentra Tu Tienda</h2>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3 flex flex-col">
                <h4 className="text-2xl font-medium mb-2">Tus Direcciones</h4>
                <ul id="store-list" className="list-none p-0 overflow-y-auto max-h-[400px]"></ul>
              </div>

              <div className="w-full md:w-2/3">
                <div id="map" className="w-full h-[500px] rounded-[10px]"></div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}