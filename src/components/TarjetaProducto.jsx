import React from "react";
import { usarCarrito } from "../context/ContextoCarrito";

const TarjetaProducto = ({ producto, sufijoClaseCategoria }) => {
  const { agregarAlCarrito } = usarCarrito();

  // Objeto de mapeo de prodIdProducto a URLs de imágenes
  const productImages = {
    '1': '/img/Vino_dulce_Isabela.png', 
    '2': '/img/Mistela Lulo.png',
    '3': '/img/Mistela de durazno y canela.png',
    '4': '/img/Zumo De Uva.png',
    '5': '/img/Vino_Tinto_Carmenere.png',
    '11': '/img/Vino Encanto del Valle.png',
    '12': '/img/Vino Encanto Del Valle Mini.png',
    '14': '/img/Finca Moras Malbec.png',
    '15': '/img/Alma Mora.png',
    '16': '/img/Santa Carolina Rose.png',
    '17': '/img/JP Chenet Cinsault Granache.png',
    '18': '/img/Ramon Bilbao Verdejo.png',
    '19': '/img/Jp Chenet Chardonnay.png',
    '20': '/img/Torrontes.png',
    '21': '/img/Freixenet Brut.png',
    '22': '/img/Prosecco Mionetto Piccini.png',
    '24': '/img/Champagne vueve clicquot.png',
    '25': '/img/Mistela de durazno y canela.png',
    '26': '/img/Zumo integral de maracuya.png',
    '27': '/img/Zumo integral de Mandarina.png',
    '28': '/img/Baileys Irish Cream.png',
    '29': '/img/Carolans Irish Cream.png',
    '30': '/img/Havana club añejo especial.png',
    '32': '/img/Ron_Hacienda_Calibio_Px.png',
    '33': '/img/Viejo de caldas_8_anos.png',
    '36': '/img/Aguardiente Caucano Tradicional.png',
  };

  // Obtiene la URL de la imagen del mapeo
  const imageUrl = productImages[producto.prodIdProducto] || 'https://placehold.co/150x120/E0E0E0/333333?text=No+Imagen';

  const handleAgregarAlCarrito = () => {
    if (producto.prodConsignacion) {
      alert(`"${producto.prodNombre}" estará disponible próximamente.`);
      return;
    }
    agregarAlCarrito(producto);
    alert(`"${producto.prodNombre}" ha sido agregado al carrito.`);
  };

  // Construcción de clases más directa
  // Ahora, las clases se construyen directamente usando el sufijo
  const cardClassName = `product-card-modern-${sufijoClaseCategoria}`;
  const imageWrapperClassName = `product-image-wrapper-${sufijoClaseCategoria}`; 
  const imageClassName = `product-image-${sufijoClaseCategoria}`;
  const nameClassName = `nombre-producto-${sufijoClaseCategoria}`;
  const priceClassName = `price-${sufijoClaseCategoria}`;

  return (
    <div className={cardClassName}> {/* Se uso la variable directa */}
      <div className={imageWrapperClassName}> {/* Se uso la variable directa */}
        <img 
          src={imageUrl} 
          alt={producto.prodNombre} 
          className={imageClassName}
        />
      </div>
      <h5 className={`${nameClassName} text-lg`}>{producto.prodNombre}</h5> {/* Se uso la variable directa */}
      
      {producto.prodPrecio !== undefined && producto.prodPrecio !== null && (
        <p className={`${priceClassName} text-base`}> {/* Se uso la variable directa */}
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
