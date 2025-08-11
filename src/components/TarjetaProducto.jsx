import React, { useState, useEffect } from "react";
import { usarCarrito } from "../context/ContextoCarrito";

const TarjetaProducto = ({ producto, sufijoClaseCategoria }) => {
  const { agregarAlCarrito } = usarCarrito();
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [mensajeAlerta, setMensajeAlerta] = useState("");
  const [esError, setEsError] = useState(false);

  // useEffect para manejar el temporizador de la alerta
  useEffect(() => {
    if (mostrarAlerta) {
      const timer = setTimeout(() => {
        setMostrarAlerta(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [mostrarAlerta]);

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

  // Función corregida
  const handleAgregarAlCarrito = () => {
    // Si el producto está en consignación, no se puede agregar
    if (producto.prodConsignacion) {
      setMensajeAlerta(`"${producto.prodNombre}" estará disponible próximamente.`);
      setEsError(true);
      setMostrarAlerta(true);
      return;
    }

    // Se crea un nuevo objeto con los nombres de propiedades correctos para el carrito
    const productoParaCarrito = {
      id: producto.prodIdProducto,
      name: producto.prodNombre,
      image: imageUrl,
      price: parseFloat(producto.prodPrecio),
      presentation: producto.prodPresentacion, // Incluimos la presentación si existe
    };

    // Llamamos a la función del contexto con el objeto corregido
    agregarAlCarrito(productoParaCarrito);

    setMensajeAlerta(`"${producto.prodNombre}" ha sido agregado al carrito.`);
    setEsError(false);
    setMostrarAlerta(true);
  };

  // Construcción de clases más directa
  const cardClassName = `product-card-modern-${sufijoClaseCategoria}`;
  const imageWrapperClassName = `product-image-wrapper-${sufijoClaseCategoria}`; 
  const imageClassName = `product-image-${sufijoClaseCategoria}`;
  const nameClassName = `nombre-producto-${sufijoClaseCategoria}`;
  const priceClassName = `price-${sufijoClaseCategoria}`;

  return (
    <>
      {mostrarAlerta && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center mx-4">
            <p className={`text-xl font-bold ${esError ? "text-red-700" : "text-[#7a1010]"}`}>
              {mensajeAlerta}
            </p>
          </div>
        </div>
      )}

      <div className={cardClassName}>
        <div className={imageWrapperClassName}>
          <img 
            src={imageUrl} 
            alt={producto.prodNombre} 
            className={imageClassName}
          />
        </div>
        <h5 className={`${nameClassName} text-lg`}>{producto.prodNombre}</h5>
        
        {producto.prodPrecio !== undefined && producto.prodPrecio !== null && (
          <p className={`${priceClassName} text-base`}>
            <span className="text-black">Precio: </span>
            <span className="text-green-700">${parseFloat(producto.prodPrecio).toLocaleString("es-CO")}</span>
          </p>
        )}

        <button
          onClick={handleAgregarAlCarrito}
          className="bg-[#7a1010] hover:bg-[#921913] text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out text-lg"
        >
          Agregar al Carrito
        </button>
      </div>
    </>
  );
};

export default TarjetaProducto;