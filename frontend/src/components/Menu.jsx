import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const MenuPrincipal = () => {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const handleGuestLogin = async () => {
    const guestCredentials = {
      email: 'user@email.com',
      password: 'user123'
    };

    try {
      await handleLogin(guestCredentials.email, guestCredentials.password);
      navigate('/menu');
      console.log('Guest login successful');
    } catch (error) {
      console.error('Guest login failed:', error);
    }
  };

  return (
    <div className='menu-principal-container'>
      <h2 className='titleC'>PERRINES UBB</h2>
      <p></p>
      <h2 className='titleC'>Software para la gestión de perros en la comunidad universitaria</h2>
      <div className='BGM'>
        <li className="welcome-section">
          <h2>Por favor, escoja una opción para continuar.</h2>
        </li>
        <li className="admin-box">
          <Link to="/login">Administrador</Link>
        </li>
        <li className="guest-box">
          <a onClick={handleGuestLogin}>Invitado</a>
        </li>
      </div>
    </div>
  );
};

export default MenuPrincipal;