// Importa los estilos globales de la aplicación
import "./App.css";

// Importa los componentes de enrutamiento desde React Router
import { Routes, Route } from "react-router-dom";

// Vistas principales accesibles desde el encabezado
import Home from "./vistas/Home";
import PuntosVenta from "./vistas/PuntosVenta";
import CarritoCompras from "./vistas/CarritoCompras";
import Login from "./vistas/Login";
import Registro from "./vistas/Registro"; // Importa el componente Registro

// Vistas accesibles desde el menú lateral o botones de navegación
import Album from "./vistas/Album";
import Contacto from "./vistas/Contacto";
import ServiciosEmpresariales from "./vistas/ServiciosEmpresariales";
import SobreNosotros from "./vistas/SobreNosotros";
import PerfilAdministrador from "./vistas/PerfilAdministrador";
import GestioUsuario from "./vistas/GestioUsuario";

// Vistas relacionadas con las categorías de productos (barra de navegación por producto)
import Vinos from "./vistas/Vinos";
import CremasWhisky from "./vistas/CremasWhisky";
import Mistelas from "./vistas/Mistelas";
import Zumo from "./vistas/Zumo";
import Accesorios from "./vistas/Accesorios";

// Componente principal de rutas
function App()
{
  return (
    <Routes>
      {/* Rutas principales del sitio (Header) */}
      <Route path="/" element={<Home />} />
      <Route path="/puntos-venta" element={<PuntosVenta />} />
      <Route path="/carrito-compras" element={<CarritoCompras />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} /> {/* Nueva ruta para el componente Registro */}

      {/* Rutas accesibles desde el menú o secciones informativas */}
      <Route path="/album" element={<Album />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/servicios-empresariales" element={<ServiciosEmpresariales />} />
      <Route path="/sobre-nosotros" element={<SobreNosotros />} />
<<<<<<< HEAD
      <Route path="/perfil" element={<PerfilAdministrador />} />
      <Route path="/gestion-usuario" element={<GestioUsuario/>} />
=======
      <Route path="/perfil" element={<PerfilAdministrador />} /> {/* Vista del perfil del administrador */}
      <Route path="/gestion-usuario" element={<GestioUsuario />} />
>>>>>>> 0599dab (Comentarios en el código)

      {/* Rutas de navegación de productos (categorías) */}
      <Route path="/vinos" element={<Vinos />} />
      <Route path="/cremas-whisky" element={<CremasWhisky />} />
      <Route path="/mistelas" element={<Mistelas />} />
      <Route path="/zumo" element={<Zumo />} />
      <Route path="/accesorios" element={<Accesorios />} />
    </Routes>
  );
}

export default App;