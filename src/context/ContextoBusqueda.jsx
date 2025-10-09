import React, { createContext, useState, useContext } from 'react';

const ContextoBusqueda = createContext();

export const ProveedorBusqueda = ({ children }) => {
    // Estado que almacena el texto que el usuario introduce en el buscador.
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <ContextoBusqueda.Provider value={{ searchQuery, setSearchQuery }}>
            {children}
        </ContextoBusqueda.Provider>
    );
};

export const usarBusqueda = () => {
    const context = useContext(ContextoBusqueda);
    if (context === undefined) {
        throw new Error('usarBusqueda debe ser usado dentro de un ProveedorBusqueda');
    }
    return context;
};