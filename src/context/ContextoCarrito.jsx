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
  const agregarAlCarrito = (producto, quantityToAdd = 1) => {
    setItemsCarrito((prevItems) => {
      const itemExistente = prevItems.find((item) => item.id === producto.id);
      
      // Asegurarse de que la cantidad a agregar es válida
      const cantidadAAgregar = Math.max(1, parseInt(quantityToAdd));

      if (itemExistente) {
        // Si existe, suma la cantidad seleccionada
        return prevItems.map((item) =>
          item.id === producto.id ? { ...item, quantity: item.quantity + cantidadAAgregar } : item
        );
      } else {
        // Si es nuevo, lo agrega con la cantidad seleccionada
        const precio = parseFloat(producto.price);
        return [
          ...prevItems, 
          { 
            ...producto, 
            price: isNaN(precio) ? 0 : precio, 
            quantity: cantidadAAgregar 
          }
        ];
      }
    });
  };

  // Función para remover un producto del carrito
  const eliminarDelCarrito = (productoId) => {
    setItemsCarrito((prevItems) => prevItems.filter((item) => item.id !== productoId));
  };

  // Función para actualizar la cantidad de un producto
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