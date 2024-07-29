import React from 'react';
import './MenuPrincipal.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const MenuPrincipal = () => {
  const { handleLogout } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    handleLogout();
    navigate('/');
  };

  return (
    <div className="menu-principal-container">
      <div className="banner">
        <div className="banner-section image-section">
          <img src="https://cdn.pixabay.com/photo/2024/02/11/17/14/dogs-8567089_1280.png" alt="Imagen de un perro" className="banner-image" />
        </div>
        <div className="banner-section text-section">
          <h2>¡Bienvenido! En este panel podrás gestionar la información de los perros de la comunidad universitaria.</h2>
        </div>
        <div className="banner-section image-section">
          <img src="https://cdn.pixabay.com/photo/2020/08/02/14/34/dogs-5457759_640.png" alt="Imagen de un perro" className="banner-image" />
        </div>
      </div>
      <div className="menu-items">
        <div className="menu-item">
          <Link to="/gestion-perros">Gestión de Perros</Link>
        </div>
        <div className="menu-item">
          <p>texto</p>
        </div>
        <div className="menu-item">
          <p>texto</p>
        </div>
        <div className="menu-item">
          <p>texto</p>
        </div>
        <div className="menu-item">
          <button onClick={logout}>Cerrar Sesión</button>
        </div>
      </div>
    </div>
  );
};

export default MenuPrincipal;
