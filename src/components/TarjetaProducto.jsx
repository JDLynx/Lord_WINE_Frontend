// src/components/TarjetaProducto.js
import React from "react";
import { usarCarrito } from "../context/ContextoCarrito";

const TarjetaProducto = ({ producto, sufijoClaseCategoria }) => {
  const { agregarAlCarrito } = usarCarrito();

  const handleAgregarAlCarrito = async () => {
    if (producto.comingSoon) {
      alert(`"${producto.name}" estará disponible próximamente.`);
      return;
    }
    await agregarAlCarrito(producto);
  };

  const cardClass = `product-card-modern-${sufijoClaseCategoria}`;
  const imageClass = `product-image-${sufijoClaseCategoria}`;
  const nameClass = `nombre-producto-${sufijoClaseCategoria}`;
  const detailClass = `detalle-${sufijoClaseCategoria}`;
  const priceClass = `price-${sufijoClaseCategoria}`;

  // URL de placeholder para cuando la imagen no cargue
  const placeholderImage = `https://placehold.co/200x200/cccccc/333333?text=No+Imagen`;

  return (
    <div className={cardClass}>
      <img 
        src={producto.image} 
        alt={producto.name} 
        className={imageClass} 
        onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }}
      />
      <h5 className={`${nameClass} text-lg`}>{producto.name}</h5>
      
      {producto.description && producto.description.toLowerCase() !== producto.name.toLowerCase() && (
        <p className={`${detailClass} text-base`}>{producto.description}</p>
      )}
      
      {producto.presentation && (
        <p className={`${detailClass} text-base`}>{producto.presentation}</p>
      )}

      {producto.comingSoon ? (
        <p className="text-lg font-bold text-gray-500 mt-4">Próximamente</p>
      ) : (
        <>
          {producto.price !== undefined && producto.price !== null && (
            <p className={`${priceClass} text-base`}>
              Precio Detal: ${producto.price.toLocaleString("es-CO")}
            </p>
          )}
          {producto.priceBox !== undefined && producto.priceBox !== null && (
            <p className={`${priceClass} text-base`}>
              Precio Caja: ${producto.priceBox.toLocaleString("es-CO")}
            </p>
          )}
          <button
            onClick={handleAgregarAlCarrito}
            // AJUSTE CLAVE AQUÍ: Usar un color rojo más intenso de Tailwind y controlar la opacidad
            // Puedes probar con 'bg-red-700' o 'bg-red-800' para un rojo más intenso.
            // Para la opacidad, Tailwind tiene clases como 'bg-opacity-80', 'bg-opacity-90', etc.
            // O puedes definir un color personalizado en tailwind.config.js si necesitas un RGBa exacto.
            // Por ahora, probemos con un rojo más oscuro y una opacidad alta.
            className="bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out text-lg bg-opacity-90"
          >
            Agregar al Carrito
          </button>
        </>
      )}
    </div>
  );
};

export default TarjetaProducto;
