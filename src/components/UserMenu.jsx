import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UserMenu.css"; 
import { UserIcon } from "@heroicons/react/24/solid";
import { AuthContext } from "../context/AuthContext";

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/login");
  };
  
  return (
    <div className="user-menu-wrapper" ref={menuRef}>
      <button className="user-menu-button" onClick={() => setIsOpen(!isOpen)}>
        <UserIcon className="user-menu-icon" />
      </button>
      {isOpen && (
        <ul className="user-menu-dropdown">
          {!user && (
            <li>
              <Link className="user-menu-item" to="/login" onClick={() => setIsOpen(false)}>
                Iniciar sesión
              </Link>
            </li>
          )}
          {user && (
            <>
              <li>
                <Link className="user-menu-item" to="/perfil" onClick={() => setIsOpen(false)}>
                  Ver perfil
                </Link>
              </li>
              <li>
                <button className="user-menu-item" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </li>
            </>
          )}
        </ul>
      )}
    </div>
  );
}

export default UserMenu;