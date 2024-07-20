// src/components/DogDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDogById } from '../services/dog.service';
import '../index.css';

const DogDetail = () => {
  const { id } = useParams();
  const [dog, setDog] = useState(null);

  useEffect(() => {
    const fetchDog = async () => {
      const data = await getDogById(id);
      setDog(data);
    };

    fetchDog();
  }, [id]);

  if (!dog) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="detail-container">
      <div></div>
      <h2>Detalles del Perro</h2>
      <p><strong>Nombre:</strong> {dog.nombre}</p>
      <p><strong>Raza:</strong> {dog.raza}</p>
      <p><strong>Edad:</strong> {dog.edad}</p>
      <p><strong>Identificación:</strong> {dog.identificacion}</p>
      <p><strong>Estado de Salud:</strong> {dog.estadoSalud}</p>
      <img src={dog.archivoIdentificacion} alt="Imagen de identificación del perro" />
    </div>
  );
};

export default DogDetail;