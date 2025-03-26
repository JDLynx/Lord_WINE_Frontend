import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function PuntosVenta() {
  useEffect(() => {
    if (!document.getElementById("map")._leaflet_id) {
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
        li.className = "cursor-pointer p-2 border-b border-gray-300 hover:bg-gray-700";
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
    <main className="flex justify-center items-center h-screen pt-[5%] px-4 bg-vistas">
      <div className="p-6 shadow-lg bg-black bg-opacity-70 text-white rounded-[10px] w-full max-w-5xl">
        <h2 className="text-center text-2xl font-semibold">Encuentra Tu Tienda</h2>
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/3 flex flex-col justify-start">
            <h4 className="text-lg font-medium mb-2">Tus Direcciones</h4>
            <ul id="store-list" className="list-none p-0"></ul>
          </div>
          <div className="w-full md:w-2/3">
            <div id="map" className="w-full h-[500px] rounded-[10px]"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
