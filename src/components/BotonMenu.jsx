import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./BotonMenu.css";
import { Bars3Icon } from "@heroicons/react/24/solid";

function BotonMenu()
{
    const[isOpen, setIsOpen]=useState(false);

    return(
        <div className="menu-container">

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
                    <li>{/* ✅ NUEVO ENLACE: Perfil del Administrador */}<Link to="/perfil" className="dropdown-item">Perfil Admin</Link></li>
                    <li><Link className="dropdown-item" to="/gestion-usuario">Gestion Usuario</Link></li>
                </ul>
            )}

        </div>
    );
}

export default BotonMenu;