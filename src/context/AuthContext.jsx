import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

const getUserFromToken = (token) => {
    try {
        const decoded = jwtDecode(token);

        const now = Date.now() / 1000;
        if (decoded.exp && decoded.exp < now) {
        console.warn("Token expirado");
        return null;
        }

        return {
        id: decoded.id,
        role: decoded.rol,
        };
    } catch (error) {
        console.error("Token inválido:", error);
        return null;
    }
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
        const userData = getUserFromToken(token);
        if (userData) {
            setUser(userData);
        } else {
            localStorage.removeItem("token");
        }
        }
    }, []);

    const login = (token) => {
        const userData = getUserFromToken(token);
        if (userData) {
        setUser(userData);
        localStorage.setItem("token", token);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");

        localStorage.removeItem("adminCodAdministrador");
        localStorage.removeItem("employeeCod");
        localStorage.removeItem("clienteCodCliente");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
};