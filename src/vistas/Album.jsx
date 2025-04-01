import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BarraProductos from "../components/BarraProductos";
import "./Album.css";

export default function Album() {
  const images = [
    "../../img/LORD WINE Slide - 1.jpeg",
    "../../img/LORD WINE Slide - 2.jpg",
    "../../img/LORD WINE Slide - 3.jpeg",
  ];

  const videos = [
    "",
    "",
    "",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevVideo = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === 0 ? videos.length - 1 : prevIndex - 1
    );
  };

  const nextVideo = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === videos.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="page-container bg-gray-900 text-white min-h-screen flex flex-col">
      <Header />
      <BarraProductos />
      <main className="flex flex-col md:flex-row justify-around py-4 px-4">

        <div className="flex items-center justify-center p-6 shadow-lg">
          <div
            className="p-8 bg-black rounded-lg"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
          >
            <h2 className="text-center text-white text-3xl my-4">Fotos</h2>
            <div className="relative w-96 h-96 m-8">
              {images.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Imagen ${index + 1}`}
                  className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
                    index === currentImageIndex ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
              <button onClick={prevImage} className="carousel-button left-4">
                ❮
              </button>
              <button onClick={nextImage} className="carousel-button right-4">
                ❯
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center p-6 shadow-lg">
          <div
            className="p-8 bg-black rounded-lg"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
          >
            <h2 className="text-center text-white text-3xl my-4">Videos</h2>
            <div className="relative w-96 h-96 m-8">
              {videos[currentVideoIndex].includes("http") ? (
                <iframe
                  className="w-full h-full"
                  src={videos[currentVideoIndex]}
                  title={`Video ${currentVideoIndex + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <video className="w-full h-full" controls>
                  <source src={videos[currentVideoIndex]} type="video/mp4" />
                  Tu navegador no soporta la reproducción de videos.
                </video>
              )}
              <button onClick={prevVideo} className="carousel-button left-4">
                ❮
              </button>
              <button onClick={nextVideo} className="carousel-button right-4">
                ❯
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
