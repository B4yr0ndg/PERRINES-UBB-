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
    <nav>
      <h2>PERRINES UBB</h2>
      <p></p>
      <h2>Software para la gestión de perros en la comunidad universitaria</h2>
      <ul>
        <li className="welcome-section">
          <h2>Por favor, escoja una opción para continuar.</h2>
        </li>
        <li className="admin-box">
          <Link to="/login">Administrador</Link>
        </li>
        <li className="guest-box">
          <button onClick={handleGuestLogin}>Invitado</button>
        </li>
      </ul>
    </nav>
  );
};

export default MenuPrincipal;
