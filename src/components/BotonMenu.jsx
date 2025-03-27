import React, { useState } from "react";
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
                    <li><a className="dropdown-item" href="#">Inicio</a></li>
                    <li><a className="dropdown-item" href="#">Álbum</a></li>
                    <li><a className="dropdown-item" href="#">Contacto</a></li>
                    <li><a className="dropdown-item" href="#">Servicios empresariales</a></li>
                    <li><a className="dropdown-item" href="#">Sobre nosotros</a></li>
                </ul>
            )}

        </div>
    );
}

export default BotonMenu;