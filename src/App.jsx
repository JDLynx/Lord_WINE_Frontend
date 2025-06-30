import "./App.css";
import { Routes, Route } from "react-router-dom";

// Importación de ProveedorCarrito (renombrado)
import { ProveedorCarrito } from "./context/ContextoCarrito";

// Importación de vistas principales del sitio
import Home from "./vistas/Home";
import PuntosVenta from "./vistas/PuntosVenta";
import CarritoCompras from "./vistas/CarritoCompras";
import Login from "./vistas/Login";
import Registro from "./vistas/Registro";

// Importación de vistas informativas y generales
import Album from "./vistas/Album";
import Contacto from "./vistas/Contacto";
import ServiciosEmpresariales from "./vistas/ServiciosEmpresariales";
import SobreNosotros from "./vistas/SobreNosotros";

// Importación de vistas del perfil de administrador
import PerfilAdministrador from "./vistas/PerfilAdministrador";
import GestioUsuario from "./vistas/GestioUsuario";
import EditarPerfil from "./vistas/EditarPerfil";
import CambiarContraseña from "./components/CambiarContraseña";

// Importación de vistas relacionadas con productos
import Vinos from "./vistas/Vinos";
import CremasWhisky from "./vistas/CremasWhisky";
import Mistelas from "./vistas/Mistelas";
import Zumo from "./vistas/Zumo";
import Accesorios from "./vistas/Accesorios";

// Importación de vistas de administración
import GestionAdministradores from "./vistas/GestionAdministradores";
import GestionEmpleados from "./vistas/GestionEmpleados";
import GestionTiendas from "./vistas/GestionTiendas";
import GestionProductos from "./vistas/GestionProductos";
import GestionInventario from "./vistas/GestionInventario";
import GestionServicios from "./vistas/GestionServicios";
import GestionPedidos from "./vistas/GestionPedidos";
import GestionAdminInventarioGeneral from "./vistas/GestionAdminInventarioGeneral";
import ReportesVentas from "./vistas/ReportesVentas";

// Importación de vistas del perfil de empleado
import PerfilEmpleado from "./vistas/PerfilEmpleado";
import ClientesEmpleado from "./vistas/ClientesEmpleado";
import PedidosEmpleado from "./vistas/PedidosEmpleado";
import InventarioTienda from "./vistas/InventarioTienda";
import ProductosTienda from "./vistas/ProductosTienda";
import DetallesPedidosEmpleado from "./vistas/DetallesPedidosEmpleado";
import GestionEmpleadoInventarioTienda from "./vistas/GestionEmpleadoInventarioTienda";

// Importación de vistas del perfil de cliente
import PerfilCliente from "./vistas/PerfilCliente";
import MiPerfil from "./vistas/MiPerfil";
import MiCarrito from "./vistas/MiCarrito";
import MisPedidos from "./vistas/MisPedidos";
import CatalogoProductos from "./vistas/CatalogoProductos";
import MisServiciosEmpresariales from "./vistas/MisServiciosEmpresariales";
import MisTiendasFisicas from "./vistas/MisTiendasFisicas";

// Componente principal de la aplicación que define las rutas
function App() {
  return (
    <ProveedorCarrito>
      <Routes>
        {/* Rutas principales accesibles desde el encabezado */}
        <Route path="/" element={<Home />} />
        <Route path="/puntos-venta" element={<PuntosVenta />} />
        <Route path="/carrito-compras" element={<CarritoCompras />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/* Rutas de páginas informativas y generales */}
        <Route path="/album" element={<Album />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/servicios-empresariales" element={<ServiciosEmpresariales />} />
        <Route path="/sobre-nosotros" element={<SobreNosotros />} />

        {/* Rutas del perfil de administrador */}
        <Route path="/perfil" element={<PerfilAdministrador />} />
        <Route path="/gestion-usuario" element={<GestioUsuario />} />
        <Route path="/editar-perfil" element={<EditarPerfil />} />
        <Route path="/cambiar-contrasena" element={<CambiarContraseña />} />

        {/* Rutas de productos por categoría */}
        <Route path="/vinos" element={<Vinos />} />
        <Route path="/cremas-whisky" element={<CremasWhisky />} />
        <Route path="/mistelas" element={<Mistelas />} />
        <Route path="/zumo" element={<Zumo />} />
        <Route path="/accesorios" element={<Accesorios />} />

        {/* Rutas de administración */}
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

        {/* Rutas del perfil de empleado */}
        <Route path="/perfil-empleado" element={<PerfilEmpleado />} />
        <Route path="/clientes-empleado" element={<ClientesEmpleado />} />
        <Route path="/pedidos-empleado" element={<PedidosEmpleado />} />
        <Route path="/inventario-tienda" element={<InventarioTienda />} />
        <Route path="/gestion-empleado-inventario-tienda" element={<GestionEmpleadoInventarioTienda />} />
        <Route path="/productos-tienda" element={<ProductosTienda />} />
        <Route path="/detalles-pedidos-empleado" element={<DetallesPedidosEmpleado />} />
        <Route path="/editar-perfil-empleado" element={<div>Editar Perfil Empleado (Vista Pendiente)</div>} />
        <Route path="/cambiar-contrasena-empleado" element={<div>Cambiar Contraseña Empleado (Vista Pendiente)</div>} />

        {/* Rutas del perfil de cliente */}
        <Route path="/perfil-cliente" element={<PerfilCliente />} />
        <Route path="/mi-perfil" element={<MiPerfil />} />
        <Route path="/mi-carrito" element={<CarritoCompras />} />
        <Route path="/mis-pedidos" element={<MisPedidos />} />
        <Route path="/catalogo-productos" element={<CatalogoProductos />} />
        <Route path="/mis-servicios-empresariales" element={<MisServiciosEmpresariales />} />
        <Route path="/mis-tiendas-fisicas" element={<MisTiendasFisicas />} />
        <Route path="/editar-perfil-cliente" element={<div>Editar Perfil Cliente (Vista Pendiente)</div>} />
        <Route path="/cambiar-contrasena-cliente" element={<div>Cambiar Contraseña Cliente (Vista Pendiente)</div>} />
      </Routes>
    </ProveedorCarrito>
  );
}

export default App;