import React from "react";
import { usarCarrito } from "../context/ContextoCarrito";

const TarjetaProducto = ({ producto, sufijoClaseCategoria }) => {
  const { agregarAlCarrito } = usarCarrito();

  const handleAgregarAlCarrito = () => {
    if (producto.prodConsignacion) {
      alert(`"${producto.prodNombre}" estará disponible próximamente.`);
      return;
    }
    agregarAlCarrito(producto);
    alert(`"${producto.prodNombre}" ha sido agregado al carrito.`);
  };

  const cardClass = `product-card-modern-${sufijoClaseCategoria}`;
  // Nueva clase para el contenedor de la imagen
  const imageWrapperClass = `product-image-wrapper-${sufijoClaseCategoria}`; 
  const imageClass = `product-image-${sufijoClaseCategoria}`;
  const nameClass = `nombre-producto-${sufijoClaseCategoria}`;
  const priceClass = `price-${sufijoClaseCategoria}`;

  return (
    <div className={cardClass}>
      {/* Nuevo contenedor para la imagen */}
      <div className={imageWrapperClass}> 
        <img 
          src={producto.prodImagen} 
          alt={producto.prodNombre} 
          className={imageClass} 
        />
      </div>
      <h5 className={`${nameClass} text-lg`}>{producto.prodNombre}</h5>
      
      {producto.prodPrecio !== undefined && producto.prodPrecio !== null && (
        <p className={`${priceClass} text-base`}>
          Precio: ${parseFloat(producto.prodPrecio).toLocaleString("es-CO")}
        </p>
      )}

      <button
        onClick={handleAgregarAlCarrito}
        className="bg-[#7a1010] hover:bg-[#921913] text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out text-lg"
      >
        Agregar al Carrito
      </button>
    </div>
  );
};

export default TarjetaProducto;
