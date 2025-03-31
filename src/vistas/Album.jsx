import React from 'react'
import { useState } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";
import "./Album.css";

export default function Album() {
    const images = [
        "../../img/LORD WINE Slide - 1.jpeg",
        "../../img/LORD WINE Slide - 2.jpg",
        "../../img/LORD WINE Slide - 3.jpeg",
      ];
    
      const [currentIndex, setCurrentIndex] = useState(0);
    
      const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
          prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
      };
    
      const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      };
    
      return (
        <>
            <div className="page-container bg-gray-900 text-white min-h-screen flex flex-col">
            <Header />
            <BarraProductos />

            <main className="flex justify-around py-4 px-4">
              
              <div className="flex items-center justify-center p-6 shadow-lg">
                <div className= "p-8 bg-black rounded-[10px]" style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}>
                  <h2 className="text-center text-white text-3xl my-4">Fotos</h2>
                  <div className="relative w-96 h-96 m-8">
                  {images.map((src, index) => (
                      <img
                      key={index}
                      src={src}
                      alt={`Imagen ${index + 1}`}
                      className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
                          index === currentIndex ? "opacity-100" : "opacity-0"
                      }`}
                      />
                  ))}
                      <button onClick={prevSlide} className="carousel-button left-4">❮</button>
                      <button onClick={nextSlide} className="carousel-button right-4">❯ </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center p-6 shadow-lg">
                <div className= "p-8 bg-black rounded-[10px]" style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}>
                  <h2 className="text-center text-white text-3xl my-4">Videos</h2>
                  <div className="relative w-96 h-96 m-8">
                  {images.map((src, index) => (
                      <img
                      key={index}
                      src={src}
                      alt={`Imagen ${index + 1}`}
                      className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
                          index === currentIndex ? "opacity-100" : "opacity-0"
                      }`}
                      />
                  ))}
                      <button onClick={prevSlide} className="carousel-button left-4">❮</button>
                      <button onClick={nextSlide} className="carousel-button right-4">❯ </button>
                  </div>
                </div>
              </div>
            </main>
        
            <Footer />
            </div>
        </>
        );
    }