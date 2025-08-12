import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ProveedorCarrito } from "./context/ContextoCarrito";

import Home from "./vistas/Home";
import PuntosVenta from "./vistas/PuntosVenta";
import CarritoCompras from "./vistas/CarritoCompras";
import Login from "./vistas/Login";
import Registro from "./vistas/Registro";

import Album from "./vistas/Album";
import Contacto from "./vistas/Contacto";
import ServiciosEmpresariales from "./vistas/ServiciosEmpresariales";
import SobreNosotros from "./vistas/SobreNosotros";

import Perfil from "./vistas/Perfil";

import PerfilAdministrador from "./vistas/PerfilAdministrador";
import GestioUsuario from "./vistas/GestioUsuario";
import EditarPerfilAdministrador from "./vistas/EditarPerfilAdministrador";
import CambiarContraseñaAdministrador from "./vistas/CambiarContraseñaAdministrador";

import Vinos from "./vistas/Vinos";
import CremasWhisky from "./vistas/CremasWhisky";
import Mistelas from "./vistas/Mistelas";
import Zumo from "./vistas/Zumo";
import Ron from "./vistas/Ron";

// Importación de las nuevas vistas para subcategorías de Vinos
import VinosTintos from "./vistas/VinosTintos";
import VinosRosados from "./vistas/VinosRosados";
import VinosBlancos from "./vistas/VinosBlancos";
import Espumosos from "./vistas/Espumosos";

import GestionAdministradores from "./vistas/GestionAdministradores";
import GestionEmpleados from "./vistas/GestionEmpleados";
import GestionTiendas from "./vistas/GestionTiendas";
import GestionProductos from "./vistas/GestionProductos";
import GestionInventario from "./vistas/GestionInventario";
import GestionServicios from "./vistas/GestionServicios";
import GestionPedidos from "./vistas/GestionPedidos";
import GestionAdminInventarioGeneral from "./vistas/GestionAdminInventarioGeneral";
import ReportesVentas from "./vistas/ReportesVentas";

import PerfilEmpleado from "./vistas/PerfilEmpleado";
import ClientesEmpleado from "./vistas/ClientesEmpleado";
import PedidosEmpleado from "./vistas/PedidosEmpleado";
import InventarioTienda from "./vistas/InventarioTienda";
import ProductosTienda from "./vistas/ProductosTienda";
import DetallesPedidosEmpleado from "./vistas/DetallesPedidosEmpleado";
import GestionEmpleadoInventarioTienda from "./vistas/GestionEmpleadoInventarioTienda";
import EditarPerfilEmpleado from "./vistas/EditarPerfilEmpleado";
import CambiarContraseñaEmpleado from "./vistas/CambiarContraseñaEmpleado";

import PerfilCliente from "./vistas/PerfilCliente";
import MisPedidos from "./vistas/MisPedidos";
import EditarPerfilCliente from "./vistas/EditarPerfilCliente";
import CambiarContraseñaCliente from "./vistas/CambiarContraseñaCliente";
import Chatbot from "./components/ChatBot";

function App() {
  return (
    <ProveedorCarrito>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/puntos-venta" element={<PuntosVenta />} />
        <Route path="/carrito-compras" element={<CarritoCompras />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        <Route path="/album" element={<Album />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/servicios-empresariales" element={<ServiciosEmpresariales />} />
        <Route path="/sobre-nosotros" element={<SobreNosotros />} />

        <Route path="/perfil" element={<Perfil />} />

        <Route path="/perfil-admin" element={<PerfilAdministrador />} />
        <Route path="/gestion-usuario" element={<GestioUsuario />} />
        <Route path="/editar-perfil-administrador" element={<EditarPerfilAdministrador />} />
        <Route path="/cambiar-contrasena-administrador" element={<CambiarContraseñaAdministrador />} />

        <Route path="/vinos" element={<Vinos />} />

        <Route path="/vinos-tintos" element={<VinosTintos />} />
        <Route path="/vinos-rosados" element={<VinosRosados />} />
        <Route path="/vinos-blancos" element={<VinosBlancos />} />
        <Route path="/espumosos" element={<Espumosos />} />
        
        <Route path="/cremas-whisky" element={<CremasWhisky />} />
        <Route path="/mistelas" element={<Mistelas />} />
        <Route path="/zumo" element={<Zumo />} />
        <Route path="/ron" element={<Ron />} />

        <Route path="/administradores" element={<GestionAdministradores />} />
        <Route path="/empleados" element={<GestionEmpleados />} />
        <Route path="/tiendas-fisicas" element={<GestionTiendas />} />
        <Route path="/productos" element={<GestionProductos />} />
        <Route path="/inventario" element={<GestionInventario />} />
        <Route path="/servicios" element={<GestionServicios />} />
        <Route path="/pedidos" element={<GestionPedidos />} />
        <Route path="/gestion-admin-inventario" element={<GestionAdminInventarioGeneral />} />
        <Route path="/reportes" element={<ReportesVentas />} />

        <Route path="/perfil-empleado" element={<PerfilEmpleado />} />
        <Route path="/clientes-empleado" element={<ClientesEmpleado />} />
        <Route path="/pedidos-empleado" element={<PedidosEmpleado />} />
        <Route path="/inventario-tienda" element={<InventarioTienda />} />
        <Route path="/gestion-empleado-inventario-tienda" element={<GestionEmpleadoInventarioTienda />} />
        <Route path="/productos-tienda" element={<ProductosTienda />} />
        <Route path="/detalles-pedidos-empleado" element={<DetallesPedidosEmpleado />} />
        <Route path="/editar-perfil-empleado" element={<EditarPerfilEmpleado />} />
        <Route path="/cambiar-contrasena-empleado" element={<CambiarContraseñaEmpleado />} />

        <Route path="/perfil-cliente" element={<PerfilCliente />} />
        <Route path="/mis-pedidos" element={<MisPedidos />} />
        <Route path="/editar-perfil-cliente" element={<EditarPerfilCliente />} />
        <Route path="/cambiar-contrasena-cliente" element={<CambiarContraseñaCliente />} />
      </Routes>

      <Chatbot />
    </ProveedorCarrito>
  );
}

export default App;
