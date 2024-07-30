
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDogById, generateDogPdf } from '../services/dog.service';
import '../index.css';
import Navbar from './NavBar';

const DogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dog, setDog] = useState(null);

  useEffect(() => {
    const fetchDog = async () => {
      try {
        const data = await getDogById(id);
        setDog(data);
      } catch (error) {
        console.error('Error fetching dog:', error);
      }
    };

    fetchDog();
  }, [id]);

  const handleDownloadPdf = async () => {
    try {
      const pdfBlob = await generateDogPdf(id);
      const url = window.URL.createObjectURL(new Blob([pdfBlob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${dog.nombre}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const handleBack = () => {
    navigate('/dogs');
  };

  if (!dog) {
    return <div>Cargando...</div>;
  }

  const imageUrl = dog.archivoIdentificacion 
    ? `${import.meta.env.VITE_API_URL}/${dog.archivoIdentificacion}`
    : '';

  return (
    <div className="detail-container">
      <Navbar />
      <h2>Detalles del Perro</h2>
      <p><strong>Nombre:</strong> {dog.nombre}</p>
      <p><strong>Raza:</strong> {dog.raza}</p>
      <p><strong>Edad:</strong> {dog.edad}</p>
      <p><strong>Identificación:</strong> {dog.identificacion}</p>
      <p><strong>Estado de Salud:</strong> {dog.estadoSalud}</p>
      {dog.archivoIdentificacion && (
        <img src={imageUrl} alt="Imagen de identificación del perro" />
      )}
      <div>   </div>
      <div>   </div>
      <button onClick={handleDownloadPdf}>Descargar PDF</button>
      <button onClick={handleBack}>Volver</button>
    </div>
  );
};

export default DogDetail;
