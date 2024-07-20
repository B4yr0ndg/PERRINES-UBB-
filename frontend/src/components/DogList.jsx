// src/components/DogList.jsx
import React, { useEffect, useState } from 'react';
import { getDogs, deleteDog } from '../services/dog.service';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css';

const DogList = () => {
  const [dogs, setDogs] = useState([]);
  const navigate = useNavigate();

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
    await deleteDog(id);
    setDogs(dogs.filter(dog => dog._id !== id));
  };

  const handleDetail = (id) => {
    navigate(`/detail/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  }

  const handleCancel = () => {
    navigate('/gestion-perros');
  };


  return (
    <div>
      <h1>Lista de Perros</h1>
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
                <button onClick={() => handleEdit(dog._id)}>Editar</button>
                <button onClick={() => handleDelete(dog._id)}>Eliminar</button>
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


