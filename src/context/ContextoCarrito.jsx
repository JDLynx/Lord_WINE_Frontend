import React, { createContext, useState, useContext, useEffect } from 'react';

const ContextoCarrito = createContext();

export const ProveedorCarrito = ({ children }) => {
  // Inicializar el carrito desde localStorage o un array vacío
  const [itemsCarrito, setItemsCarrito] = useState(() => {
    try {
      const dataLocal = localStorage.getItem('itemsCarrito');
      return dataLocal ? JSON.parse(dataLocal) : [];
    } catch (error) {
      console.error("Error al leer itemsCarrito de localStorage:", error);
      return [];
    }
  });

  // Guardar el carrito en localStorage cada vez que cambie
  useEffect(() => {
    try {
      localStorage.setItem('itemsCarrito', JSON.stringify(itemsCarrito));
    } catch (error) {
      console.error("Error al guardar itemsCarrito en localStorage:", error);
    }
  }, [itemsCarrito]);

  // Función para agregar un producto al carrito
  const agregarAlCarrito = (producto) => {
    setItemsCarrito((prevItems) => {
      const itemExistente = prevItems.find((item) => item.id === producto.id);

      if (itemExistente) {
        return prevItems.map((item) =>
          item.id === producto.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Asegurarse de que el precio sea un número y el quantity sea 1 inicialmente
        const precio = parseFloat(producto.price);
        return [...prevItems, { ...producto, price: isNaN(precio) ? 0 : precio, quantity: 1 }];
      }
    });
  };

  // Función para remover un producto del carrito
  const eliminarDelCarrito = (productoId) => {
    setItemsCarrito((prevItems) => prevItems.filter((item) => item.id !== productoId));
  };

  const actualizarCantidad = (productoId, nuevaCantidad) => {
    setItemsCarrito((prevItems) =>
      prevItems.map((item) =>
        item.id === productoId ? { ...item, quantity: nuevaCantidad } : item
      ).filter(item => item.quantity > 0) // Eliminar si la cantidad llega a 0
    );
  };

  const vaciarCarrito = () => {
    setItemsCarrito([]);
  };

  return (
    <ContextoCarrito.Provider value={{ itemsCarrito, agregarAlCarrito, eliminarDelCarrito, actualizarCantidad, vaciarCarrito }}>
      {children}
    </ContextoCarrito.Provider>
  );
};

export const usarCarrito = () => {
  const contexto = useContext(ContextoCarrito);
  if (contexto === undefined) {
    throw new Error('usarCarrito debe usarse dentro de un ProveedorCarrito');
  }
  return contexto;
};