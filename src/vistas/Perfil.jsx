import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Perfil() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      switch (user.role) {
        case 'Administrador':
          navigate('/perfil-admin');
          break;
        case 'Empleado':
          navigate('/perfil-empleado');
          break;
        case 'Cliente':
          navigate('/perfil-cliente');
          break;
        default:
          navigate('/');
      }
    }
  }, [user, navigate]);

  return null;
}