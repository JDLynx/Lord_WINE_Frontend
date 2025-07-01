import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { User, Mail, Shield, Edit, Key, Home, Phone, Settings, ShoppingBag, Store, Boxes, LayoutGrid, BarChart, Users, Package, ClipboardList, TrendingUp } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";
import "./PerfilAdministrador.css";

export default function PerfilAdministrador() {
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/administradores/${user.id}`);
        const data = await response.json();
        setProfileData({
          ...data,
          role: user.role
        });
      } catch (error) {
        console.error("Error al cargar los datos del perfil:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleEditClick = () => navigate('/editar-perfil-administrador');
  const handleChangePasswordClick = () => navigate('/cambiar-contrasena-administrador');
  const handleManagementClick = (path) => navigate(path);

  const managementOptions = [
    { name: 'Administradores', description: 'Ver y administrar otros administradores', icon: Users, path: '/administradores' },
    { name: 'Empleados', description: 'Crear, editar, asignar a tiendas e inventarios', icon: User, path: '/empleados' },
    { name: 'Tiendas Físicas', description: 'Crear, administrar datos básicos', icon: Store, path: '/tiendas-fisicas' },
    { name: 'Categorías y Productos', description: 'Crear, actualizar y organizar productos', icon: Package, path: '/productos' },
    { name: 'Inventario General y Tienda', description: 'Administrar existencias', icon: Boxes, path: '/inventario' },
    { name: 'Servicios Empresariales', description: 'Crear, actualizar y establecer precios', icon: Settings, path: '/servicios' },
    { name: 'Pedidos', description: 'Ver todos, cambiar estados, asignar empleados', icon: ClipboardList, path: '/pedidos' },
    { name: 'Gestión Admin. Inventario General', description: 'Ver qué administrador gestiona cada inventario', icon: LayoutGrid, path: '/gestion-admin-inventario' },
    { name: 'Gestión Empleado Inventario Tienda', description: 'Asignar o cambiar responsables de inventario en tiendas', icon: ShoppingBag, path: '/gestion-empleado-inventario' },
    { name: 'Ventas y Reportes', description: 'Ver detalles de ventas, productos vendidos, stock', icon: TrendingUp, path: '/reportes' },
  ];

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      <BarraProductos />
      <main className="flex-grow flex flex-col items-center w-full py-8 px-4 sm:px-8 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/img/Viñedo.jpg')" }}>
      </main>
      <Footer />
    </div>
  );
}