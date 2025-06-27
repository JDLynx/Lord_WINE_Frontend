import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bars3Icon } from "@heroicons/react/24/solid";

function BotonMenu() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                className="flex items-center justify-center p-2 rounded-full text-white hover:text-[#921913] transition duration-300 focus:outline-none focus:ring-0 focus:shadow-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Bars3Icon className="h-7 w-7" />
            </button>

            {isOpen && (
                <ul className="absolute right-0 mt-2 w-48 bg-white/90 rounded-md shadow-lg py-1 z-50 list-none flex flex-col text-left whitespace-nowrap">
                    <li><Link className="block px-4 py-2 text-sm text-black hover:bg-gray-100 hover:text-[#921913]" to="/" onClick={() => setIsOpen(false)}>Inicio</Link></li>
                    <li><Link className="block px-4 py-2 text-sm text-black hover:bg-gray-100 hover:text-[#921913]" to="/album" onClick={() => setIsOpen(false)}>Álbum</Link></li>
                    <li><Link className="block px-4 py-2 text-sm text-black hover:bg-gray-100 hover:text-[#921913]" to="/contacto" onClick={() => setIsOpen(false)}>Contacto</Link></li>
                    <li><Link className="block px-4 py-2 text-sm text-black hover:bg-gray-100 hover:text-[#921913]" to="/servicios-empresariales" onClick={() => setIsOpen(false)}>Servicios empresariales</Link></li>
                    <li><Link className="block px-4 py-2 text-sm text-black hover:bg-gray-100 hover:text-[#921913]" to="/sobre-nosotros" onClick={() => setIsOpen(false)}>Sobre nosotros</Link></li>
                </ul>
            )}
        </div>
    );
}

export default BotonMenu;