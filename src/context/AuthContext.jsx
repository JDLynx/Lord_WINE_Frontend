import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        const userType = localStorage.getItem("userType");
        if (userId && userType) {
        setUser({ id: userId, role: userType }); 
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("userId", userData.id);
        localStorage.setItem("userType", userData.role);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("userId");
        localStorage.removeItem("userType");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
};