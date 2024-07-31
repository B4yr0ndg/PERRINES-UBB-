import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li className="navbar-item">
                    <Link to="#" onClick={() => navigate(-1)} className="navbar-link">
                        <span className="navbar-image">🔙</span>
                        Volver
                    </Link>
                </li>
                <li className="navbar-item">
                    <Link to="/menu" className="navbar-link">
                        <span className="navbar-image">🏠</span>
                        Menu
                    </Link>
                </li>
                <li className="navbar-item">
                    <Link to="/gestion-perros" className="navbar-link">
                        <span className="navbar-image">🐶</span>
                        Gestión Perros
                    </Link>
                </li>
                <li className="navbar-item">
                    <Link to="/feeding-menu" className="navbar-link">
                        <span className="navbar-image">🍴</span>
                        Gestión Alimentación
                    </Link>
                </li>
                <li className="navbar-item">
                    <Link to="/Citas-Vet" className="navbar-link">
                        <span className="navbar-image">🩺</span>
                        Citas Veterinarias
                    </Link>
                </li>
                <li className="navbar-item">
                    <Link to="/" className="navbar-link">
                        <span className="navbar-image">🔒</span>
                        Cerrar sesión
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;