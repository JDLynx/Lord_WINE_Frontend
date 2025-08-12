import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";
import "./Contacto.css";

function Contacto()
{
    return(
        <>
        <div className="page-container">

        <Header />
        <BarraProductos />

        

        <main className="main-contacto container mx-auto mt-4 px-4">
            <div className= "p-8 text-white bg-black rounded-[10px]" style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}>
                <h2 className="text-center text-2xl font-semibold">Contacto</h2>
                <form className="flex flex-col gap-4 mt-4">
                <div className="flex flex-wrap gap-4 md:flex-nowrap">
                    {["Nombre", "Correo Electrónico"].map((label, i) => (
                    <div key={i} className="flex flex-col w-full md:w-1/2">
                        <label htmlFor={label.toLowerCase()} className="text-sm font-medium">{label}</label>
                        <input 
                        type={i === 0 ? "text" : "email"} 
                        id={label.toLowerCase()} 
                        placeholder={`Escribe tu ${label.toLowerCase()}`} 
                        required 
                        className="border border-gray-300 rounded-lg p-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-gray-500" />
                    </div>
                    ))}
                </div>
                <div className="flex flex-col w-full">
                    <label htmlFor="mensaje" className="text-sm font-mediu">Mensaje</label>
                    <textarea id="mensaje" rows="4" placeholder="Escribe tu mensaje aquí" required 
                    className="border border-gray-300 rounded-lg p-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-gray-500">
                    </textarea>
                </div>
                <div className="w-full text-center pt-12">
    <button type="submit" className="bg-[#921913] text-white px-6 py-2 rounded-lg">Enviar</button>
</div>

                </form>
            </div>
        </main>

        <Footer />

        </div>
        </>
    )
}

export default Contacto