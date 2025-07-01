import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { User, Mail, Home, Phone, Store, ClipboardList, Boxes, LayoutGrid, Package, Users, Eye, Edit, Key } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from "../components/BarraProductos";

export default function PerfilEmpleado() {
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const fetchEmployeeData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/empleados/${user.id}`);
        if (!response.ok) throw new Error('Error al obtener datos del empleado');
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, [user]);

  const handleEditClick = () => navigate('/editar-perfil-empleado');
  const handleChangePasswordClick = () => navigate('/cambiar-contrasena-empleado');
  const handleManagementClick = (path) => navigate(path);

  const managementOptions = [
    { name: 'Clientes', description: 'Ver datos básicos para entrega y comunicación', icon: Users, path: '/clientes-empleado' },
    { name: 'Pedidos', description: 'Ver, actualizar estado y asignarse pedidos', icon: ClipboardList, path: '/pedidos-empleado' },
    { name: 'Inventario de Tienda', description: 'Ver inventario de la tienda donde trabaja', icon: Boxes, path: '/inventario-tienda' },
    { name: 'Gestión Empleado Inventario Tienda', description: 'Ver qué inventario gestiona junto a otros empleados', icon: LayoutGrid, path: '/gestion-empleado-inventario-tienda' },
    { name: 'Productos en Tienda', description: 'Ver productos disponibles', icon: Package, path: '/productos-tienda' },
    { name: 'Detalles de Pedidos', description: 'Ver detalles para preparación y entrega', icon: Eye, path: '/detalles-pedidos-empleado' },
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