/* import React from 'react';
import './MenuPrincipal.css';
import { Link } from 'react-router-dom';

const MenuPrincipal = () => {
  return (
    <div className="menu-principal-container">
      <div className="banner">
        <div className="banner-section image-section">
          <img src="https://cdn.pixabay.com/photo/2024/02/11/17/14/dogs-8567089_1280.png" alt="Imagen de un perro" className="banner-image" />
        </div>
        <div className="banner-section text-section">
          <p>En este apartado irá texto</p>
        </div>
        <div className="banner-section image-section">
        <img src="https://cdn.pixabay.com/photo/2020/08/02/14/34/dogs-5457759_640.png" alt="Imagen de un perro" className="banner-image" />
        </div>
      </div>
      <div className="menu-items">
        <div className="menu-column">
          <div className="menu-item">
            <Link to="/add">Añadir perros</Link>
          </div>
          <div className="menu-item">
            <Link to="/dogs">Ver perros</Link>
          </div>
        </div>
        <div className="menu-item">
          <Link to="/food">Gestionar alimentos</Link>
        </div>
        <div className="menu-item">
          <Link to="/vet-visits">Gestionar visitas veterinario</Link>
        </div>
      </div>
    </div>
  );
};

export default MenuPrincipal; */


//------------------------------------------------------------

import React from 'react';
import './MenuPrincipal.css';
import { Link } from 'react-router-dom';

const MenuPrincipal = () => {
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
      </div>
    </div>
  );
};

export default MenuPrincipal;

