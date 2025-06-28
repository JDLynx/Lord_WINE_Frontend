import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./BotonMenu.css";
import { Bars3Icon } from "@heroicons/react/24/solid";

function BotonMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {

        function handleClickOutside(event) {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
        }
        }

        document.addEventListener("mousedown", handleClickOutside);
        
        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="menu-container" ref={menuRef}>
        <button className="btn-redondo" onClick={() => setIsOpen(!isOpen)}>
            <Bars3Icon className="icono-menu" />
        </button>

        {isOpen && (
            <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to="/">Inicio</Link></li>
            <li><Link className="dropdown-item" to="/album">Álbum</Link></li>
            <li><Link className="dropdown-item" to="/contacto">Contacto</Link></li>
            <li><Link className="dropdown-item" to="/servicios-empresariales">Servicios empresariales</Link></li>
            <li><Link className="dropdown-item" to="/sobre-nosotros">Sobre nosotros</Link></li>
            </ul>
        )}
        </div>
    );
}

export default BotonMenu;