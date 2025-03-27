import React from 'react';
import './Header.css';
import BotonMenu from './BotonMenu';
import {ShoppingCartIcon, MapPinIcon, UserIcon, Bars3Icon} from "@heroicons/react/24/solid";

function Header()
{
    return (
        <header className="header">

            <div className='header-parte-superior'>

                <div className="header-logos">
                    <img src="/img/Logo LORD WINE.png" alt="Logo de LORD WINE" className="logo-lord-wine"/>
                    <img src="/img/Lord WINE (1).png" alt="Logo persona LORD WINE" className="logo-lord-wine"/>
                </div>

                <div className='header-iconos'>

                    <button className="icono-principales">
                        <MapPinIcon className='icono-tiendas'/>
                    </button>

                    <button className="icono-principales">
                        <ShoppingCartIcon className='icono-carrito-compras'/>
                    </button>

                    <button className="icono-principales">
                        <UserIcon className='icono-usuario-login'/>
                    </button>

                    <BotonMenu />

                </div>

            </div>

            
        </header>
    );
}

export default Header;