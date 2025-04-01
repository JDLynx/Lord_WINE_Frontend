import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from '../components/BarraProductos';
import './SobreNosotros.css';

const info = [
    {
        title: 'Nuestra Historia',
        text: 'Lord Wine nació de la pasión por los buenos licores y la búsqueda de ofrecer experiencias únicas a los amantes del vino y otras bebidas premium.',
        image: '../../img/Lord WINE - Nuestra Historia.jpeg',
    },
    {
        title: 'Nuestra Misión',
        text: 'Brindamos una experiencia única con vinos y licores de alta calidad, acompañados de un servicio excepcional.',
        image: '../../img/Lord WINE - Misión.jpg',
    },
    {
        title: 'Nuestra Visión y Valores',
        text: 'Queremos ser la marca líder en vinos y licores, ofreciendo exclusividad y compromiso con el cliente.',
        image: '../../img/Lord WINE - Visión.jpg',
    }
];

function SobreNosotros() {
    return (
        <div className="page-container">
            <Header />
            <BarraProductos />
            
            <main className="sobre-nosotros-main">
                <div className="container">
                    <h2 className="titulo">Conoce más sobre <span className="resaltado">Lord WINE</span></h2>
                    <div className="card-grid">
                        {info.map((item, index) => (
                            <div className="card" key={index}>
                                <img src={item.image} alt={item.title} className="card-img" />
                                <div className="card-body">
                                    <h3 className="card-title">{item.title}</h3>
                                    <p className="card-text">{item.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default SobreNosotros;

