import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./BarraProductos.css";

function BarraProductos()
{
  // Estado para controlar la visibilidad del menú desplegable de vinos
  const [isVinosDropdownOpen, setIsVinosDropdownOpen] = useState(false);

  return(
    <div className="header-parte-inferior">

      {/* Contenedor para el enlace de Vinos y su menú desplegable */}
      <div 
        className="menu-container dropdown"
        onMouseEnter={() => setIsVinosDropdownOpen(true)}
        onMouseLeave={() => setIsVinosDropdownOpen(false)}
      >
        {/* Ahora el botón "Vinos" es un enlace que te lleva a la vista de vinos */}
        <Link to="/vinos" className="btn-productos dropbtn">
          Vinos
        </Link>
        
        {/* El menú desplegable se muestra al pasar el mouse por encima del contenedor */}
        {isVinosDropdownOpen && (
          <ul className="dropdown-menu">
            <li><Link to="/vinos-tintos" className="dropdown-item">Vinos Tintos</Link></li>
            <li><Link to="/vinos-rosados" className="dropdown-item">Vinos Rosados</Link></li>
            <li><Link to="/vinos-blancos" className="dropdown-item">Vinos Blancos</Link></li>
            <li><Link to="/espumosos" className="dropdown-item">Espumosos</Link></li>
          </ul>
        )}
      </div>

      {/* Los demás botones de la barra de productos permanecen igual */}
      <Link to="/cremas-whisky" className="btn-productos">
        Cremas de Whisky
      </Link>

      <Link to="/mistelas" className="btn-productos">
        Mistelas
      </Link>

      <Link to="/zumo" className="btn-productos">
        Zumo
      </Link>

      <Link to="/ron" className="btn-productos">
        Ron
      </Link>

    </div>
  );
}

export default BarraProductos;
