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

                    <button className="btn-redondo">
                        <MapPinIcon className='icono-tiendas'/>
                    </button>

                    <button className="btn-redondo">
                        <ShoppingCartIcon className='icono-carrito-compras'/>
                    </button>

                    <button className="btn-redondo">
                        <UserIcon className='icono-usuario-login'/>
                    </button>

                    <BotonMenu />

                </div>

            </div>

            <div className='header-parte-inferior'>
                
                <button class="btn-productos" id="btnVinos">
                    Vinos
                </button>

                <button class="btn-productos" id="btnCremasWhisky">
                    Cremas de Whisky
                </button>

                <button class="btn-productos" id="btnMistelas">
                    Mistelas
                </button>

                <button class="btn-productos" id="btnZumo">
                    Zumos
                </button>

                <button class="btn-productos" id="btnAccesorios">
                    Accesorios
                </button>

            </div>

        </header>
    );
}

export default Header;