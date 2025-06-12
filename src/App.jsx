import "./App.css";
import { Routes, Route } from "react-router-dom";

// Rutas Header
import Home from "./vistas/Home";
import PuntosVenta from "./vistas/PuntosVenta";
import CarritoCompras from "./vistas/CarritoCompras";
import Login from "./vistas/Login";
import Registro from "./vistas/Registro"; // Importa el componente Registro

// Rutas BotonMenu
import Album from "./vistas/Album";
import Contacto from "./vistas/Contacto";
import ServiciosEmpresariales from "./vistas/ServiciosEmpresariales";
import SobreNosotros from "./vistas/SobreNosotros";
import PerfilAdministrador from "./vistas/PerfilAdministrador";
import GestioUsuario from "./vistas/GestioUsuario";

// Rutas BarraProductos
import Vinos from "./vistas/Vinos";
import CremasWhisky from "./vistas/CremasWhisky";
import Mistelas from "./vistas/Mistelas";
import Zumo from "./vistas/Zumo";
import Accesorios from "./vistas/Accesorios";


function App() {
  return (
    <Routes>
      {/* Rutas Header */}
      <Route path="/" element={<Home />} />
      <Route path="/puntos-venta" element={<PuntosVenta />} />
      <Route path="/carrito-compras" element={<CarritoCompras />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} /> {/* Nueva ruta para el componente Registro */}

      {/* Rutas BotonMenu */}
      <Route path="/album" element={<Album />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/servicios-empresariales" element={<ServiciosEmpresariales />} />
      <Route path="/sobre-nosotros" element={<SobreNosotros />} />
      <Route path="/perfil" element={<PerfilAdministrador />} />
      <Route path="/gestion-usuario" element={<GestioUsuario/>} />

      {/* Rutas BarraProductos */}
      <Route path="/vinos" element={<Vinos />} />
      <Route path="/cremas-whisky" element={<CremasWhisky />} />
      <Route path="/mistelas" element={<Mistelas />} />
      <Route path="/zumo" element={<Zumo />} />
      <Route path="/accesorios" element={<Accesorios />} />
    </Routes>
  );
}

export default App;
