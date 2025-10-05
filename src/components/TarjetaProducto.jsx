import React, { useState, useEffect } from "react";
import { usarCarrito } from "../context/ContextoCarrito";
import { ShoppingCart, X } from "lucide-react"; 

const MAX_CANTIDAD = 1000;

const TarjetaProducto = ({ producto, sufijoClaseCategoria }) => {
    const { agregarAlCarrito } = usarCarrito();
    
    // Estados existentes para la tarjeta principal
    const [cantidad, setCantidad] = useState(1); 
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [mensajeAlerta, setMensajeAlerta] = useState("");
    const [esError, setEsError] = useState(false);
    const [mostrarModal, setMostrarModal] = useState(false);

    const [cantidadModal, setCantidadModal] = useState(1); 

    // useEffect para manejar el temporizador de la alerta
    useEffect(() => {
        if (mostrarAlerta) {
            const timer = setTimeout(() => {
                setMostrarAlerta(false);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [mostrarAlerta]);

    // Lógica para aumentar cantidad de la TARJETA
    const handleAumentarCantidad = (event) => {
        event.stopPropagation();
        setCantidad(prev => (prev < MAX_CANTIDAD ? prev + 1 : MAX_CANTIDAD));
    };

    // Lógica para disminuir cantidad de la TARJETA
    const handleDisminuirCantidad = (event) => {
        event.stopPropagation();
        setCantidad(prev => (prev > 1 ? prev - 1 : 1));
    };

    // Función de cambio directo para el input de la TARJETA
    const handleInputCantidadChange = (e) => {
        const rawVal = e.target.value;
        if (rawVal === '') {
            setCantidad(1);
            return;
        }

        let val = parseInt(rawVal);
        if (isNaN(val) || val < 1) {
            val = 1;
        } else if (val > MAX_CANTIDAD) {
            val = MAX_CANTIDAD;
        }
        setCantidad(val);
    };

    // Lógica para aumentar cantidad para el MODAL
    const handleAumentarCantidadModal = () => {
        setCantidadModal(prev => (prev < MAX_CANTIDAD ? prev + 1 : MAX_CANTIDAD));
    };

    // Lógica para disminuir cantidad para el MODAL
    const handleDisminuirCantidadModal = () => setCantidadModal(prev => (prev > 1 ? prev - 1 : 1));

    // Función de cambio directo para el input del MODAL
    const handleInputCantidadModalChange = (e) => {
        const rawVal = e.target.value;
        if (rawVal === '') {
            setCantidadModal(1);
            return;
        }

        let val = parseInt(rawVal);
        if (isNaN(val) || val < 1) {
            val = 1;
        } else if (val > MAX_CANTIDAD) {
            val = MAX_CANTIDAD;
        }
        setCantidadModal(val);
    };


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
        '36': '/img/Ron_medellin_anejo.png',
        '39': '/img/Ron_la_hechicera.png',
        '40': '/img/Zumo_lulo.png',
        '41': '/img/Zumo_guanabana.png',
        '42': '/img/Mistela_mora.png',
        '43': '/img/Mistela_cafe.png',
        '44': '/img/Saint_Brendans_Irish_Cream.png',
        '45': '/img/Kerrygold_Irish_Cream_Liqueur.png',
        '46': '/img/Five_Farms_Irish_Cream.png',
        '48': '/img/Vino_Tinto_Casillero_del_Diablo_Cabernet_Sauvignon.png',
        '49': '/img/Vino_Tinto_Santa_Carolina_Reserva_Merlot.png',
        '50': '/img/Marqués_de_Riscal_Rosado.png',
        '51': '/img/Miraval_Rose.png',
        '52': '/img/Vino_Blanco_Concha_y_Toro.png',
        '53': '/img/Vino_Blanco_Santa_Margherita_Pinot_Grigio.png',
        '54': '/img/Vino_Espumoso_Asti_Spumante.png',
        '55': '/img/Vino_Espumoso_Chandon_Brut.png',
    };

    const imageUrl = productImages[producto.prodIdProducto] || 'https://placehold.co/150x120/E0E0E0/333333?text=No+Imagen';

    // Función de agregar al carrito
    const handleAgregarAlCarrito = (event) => {
        event.stopPropagation();
        
        if (producto.prodConsignacion) {
            setMensajeAlerta(`"${producto.prodNombre}" estará disponible próximamente.`);
            setEsError(true);
            setMostrarAlerta(true);
            setCantidad(1); 
            return;
        }

        const productoParaCarrito = {
            id: producto.prodIdProducto,
            name: producto.prodNombre,
            image: imageUrl,
            price: parseFloat(producto.prodPrecio),
            presentation: producto.prodPresentacion,
        };

        agregarAlCarrito(productoParaCarrito, cantidad);

        setMensajeAlerta(`"${producto.prodNombre}" (${cantidad} unid.) ha sido agregado al carrito.`);
        setEsError(false);
        setMostrarAlerta(true);
        setCantidad(1); // Resetea la cantidad a 1
    };

    // Agregar al carrito desde el MODAL
    const handleAgregarDesdeModal = () => {
        if (producto.prodConsignacion) {
            setMensajeAlerta(`"${producto.prodNombre}" estará disponible próximamente.`);
            setEsError(true);
            setMostrarAlerta(true);
            setCantidadModal(1);
            return;
        }

        const productoParaCarrito = {
            id: producto.prodIdProducto,
            name: producto.prodNombre,
            image: imageUrl,
            price: parseFloat(producto.prodPrecio),
            presentation: producto.prodPresentacion,
        };

        agregarAlCarrito(productoParaCarrito, cantidadModal);

        setMensajeAlerta(`"${producto.prodNombre}" (${cantidadModal} unid.) ha sido agregado al carrito.`);
        setEsError(false);
        setMostrarAlerta(true);
        setCantidadModal(1); // Resetea la cantidad del modal
        setMostrarModal(false); // Cierra el modal tras agregar
    };

    const handleAbrirModal = () => {
        setCantidadModal(1);
        setMostrarModal(true);
    };

    const handleCerrarModal = (event) => {
        if (event.target === event.currentTarget) {
            setMostrarModal(false);
        }
    };

    // Clases CSS
    const cardClassName = `product-card-modern-${sufijoClaseCategoria}`;
    const imageWrapperClassName = `product-image-wrapper-${sufijoClaseCategoria}`;
    const imageClassName = `product-image-${sufijoClaseCategoria}`;
    const nameClassName = `nombre-producto-${sufijoClaseCategoria}`;
    const priceClassName = `price-${sufijoClaseCategoria}`;

    // Componente auxiliar para el selector de cantidad del modal
    const ModalQuantitySelector = () => (
        <div 
            className="flex items-center justify-center w-full max-w-xs mx-auto mb-5"
            onClick={e => e.stopPropagation()}
        >
            {/* Botón Disminuir */}
            <button
                onClick={handleDisminuirCantidadModal}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold w-10 h-10 rounded-full flex items-center justify-center transition duration-150 ease-in-out text-xl focus:outline-none"
                aria-label="Disminuir cantidad"
                disabled={cantidadModal <= 1}
            >
                -
            </button>
            {/* Input */}
            <input
                type="number"
                min="1"
                max={MAX_CANTIDAD} 
                value={cantidadModal}
                onChange={handleInputCantidadModalChange} 
                className="w-16 text-center text-lg font-semibold text-gray-800 focus:outline-none border border-gray-300 rounded-lg py-1 mx-2 appearance-none"
                onClick={e => e.stopPropagation()} 
                aria-label="Cantidad del producto"
                style={{ MozAppearance: 'textfield' }}
            />
            {/* Botón Aumentar */}
            <button
                onClick={handleAumentarCantidadModal}
                disabled={cantidadModal >= MAX_CANTIDAD} 
                className={`font-bold w-10 h-10 rounded-full flex items-center justify-center transition duration-150 ease-in-out text-xl focus:outline-none ${
                    cantidadModal >= MAX_CANTIDAD 
                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                        : 'bg-[#7a1010] hover:bg-[#921913] text-white'
                }`}
                aria-label="Aumentar cantidad"
            >
                +
            </button>
        </div>
    );


    return (
        <>
            {/* Alerta de confirmación/error */}
            {mostrarAlerta && (
                <div className="fixed inset-0 flex items-center justify-center z-[100]">
                    <div className="bg-white p-6 rounded-xl shadow-2xl text-center mx-4 border-t-4 border-[#7a1010]">
                        <p className={`text-xl font-bold ${esError ? "text-red-700" : "text-[#7a1010]"}`}>
                            {mensajeAlerta}
                        </p>
                    </div>
                </div>
            )}

            {/* Tarjeta del producto */}
            <div 
                className={cardClassName}
                onClick={handleAbrirModal}
            >
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
                
                {/* SELECTOR DE CANTIDAD EN LA TARJETA */}
                <div 
                    className="flex items-center justify-between w-full mb-3 px-1"
                    onClick={e => e.stopPropagation()}
                >
                    {/* Botón Disminuir */}
                    <button
                        onClick={handleDisminuirCantidad}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold w-8 h-8 rounded-full flex items-center justify-center transition duration-150 ease-in-out text-xl focus:outline-none"
                        aria-label="Disminuir cantidad"
                    >
                        -
                    </button>
                    {/* Input */}
                    <input
                        type="number"
                        min="1"
                        max={MAX_CANTIDAD} 
                        value={cantidad}
                        onChange={handleInputCantidadChange}
                        className="w-16 text-center text-lg font-semibold text-gray-800 focus:outline-none border border-gray-300 rounded-lg py-1 mx-2"
                        onClick={e => e.stopPropagation()} 
                        aria-label="Cantidad del producto"
                    />
                    {/* Botón Aumentar */}
                    <button
                        onClick={handleAumentarCantidad}
                        disabled={cantidad >= MAX_CANTIDAD}
                        className={`font-bold w-8 h-8 rounded-full flex items-center justify-center transition duration-150 ease-in-out text-xl focus:outline-none ${
                            cantidad >= MAX_CANTIDAD 
                                ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                                : 'bg-[#7a1010] hover:bg-[#921913] text-white'
                        }`}
                        aria-label="Aumentar cantidad"
                    >
                        +
                    </button>
                </div>

                <button
                    onClick={handleAgregarAlCarrito}
                    className="bg-[#7a1010] hover:bg-[#921913] text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out text-lg flex items-center justify-center w-full"
                    disabled={producto.prodConsignacion}
                >
                    <ShoppingCart className="w-5 h-5 mr-1" />
                    {producto.prodConsignacion ? "Próximamente" : "Agregar"}
                </button>
            </div>

            {/* MODAL */}
            {mostrarModal && (
                <div className="fixed inset-0 flex justify-center items-center z-50 p-4">
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-sm" onClick={handleCerrarModal}></div>
                    
                    {/* Contenido del Modal */}
                    <div 
                        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 transform transition-all duration-300"
                        onClick={e => e.stopPropagation()}
                    >
                        
                        {/* Botón de Cierre */}
                        <button
                            onClick={() => setMostrarModal(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-red-700 transition p-2"
                            aria-label="Cerrar modal"
                        >
                            <X className="w-7 h-7" />
                        </button>

                        {/* Título Principal */}
                        <h2 className="text-3xl font-extrabold text-[#7a1010] text-center mb-6">
                            {producto.prodNombre}
                        </h2>

                        <div className="flex flex-col md:flex-row gap-8">
                            
                            {/* IMAGEN PROTAGONISTA */}
                            <div className="w-full md:w-1/2 flex-shrink-0 flex justify-center items-start">
                                <div className="w-full h-auto overflow-hidden rounded-xl shadow-lg bg-gray-50 p-4">
                                    <img 
                                        src={imageUrl} 
                                        alt={producto.prodNombre} 
                                        className="object-contain w-full max-h-[400px] mx-auto rounded-lg" 
                                    />
                                </div>
                            </div>

                            {/* DETALLES Y ACCIONES */}
                            <div className="w-full md:w-1/2 flex flex-col justify-between">
                                
                                {/* SECCIÓN DE DETALLES */}
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Descripción</h3>
                                    <div className="text-gray-600 text-base mb-4 overflow-y-auto max-h-40 pr-2">
                                        <p>{producto.prodDescripcion || "No hay descripción disponible para este producto."}</p>
                                    </div>
                                </div>

                                {/* SECCIÓN DE PRECIO Y ACCIÓN */}
                                <div className="pt-6 mt-6 flex flex-col items-center bg-white p-0">
                                    
                                    {/* PRECIO */}
                                    <div className="text-center mb-4 w-full">
                                        <span className="text-sm font-semibold text-gray-500 block">Precio Unitario</span>
                                        <span className="text-4xl font-extrabold text-green-700">
                                            ${parseFloat(producto.prodPrecio).toLocaleString("es-CO")}
                                        </span>
                                    </div>

                                    {/* SELECTOR DE CANTIDAD */}
                                    <ModalQuantitySelector />

                                    {/* Botón Agregar al Carrito */}
                                    <button
                                        onClick={handleAgregarDesdeModal}
                                        className="bg-[#7a1010] hover:bg-[#921913] text-white font-bold py-3 px-6 rounded-xl transition duration-300 ease-in-out text-xl flex items-center justify-center w-full shadow-lg mt-4"
                                        disabled={producto.prodConsignacion}
                                    >
                                        <ShoppingCart className="w-6 h-6 mr-2" />
                                        {producto.prodConsignacion ? "Próximamente" : `Añadir ${cantidadModal} al Carrito`}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TarjetaProducto;