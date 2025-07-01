import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { User, Mail, Phone, Home, CreditCard, ShoppingCart, ClipboardList, Package, Briefcase, Store, Edit, Key } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BarraProductos from '../components/BarraProductos';

export default function PerfilCliente() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [clientData, setClientData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchClientData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/clientes/${user.id}`);
        if (!response.ok) throw new Error('Error al obtener datos del cliente');
        const data = await response.json();
        setClientData(data);
      } catch (error) {
        setError(error.message || 'Error al obtener datos del cliente');
      } finally {
        setLoading(false);
      }
    };
    fetchClientData();
  }, [user]);

  const handleEditClick = () => navigate('/editar-perfil-cliente');
  const handleChangePasswordClick = () => navigate('/cambiar-contrasena-cliente');
  const handleManagementClick = (path) => navigate(path);

  const managementOptions = [
    { name: 'Su Perfil', description: 'Ver y actualizar sus datos básicos', icon: User, path: '/mi-perfil' },
    { name: 'Carrito de Compras', description: 'Crear y administrar productos en su carrito', icon: ShoppingCart, path: '/mi-carrito' },
    { name: 'Pedidos', description: 'Ver historial de pedidos, estado y detalles', icon: ClipboardList, path: '/mis-pedidos' },
    { name: 'Productos y Categorías', description: 'Ver catálogo general de productos', icon: Package, path: '/catalogo-productos' },
    { name: 'Servicios Empresariales', description: 'Ver servicios disponibles', icon: Briefcase, path: '/mis-servicios-empresariales' },
    { name: 'Tiendas Físicas', description: 'Consultar ubicaciones para retiro en tienda', icon: Store, path: '/mis-tiendas-fisicas' },
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