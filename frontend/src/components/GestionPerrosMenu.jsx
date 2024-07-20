import React from 'react';
import './GestionPerrosMenu.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const GestionPerrosMenu = () => {
    const navigate = useNavigate();
  
    const handleMenuPrincipal = () => {
      navigate('/menu');
    };
  return (
    <div className="gestion-perros-menu-container">
      <h2>GESTIÓN DE PERROS</h2>
      <div className="banner">
        <div className="banner-section image-section">
        <img src="https://cdn.pixabay.com/photo/2024/02/11/17/14/dogs-8567089_1280.png" alt="Imagen de un perro" className="banner-image" />
        </div>
        <div className="banner-section text-section">
          <p>texto 1</p>
        </div>
        <div className="banner-section image-section">
        <img src="https://cdn.pixabay.com/photo/2024/02/11/17/14/dogs-8567089_1280.png" alt="Imagen de un perro" className="banner-image" />
        </div>
      </div>
      <div className="menu-items">
        <div className="menu-item">
          <Link to="/add">Añadir nuevo perro</Link>
        </div>
        <div className="menu-item">
          <Link to="/dogs">Ver listado de perros</Link>
        </div>
      </div>
      <button onClick={handleMenuPrincipal} className="menu-principal-button">Volver</button>
    </div>
  );
};

export default GestionPerrosMenu;
