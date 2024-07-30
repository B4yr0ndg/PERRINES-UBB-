import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../index.css';

const Login = () => {
  const { handleLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Check if admin email and password are entered
    if (email === 'admin@email.com' && password === 'admin123') {
      try {
        await handleLogin(email, password);
        navigate('/menu'); // Redirigir al menú principal si las credenciales son correctas
      } catch (error) {
        setError('Error logging in. Please check your credentials.');
      }
    } else {
      setError('Solo los administradores pueden iniciar sesión.');
    }
  };

  const handleCancel = () => {
    navigate('/'); // Redirigir al menú principal al cancelar
  };

  return (
    <div className="menu-principal-container">
      <h2 className='titleC'>INICIAR SESIÓN</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
        />
        <button type="submit">Iniciar sesión</button>
        <button type="button" onClick={handleCancel}>Cancelar</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
