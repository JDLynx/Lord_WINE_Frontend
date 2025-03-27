import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";
import "./Mistelas.css";

function Mistelas() {
    return(
        <>
        <div className="page-container">

        <Header />
        <BarraProductos />

        <main>Desarrollar el contenido</main>

        <Footer />

        </div>
        </>
    )
}

export default Mistelas