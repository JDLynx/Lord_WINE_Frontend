import "./App.css";

// Importa los componentes de enrutamiento desde React Router
import { Routes, Route } from "react-router-dom";

// Vistas principales accesibles desde el encabezado
import Home from "./vistas/Home";
import PuntosVenta from "./vistas/PuntosVenta";
import CarritoCompras from "./vistas/CarritoCompras";
import Login from "./vistas/Login";
import Registro from "./vistas/Registro";

// Vistas accesibles desde el menú lateral o botones de navegación
import Album from "./vistas/Album";
import Contacto from "./vistas/Contacto";
import ServiciosEmpresariales from "./vistas/ServiciosEmpresariales";
import SobreNosotros from "./vistas/SobreNosotros";
import PerfilAdministrador from "./vistas/PerfilAdministrador";
import GestioUsuario from "./vistas/GestioUsuario";
import EditarPerfil from "./vistas/EditarPerfil";
import CambiarContraseña from "./components/CambiarContraseña";

// Vistas relacionadas con las categorías de productos (barra de navegación por producto)
import Vinos from "./vistas/Vinos";
import CremasWhisky from "./vistas/CremasWhisky";
import Mistelas from "./vistas/Mistelas";
import Zumo from "./vistas/Zumo";
import Accesorios from "./vistas/Accesorios";

// IMPORTACIONES DE VISTAS DE ADMINISTRACIÓN (ya existentes)
import GestionAdministradores from "./vistas/GestionAdministradores";
import GestionEmpleados from "./vistas/GestionEmpleados";
import GestionTiendas from "./vistas/GestionTiendas";
import GestionProductos from "./vistas/GestionProductos";
import GestionInventario from "./vistas/GestionInventario";
import GestionServicios from "./vistas/GestionServicios";
import GestionPedidos from "./vistas/GestionPedidos";
import GestionAdminInventarioGeneral from "./vistas/GestionAdminInventarioGeneral";
import ReportesVentas from "./vistas/ReportesVentas";

// NUEVAS IMPORTACIONES DE VISTAS PARA EL PERFIL DEL EMPLEADO
import PerfilEmpleado from "./vistas/PerfilEmpleado";
import ClientesEmpleado from "./vistas/ClientesEmpleado";
import PedidosEmpleado from "./vistas/PedidosEmpleado";
import InventarioTienda from "./vistas/InventarioTienda";
import ProductosTienda from "./vistas/ProductosTienda";
import DetallesPedidosEmpleado from "./vistas/DetallesPedidosEmpleado";
import GestionEmpleadoInventarioTienda from "./vistas/GestionEmpleadoInventarioTienda"

// NUEVAS IMPORTACIONES DE VISTAS PARA EL PERFIL DEL CLIENTE
import PerfilCliente from "./vistas/PerfilCliente";
import MiPerfil from "./vistas/MiPerfil";
import MiCarrito from "./vistas/MiCarrito";
import MisPedidos from "./vistas/MisPedidos";
import CatalogoProductos from "./vistas/CatalogoProductos";
import MisServiciosEmpresariales from "./vistas/MisServiciosEmpresariales";
import MisTiendasFisicas from "./vistas/MisTiendasFisicas";

// Componente principal de rutas
function App() {
  return (
    <Routes>
      {/* Rutas principales del sitio (Header) */}
      <Route path="/" element={<Home />} />
      <Route path="/puntos-venta" element={<PuntosVenta />} />
      <Route path="/carrito-compras" element={<CarritoCompras />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />

      {/* Rutas accesibles desde el menú o secciones informativas */}
      <Route path="/album" element={<Album />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/servicios-empresariales" element={<ServiciosEmpresariales />} />
      <Route path="/sobre-nosotros" element={<SobreNosotros />} />
      <Route path="/perfil" element={<PerfilAdministrador />} />
      <Route path="/gestion-usuario" element={<GestioUsuario />} />
      <Route path="/editar-perfil" element={<EditarPerfil />} />
      <Route path="/cambiar-contrasena" element={<CambiarContraseña />} />

      {/* Rutas de navegación de productos (categorías) */}
      <Route path="/vinos" element={<Vinos />} />
      <Route path="/cremas-whisky" element={<CremasWhisky />} />
      <Route path="/mistelas" element={<Mistelas />} />
      <Route path="/zumo" element={<Zumo />} />
      <Route path="/accesorios" element={<Accesorios />} />

      {/* Rutas para el perfil y funcionalidades del ADMIN*/}
      <Route path="/administradores" element={<GestionAdministradores />} />
      <Route path="/empleados" element={<GestionEmpleados />} />
      <Route path="/tiendas-fisicas" element={<GestionTiendas />} />
      <Route path="/productos" element={<GestionProductos />} />
      <Route path="/inventario" element={<GestionInventario />} />
      <Route path="/servicios" element={<GestionServicios />} />
      <Route path="/pedidos" element={<GestionPedidos />} />
      <Route path="/gestion-admin-inventario" element={<GestionAdminInventarioGeneral />} />
      <Route path="/gestion-empleado-inventario" element={<GestionEmpleadoInventarioTienda />} />
      <Route path="/reportes" element={<ReportesVentas />} />

      {/* Rutas para el perfil y funcionalidades del EMPLEADO */}
      <Route path="/perfil-empleado" element={<PerfilEmpleado />} />
      <Route path="/clientes-empleado" element={<ClientesEmpleado />} />
      <Route path="/pedidos-empleado" element={<PedidosEmpleado />} />
      <Route path="/inventario-tienda" element={<InventarioTienda />} />
      <Route path="/gestion-empleado-inventario-tienda" element={<GestionEmpleadoInventarioTienda />} />
      <Route path="/productos-tienda" element={<ProductosTienda />} />
      <Route path="/detalles-pedidos-empleado" element={<DetallesPedidosEmpleado />} />
      {/* Rutas para editar perfil/contraseña del empleado, si las creas */}
      <Route path="/editar-perfil-empleado" element={<><div>Editar Perfil Empleado (Vista Pendiente)</div></>} />
      <Route path="/cambiar-contrasena-empleado" element={<><div>Cambiar Contraseña Empleado (Vista Pendiente)</div></>} />

      {/* NUEVAS RUTAS PARA EL PERFIL Y FUNCIONALIDADES DEL CLIENTE */}
      <Route path="/perfil-cliente" element={<PerfilCliente />} />
      <Route path="/mi-perfil" element={<MiPerfil />} />
      <Route path="/mi-carrito" element={<MiCarrito />} />
      <Route path="/mis-pedidos" element={<MisPedidos />} />
      <Route path="/catalogo-productos" element={<CatalogoProductos />} />
      <Route path="/mis-servicios-empresariales" element={<MisServiciosEmpresariales />} />
      <Route path="/mis-tiendas-fisicas" element={<MisTiendasFisicas />} />
      <Route path="/editar-perfil-cliente" element={<><div>Editar Perfil Cliente (Vista Pendiente)</div></>} />
      <Route path="/cambiar-contrasena-cliente" element={<><div>Cambiar Contraseña Cliente (Vista Pendiente)</div></>} />

    </Routes>
  );
}

export default App;
