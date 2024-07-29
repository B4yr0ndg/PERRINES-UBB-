
import React, { useState, useEffect } from 'react';
import { createDog, getDogById, updateDog } from '../services/dog.service';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import '../index.css';

const DogForm = () => {
  const [dog, setDog] = useState({
    nombre: '', 
    raza: '', 
    edad: '', 
    identificacion: '', 
    estadoSalud: '', 
    archivoIdentificacion: null,
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (id) {
      const fetchDog = async () => {
        const data = await getDogById(id);
        setDog(data);
      };

      fetchDog();
    }
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in dog) {
      if (dog[key]) {
        formData.append(key, dog[key]);
      }
    }

    try {
      if (id) {
        await updateDog(id, formData);
      } else {
        await createDog(formData);
      }
      navigate('/dogs');
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'archivoIdentificacion' && files.length > 0) {
      setDog({ ...dog, [name]: files[0] });
    } else {
      setDog({ ...dog, [name]: value });
    }
  };

  const handleCancel = () => {
    if (location.state && location.state.from === 'doglist') {
      navigate('/dogs');
    } else {
      navigate('/gestion-perros');
    }
  };

  return (
    <div className="form-container">
      <h2>{id ? 'Actualizar Perro' : 'Crear Perro'}</h2>
      <form onSubmit={onSubmit}>
        <input type="text" name="nombre" value={dog.nombre} onChange={handleChange} placeholder="Nombre" required />
        <input type="text" name="raza" value={dog.raza} onChange={handleChange} placeholder="Raza" required />
        <input type="number" name="edad" value={dog.edad} onChange={handleChange} placeholder="Edad" required />
        <input type="text" name="identificacion" value={dog.identificacion} onChange={handleChange} placeholder="Identificación" required />
        <select name="estadoSalud" value={dog.estadoSalud} onChange={handleChange} required>
          <option value="">Seleccione el estado de salud</option>
          <option value="Buena">Buena</option>
          <option value="Regular">Regular</option>
          <option value="Mala">Mala</option>
        </select>
        <input type="file" name="archivoIdentificacion" onChange={handleChange} />
        <button type="submit">{id ? 'Actualizar' : 'Crear'}</button>
        <button type="button" onClick={handleCancel}>Cancelar</button>
      </form>
    </div>
  );
};

export default DogForm;
