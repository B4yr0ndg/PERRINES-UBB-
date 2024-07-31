
import React from 'react';
import './GestionPerrosMenu.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../../src/components/Navbar';

const GestionPerrosMenu = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleMenuPrincipal = () => {
    navigate('/menu');
  };

  return (
    <div className="gestion-perros-menu-container">
      <Navbar />
      <h2>GESTIÓN DE PERROS</h2>
      <div className="banner">
        <div className="banner-section image-section">
          <img src="https://cdn.pixabay.com/photo/2024/02/11/17/14/dogs-8567089_1280.png" alt="Imagen de un perro" className="banner-image" />
        </div>
        <div className="banner-section text-section">
          <p>En esta plataforma, podrás gestionar toda la información de los perros de nuestra comunidad, asegurando su cuidado y manteniendo sus datos siempre actualizados.</p>
        </div>
        <div className="banner-section image-section">
          <img src="https://cdn.pixabay.com/photo/2024/02/11/17/14/dogs-8567089_1280.png" alt="Imagen de un perro" className="banner-image" />
        </div>
      </div>
      <div className="menu-items">
        {user && user.roles.includes('admin') && (
          <div className="menu-item">
            <Link to="/add">Añadir nuevo perro</Link>
          </div>
        )}
        <div className="menu-item">
          <Link to="/dogs">Ver listado de perros</Link>
        </div>
      </div>
      <button onClick={handleMenuPrincipal} className="menu-principal-button">Volver</button>
    </div>
  );
};

export default GestionPerrosMenu;