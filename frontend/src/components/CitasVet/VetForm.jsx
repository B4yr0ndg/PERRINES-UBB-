import React, { useState, useEffect } from 'react';
import { createCitaVet } from '../../services/CitaVet.service';
import { getDogs } from '../../services/dog.service';
import { useNavigate } from 'react-router-dom';
import '../../../src/index.css';

const VetForm = () => {
  const [appointment, setAppointment] = useState({
    mascota: '', // Cambiado de nombrePerro a perroId
    fecha: '',
    motivo: '',
    email: '',
    state: 'por confirmar',
  });
  const [dogs, setDogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const data = await getDogs();
        setDogs(data);
      } catch (error) {
        console.error('Error al obtener los perros:', error);
      }
    };

    fetchDogs();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convierte la fecha al formato yyyy-mm-dd
      const formattedDate = new Date(appointment.fecha).toISOString().split('T')[0];
      const appointmentData = {
        ...appointment,
        fecha: formattedDate,
      };
      console.log('Datos enviados:', appointmentData); // Verifica los datos enviados
      await createCitaVet(appointmentData);
      navigate('/Citas-Vet'); // Redirigir a la lista de citas
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      console.error('Detalles del error:', error.response?.data); // Detalles del error
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message); // Muestra el mensaje de error en un pop-up
    } else {
        setError('Error al actualizar la cita');
      }
    };
  };
      
    

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment({ ...appointment, [name]: value });
  };

  return (
    <div className="form-container">
      <h2>Crear Cita Veterinaria</h2>
      <form onSubmit={onSubmit}>
        <p>Seleccione un perro</p>
        <select name="mascota" value={appointment.mascota} onChange={handleChange} required>
          <option value="">Selecciona un Perro</option>
          {dogs.map((dog) => (
            <option key={dog._id} value={dog._id}>
              {dog.nombre}
            </option>
          ))}
        </select>
        <p>fecha posible cita</p>
        <input type="date" name="fecha" value={appointment.fecha} onChange={handleChange} placeholder="Fecha" required />
        <p>motivo de la cita</p>
        <input type="text" name="motivo" value={appointment.motivo} onChange={handleChange} placeholder="Razón de la Cita" required />
        <p>correo encargado del perro</p>
        <input type="email" name="email" value={appointment.email} onChange={handleChange} placeholder="Correo Electrónico" required />
        <p>estado de la cita</p>
        <input type="text" name="state" value="por confirmar" readOnly />
        <button type="submit">Crear</button>
        <button onClick={() => navigate('/Citas-Vet')}>Cancelar</button>
      </form>
    </div>
  );
};

export default VetForm;
