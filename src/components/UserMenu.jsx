import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./UserMenu.css";
import { UserIcon } from "@heroicons/react/24/solid";

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div className="user-menu-container" ref={menuRef}>
      {/* Aplicamos las mismas clases que los otros íconos principales */}
      <button className="icono-principales" onClick={() => setIsOpen(!isOpen)}> 
        <UserIcon className="icono-usuario-login" /> {/* Usamos la clase original para el ícono de usuario */}
      </button>

      {isOpen && (
        <ul className="user-dropdown-menu">
          <li>
            <Link className="user-dropdown-item" to="/login" onClick={() => setIsOpen(false)}>
              Login
            </Link>
          </li>
          <li>
            <Link className="user-dropdown-item" to="/perfil" onClick={() => setIsOpen(false)}>
              Ver perfil
            </Link>
          </li>
          <li>
            <Link className="user-dropdown-item" to="/logout" onClick={() => setIsOpen(false)}>
              Cerrar sesión
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}

export default UserMenu;