import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./BarraProductos.css";

function BarraProductos()
{
  const [isVinosDropdownOpen, setIsVinosDropdownOpen] = useState(false);

  return(
    <div className="header-parte-inferior">

      <div 
        className="menu-container dropdown"
        onMouseEnter={() => setIsVinosDropdownOpen(true)}
        onMouseLeave={() => setIsVinosDropdownOpen(false)}
      >
        <Link to="/vinos" className="btn-productos dropbtn">
          Vinos
        </Link>
        {isVinosDropdownOpen && (
          <ul className="dropdown-menu">
            <li><Link to="/vinos-tintos" className="dropdown-item">Vinos Tintos</Link></li>
            <li><Link to="/vinos-rosados" className="dropdown-item">Vinos Rosados</Link></li>
            <li><Link to="/vinos-blancos" className="dropdown-item">Vinos Blancos</Link></li>
            <li><Link to="/espumosos" className="dropdown-item">Espumosos</Link></li>
          </ul>
        )}
      </div>

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
