// src/routes/AppRoutes.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DogList from '../components/DogList';
import DogForm from '../components/DogForm'; // Importar DogForm correctamente
import DogDetail from '../components/DogDetail';
import Login from '../components/Login';
import ErrorPage from '../components/ErrorPage';
import MenuPrincipal from '../components/MenuPrincipal';
import Menu from '../components/Menu';
import GestionPerrosMenu from '../components/GestionPerrosMenu';
import { AuthProvider } from '../context/AuthContext';
import PrivateRoute from './PrivateRoute';
import GetVet from '../components/CitasVet/GetVet';
import VetForm from '../components/CitasVet/VetForm';
import DogAppointments from '../components/CitasVet/GetVetByDog';
import EditCita from '../components/CitasVet/EditCita';
import FeedingRegistro from '../components/FeedingRegistro';
import FeedingMenu from '../components/FeedingMenu';

const AppRoutes = () => {
  return (
    <Router>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<Menu />} /> {/* Cambiar la ruta raíz para mostrar el componente de Login */}
        <Route path="/login" element={<Login />} />
        <Route path="/menu" element={<MenuPrincipal />} /> {/* Agregar la ruta /menu */}
        <Route path="/gestion-perros" element={<PrivateRoute element={GestionPerrosMenu} />} />
        <Route path="/Citas-Vet" element={<PrivateRoute element={GetVet}/>} />
        <Route path="/addVet" element={<PrivateRoute element={VetForm} />} />
        <Route path="/Citas-Vet/:id" element={<PrivateRoute element={DogAppointments} />} />
        <Route path="/editar-cita/:id" element={<PrivateRoute element={EditCita} />} />
        <Route path="/add" element={<PrivateRoute element={DogForm} />} /> {/* Asegurarse de que DogForm se pase como un componente*/}
        <Route path="/dogs" element={<PrivateRoute element={DogList} />} />
        <Route path="/edit/:id" element={<PrivateRoute element={DogForm} />} />
        <Route path="/detail/:id" element={<PrivateRoute element={DogDetail} />} />
        <Route path="/feeding-menu" element={<PrivateRoute element={FeedingMenu} />} />
        <Route path="/gestion-alimentacion" element={<PrivateRoute element={FeedingRegistro} />} />
        <Route path="*" element={<PrivateRoute element={ErrorPage} />} />
      </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;
