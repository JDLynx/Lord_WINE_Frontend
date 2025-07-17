// src/context/ContextoCarrito.js
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

const ContextoCarrito = createContext();

// Función auxiliar para obtener el token del localStorage (ajusta según tu implementación de autenticación)
const getToken = () => {
  // Asume que tu token JWT se guarda en localStorage bajo la clave 'token'
  // Si lo guardas con otro nombre o en otro lugar (e.g., sessionStorage, un contexto de autenticación), ajústalo aquí.
  return localStorage.getItem('token');
};

const API_BASE_URL = 'http://localhost:3000/api/carritos'; // Asegúrate de que esta URL sea correcta

export const ProveedorCarrito = ({ children }) => {
  const [itemsCarrito, setItemsCarrito] = useState([]);
  const [loading, setLoading] = useState(true); // Nuevo estado para controlar la carga inicial del carrito
  const [error, setError] = useState(null); // Nuevo estado para manejar errores de la API

  // Función para cargar el carrito desde el backend
  const cargarCarritoDesdeBackend = useCallback(async () => {
    setLoading(true);
    setError(null);
    const token = getToken();

    if (!token) {
      // Si no hay token, el usuario no está logueado, el carrito estará vacío en el frontend
      setItemsCarrito([]);
      setLoading(false);
      console.log("No hay token, el carrito se mantendrá vacío o no se cargará del backend.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/client-cart`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
            // Token inválido/expirado o no autorizado, probablemente el usuario necesite loguearse de nuevo
            console.error("Error de autenticación al cargar el carrito. Redirigir a login o limpiar sesión.");
            // Aquí podrías disparar un logout o redirección a la página de login
            // Por ahora, simplemente vaciamos el carrito local.
            setItemsCarrito([]);
            return;
        }
        const errorData = await response.json();
        throw new Error(errorData.error || `Error al obtener el carrito: ${response.statusText}`);
      }

      const data = await response.json();
      // El backend devuelve { cart: { items: [], total: X } }
      setItemsCarrito(data.cart.items || []); // Asegurarse de que items sea un array
    } catch (err) {
      console.error("Error al cargar el carrito del backend:", err);
      setError(err.message || "Error al cargar el carrito.");
      setItemsCarrito([]); // Vaciar el carrito en caso de error
    } finally {
      setLoading(false);
    }
  }, []); // Dependencias vacías porque getToken() y API_BASE_URL son constantes o se manejan fuera de este scope

  // Cargar el carrito al montar el componente (y cada vez que se necesite recargar)
  useEffect(() => {
    cargarCarritoDesdeBackend();
  }, [cargarCarritoDesdeBackend]); // Se ejecuta una vez al montar y cuando cargarCarritoDesdeBackend cambie (aunque es useCallback)


  // Función para agregar un producto al carrito
  const agregarAlCarrito = async (producto) => {
    const token = getToken();
    if (!token) {
      alert("Debes iniciar sesión para añadir productos al carrito.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: producto.id, quantity: 1 }), // Siempre añadir 1 al llamar desde un botón "añadir"
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al añadir producto al carrito.");
      }

      // Si la operación en el backend fue exitosa, recargar el carrito
      await cargarCarritoDesdeBackend();
      alert("Producto añadido al carrito exitosamente.");
    } catch (err) {
      console.error("Error al añadir al carrito:", err);
      alert(err.message || "No se pudo añadir el producto al carrito. Verifica el stock o intenta de nuevo.");
    }
  };

  // Función para remover un producto del carrito
  const eliminarDelCarrito = async (productId) => {
    const token = getToken();
    if (!token) {
      alert("Debes iniciar sesión para modificar el carrito.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/remove/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al eliminar producto del carrito.");
      }

      await cargarCarritoDesdeBackend();
      alert("Producto eliminado del carrito.");
    } catch (err) {
      console.error("Error al eliminar del carrito:", err);
      alert(err.message || "No se pudo eliminar el producto del carrito.");
    }
  };

  // Función para actualizar la cantidad de un producto
  const actualizarCantidad = async (productId, newQuantity) => {
    const token = getToken();
    if (!token) {
      alert("Debes iniciar sesión para modificar el carrito.");
      return;
    }

    if (newQuantity < 0) {
      alert("La cantidad no puede ser negativa.");
      return;
    }

    // Si la nueva cantidad es 0, llamamos a eliminarDelCarrito
    if (newQuantity === 0) {
      await eliminarDelCarrito(productId);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/update/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ newQuantity }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al actualizar la cantidad del producto.");
      }

      await cargarCarritoDesdeBackend();
      alert("Cantidad de producto actualizada.");
    } catch (err) {
      console.error("Error al actualizar cantidad:", err);
      alert(err.message || "No se pudo actualizar la cantidad del producto. Verifica el stock o intenta de nuevo.");
    }
  };

  // Función para vaciar completamente el carrito
  const vaciarCarrito = async () => {
    const token = getToken();
    if (!token) {
      alert("Debes iniciar sesión para vaciar el carrito.");
      return;
    }

    if (!window.confirm("¿Estás seguro de que quieres vaciar todo el carrito?")) {
        return; // El usuario canceló la acción
    }

    try {
      const response = await fetch(`${API_BASE_URL}/clear`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al vaciar el carrito.");
      }

      await cargarCarritoDesdeBackend(); // Recargar el carrito (ahora vacío)
      alert("Carrito vaciado exitosamente.");
    } catch (err) {
      console.error("Error al vaciar el carrito:", err);
      alert(err.message || "No se pudo vaciar el carrito.");
    }
  };

  // useEffect para manejar localStorage ya no es necesario para itemsCarrito,
  // porque el estado ahora se sincroniza con el backend.
  // Sin embargo, podrías querer guardar el total o un indicador de si hay ítems.

  return (
    <ContextoCarrito.Provider value={{ itemsCarrito, agregarAlCarrito, eliminarDelCarrito, actualizarCantidad, vaciarCarrito, loading, error }}>
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