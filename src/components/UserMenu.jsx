import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    <div className="relative" ref={menuRef}>
      <button
        className="flex items-center justify-center p-2 rounded-full text-white hover:text-[#921913] transition duration-300 focus:outline-none focus:ring-0 focus:shadow-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <UserIcon className="h-7 w-7 mt-0.5" />
      </button>

      {isOpen && (
        <ul className="absolute right-0 mt-2 w-48 bg-white/90 rounded-md shadow-lg py-1 z-50 list-none flex flex-col text-left whitespace-nowrap">
          {!user && (
            <li>
              <Link className="block px-4 py-2 text-sm text-black hover:bg-gray-100 hover:text-[#921913]" to="/login" onClick={() => setIsOpen(false)}>
                Iniciar sesión
              </Link>
            </li>
          )}
          {user && (
            <>
              <li>
                <Link className="block px-4 py-2 text-sm text-black hover:bg-gray-100 hover:text-[#921913]" to="/perfil" onClick={() => setIsOpen(false)}>
                  Ver perfil
                </Link>
              </li>
              <li>
                <button className="block w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100 hover:text-[#921913]" onClick={handleLogout}>
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