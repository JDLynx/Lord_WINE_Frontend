import React from 'react';
import "./BarraProductos.css";

function BarraProductos()
{
  return(

    <div className="header-parte-inferior">

      <button className="btn-productos" id="btnVinos">
        Vinos
      </button>

      <button className="btn-productos" id="btnCremasWhisky">
        Cremas de Whisky
      </button>

      <button className="btn-productos" id="btnMistelas">
        Mistelas
      </button>

      <button className="btn-productos" id="btnZumo">
        Zumos
      </button>

      <button className="btn-productos" id="btnAccesorios">
        Accesorios
      </button>

    </div>
  );
}

export default BarraProductos;