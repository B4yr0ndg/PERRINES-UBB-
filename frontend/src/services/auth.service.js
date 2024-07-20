// src/services/auth.service.js
import axios from './root.service';
import cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

export const login = async ({ email, password }) => {
  try {
    const response = await axios.post('auth/login', { email, password });
    const { status, data } = response;

    console.log('Response status:', status); // Verificar el estado de la respuesta
    console.log('Response data:', data); // Verificar los datos de la respuesta

    if (status === 200) {
      const decodedToken = jwtDecode(data.data.accessToken);
      console.log('Decoded token:', decodedToken); // Verificar el token decodificado

      const { email: userEmail, roles } = decodedToken;
      console.log('User email:', userEmail); // Verificar el email del usuario
      console.log('User roles:', roles); // Verificar los roles del usuario

      // Verifica si el usuario tiene los roles permitidos
      if (roles.includes("user") || roles.includes("admin")) {
        localStorage.setItem('user', JSON.stringify({ email: userEmail, roles }));
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.data.accessToken}`;
        console.log('Login successful'); // Indicar que el login fue exitoso
      } else {
        throw new Error('Usuario no autorizado');
      }
    }
  } catch (error) {
    console.error('Error en el login:', error); // Verificar el error
    throw error; // Propaga el error para manejarlo en el componente
  }
};

export const logout = () => {
  localStorage.removeItem('user');
  delete axios.defaults.headers.common['Authorization'];
  cookies.remove('jwt');
};

export const test = async () => {
  try {
    const response = await axios.get('/users');
    const { status, data } = response;
    if (status === 200) {
      console.log(data.data);
    }
  } catch (error) {
    console.log(error);
  }
};

