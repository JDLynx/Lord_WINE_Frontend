import React from 'react';
import { usarCarrito } from '../context/ContextoCarrito';

const TarjetaProducto = ({ producto, sufijoClaseCategoria }) => {
  const { agregarAlCarrito } = usarCarrito();

  const handleAgregarAlCarrito = () => {
    if (producto.comingSoon) {
      alert(`"${producto.name}" estará disponible próximamente.`);
      return;
    }
    agregarAlCarrito(producto);
    alert(`"${producto.name}" ha sido agregado al carrito.`);
  };

  const cardClass = `product-card-modern-${sufijoClaseCategoria}`;
  const imageClass = `product-image-${sufijoClaseCategoria}`;
  const nameClass = `nombre-producto-${sufijoClaseCategoria}`;
  const detailClass = `detalle-${sufijoClaseCategoria}`;
  const priceClass = `price-${sufijoClaseCategoria}`;

  return (
    <div className={cardClass}>
      <img src={producto.image} alt={producto.name} className={imageClass} />
      <h5 className={nameClass}>{producto.name}</h5>
      {producto.description && <p className={detailClass}>{producto.description}</p>}
      {producto.presentation && <p className={detailClass}>{producto.presentation}</p>}

      {producto.comingSoon ? (
        <p className="text-lg font-bold text-gray-500 mt-4">Próximamente</p>
      ) : (
        <>
          {producto.price !== undefined && producto.price !== null && (
            <p className={priceClass}>
              Precio Detal: ${producto.price.toLocaleString('es-CO')}
            </p>
          )}
          {producto.priceBox !== undefined && producto.priceBox !== null && (
            <p className={priceClass}>
              Precio Caja: ${producto.priceBox.toLocaleString('es-CO')}
            </p>
          )}
          {/* Eliminado 'mt-4' para ajustar el espaciado y cambiado a rojo */}
          <button
            onClick={handleAgregarAlCarrito}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
          >
            Agregar al Carrito
          </button>
        </>
      )}
    </div>
  );
};

export default TarjetaProducto;