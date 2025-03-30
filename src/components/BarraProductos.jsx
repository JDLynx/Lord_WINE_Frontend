import React from 'react';
import { Link } from "react-router-dom";
import "./BarraProductos.css";

function BarraProductos()
{
  return(

    <div className="header-parte-inferior">

      <Link to="/vinos" className="btn-productos">
        Vinos
      </Link>

      <Link to="/cremas-whisky" className="btn-productos">
        Cremas de Whisky
      </Link>

      <Link to="/mistelas" className="btn-productos">
        Mistelas
      </Link>

      <Link to="/zumo" className="btn-productos">
        Zumo
      </Link>

      <Link to="/accesorios" className="btn-productos">
        Accesorios
      </Link>

    </div>
  );
}

export default BarraProductos;