import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li className="navbar-item">
                    <Link to="/menu" className="navbar-link">Menu</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/gestion-perros" className="navbar-link">Gestión Perros</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/feeding-menu" className="navbar-link">Gestión Alimentación</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/citas-veterinarias" className="navbar-link">Citas Veterinarias</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/" className="navbar-link">Cerrar sesion</Link>
                </li>

            </ul>
        </nav>
    );
};

export default Navbar;
