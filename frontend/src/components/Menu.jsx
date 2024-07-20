// src/components/Menu.jsx
/* import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Menu = () => {
  const { currentUser, logout } = useAuth();

  return (
    <nav>
      <h1>PERRINES UBB</h1>
      <p>Software para la gestión de perros en la comunidad universitaria</p>
      <ul>
        {currentUser ? (
          <>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
            <li>
              <Link to="/admin">Admin</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <p>¡Bienvenido de nuevo! Por favor, elige una opción para continuar:</p>
              <p>
                Administrador<br />
                Accede a la plataforma como administrador para <br />
                gestionar los perros de la comunidad universitaria,<br />
                 ver eventos y colaborar en iniciativas <br />
                 para mejorar la vida de nuestros perros universitarios.
                
              </p>
              <p>
                Invitado<br />
                Accede a la plataforma como invitado para ver los perros de la comunidad universitaria, ver eventos y colaborar en iniciativas para mejorar la vida de nuestros perros universitarios.

              </p>
            </li>
            <li>
              <Link to="/login">Administrador</Link>
            </li>
            <li>
              <Link to="/guest">Invitado</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Menu; */

//------------------------------------------------------------

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const MenuPrincipal = () => {
  const { user, logout } = useAuth();
  const currentUser = user;

  return (
    <nav>
      <h2>PERRINES UBB</h2>
      <p></p>
      <h2>Software para la gestión de perros en la comunidad universitaria</h2>
      <ul>
          <>

            <li className="welcome-section">
              <h2>Por favor, escoja una opción para continuar.</h2>
            </li>

            <li className="admin-box">
              <Link to="/login">Administrador</Link>
            </li>

            <li className="guest-box">
              <Link to="/guest">Invitado</Link>
            </li>

          </>
      </ul>
    </nav>
  );
};

export default MenuPrincipal;


