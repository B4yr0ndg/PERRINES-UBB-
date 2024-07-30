
import React, { useEffect, useState } from 'react';
import { getDogs, deleteDog } from '../services/dog.service';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../index.css';
import Navbar from '../../src/components/NavBar';

const DogList = () => {
  const [dogs, setDogs] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const data = await getDogs();
        setDogs(data);
      } catch (error) {
        console.error('Error fetching dogs:', error);
      }
    };

    fetchDogs();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este perro?");
    if (confirmDelete) {
      await deleteDog(id);
      setDogs(dogs.filter(dog => dog._id !== id));
    }
  };

  const handleDetail = (id) => {
    navigate(`/detail/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`, { state: { from: 'doglist' } });
  };

  const handleCancel = () => {
    navigate('/gestion-perros');
  };

  return (
    <div className="menu-principal-container">
      <Navbar />
      <h1 className='titleC'>Lista de Perros</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Identificación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {dogs.map((dog) => (
            <tr key={dog._id}>
              <td>{dog.nombre}</td>
              <td>{dog.identificacion}</td>
              <td>
                <button onClick={() => handleDetail(dog._id)}>Detalle</button>
                {user && user.roles.includes('admin') && (
                  <>
                    <button onClick={() => handleEdit(dog._id)}>Editar</button>
                    <button onClick={() => handleDelete(dog._id)}>Eliminar</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleCancel}>Volver</button>
    </div>
  );
};

export default DogList;


