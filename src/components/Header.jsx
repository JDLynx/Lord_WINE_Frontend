import React from 'react';
import { Link } from "react-router-dom";
import './Header.css';
import BotonMenu from './BotonMenu';
import UserMenu from './UserMenu';
import { ShoppingCartIcon, MapPinIcon } from "@heroicons/react/24/solid";

function Header() {
  return (
    <header className="header">
      <div className='header-parte-superior'>

        <div className="header-logos">
          <Link to="/">
            <img src="/img/Logo LORD WINE.png" alt="Logo de LORD WINE" className="logo-lord-wine" />
          </Link>
          <Link to="/">
            <img src="/img/Lord WINE (1).png" alt="Logo persona LORD WINE" className="logo-lord-wine" />
          </Link>
        </div>

        <div className='header-iconos'>

          <Link to="/puntos-venta" className="icono-principales">
            <MapPinIcon className='icono-tiendas' />
          </Link>

          <Link to="/carrito-compras" className="icono-principales">
            <ShoppingCartIcon className='icono-carrito-compras' />
          </Link>

          <UserMenu /> 

          <BotonMenu />

        </div>

      </div>
    </header>
  );
}

export default Header;