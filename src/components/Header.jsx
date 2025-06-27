import React from 'react';
import { Link } from "react-router-dom";
import BotonMenu from './BotonMenu';
import UserMenu from './UserMenu';
import { ShoppingCartIcon, MapPinIcon } from "@heroicons/react/24/solid";

function Header() {
  return (
    <header className="bg-black py-2 md:py-4">
      <div className='flex justify-between items-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>

        <div className="flex items-center gap-4 cursor-pointer">
          <Link to="/">
            <img src="/img/Logo LORD WINE.png" alt="Logo de LORD WINE" className="h-16 md:h-20 lg:h-24" />
          </Link>
          <Link to="/">
            <img src="/img/Lord WINE (1).png" alt="Logo persona LORD WINE" className="h-16 md:h-20 lg:h-24" />
          </Link>
        </div>

        <div className='flex items-center space-x-6'>

          <Link to="/puntos-venta"
                className="flex items-center justify-center p-2 rounded-full text-white hover:text-[#921913] transition duration-300">
            <MapPinIcon className='h-7 w-7' />
          </Link>

          <Link to="/carrito-compras"
                className="flex items-center justify-center p-2 rounded-full text-white hover:text-[#921913] transition duration-300">
            <ShoppingCartIcon className='h-7 w-7' />
          </Link>

          <UserMenu />
          <BotonMenu />

        </div>

      </div>
    </header>
  );
}

export default Header;