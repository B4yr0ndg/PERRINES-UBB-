import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCitaVetById, updateCitaVet, deleteCitaVet } from '../../services/CitaVet.service';
import '../../../src/index.css';
import { useAuth } from '../../context/AuthContext';

const EditCita = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState({
    mascota: {
      nombre: '',
      _id: ''  // Almacena el ID del perro
    },
    fecha: '',
    motivo: '',
    email: '',
    state: 'por confirmar',
    veterinaria: '',
    diagnostico: ''

  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchCita = async () => {
      try {
        const response = await getCitaVetById(id);
        const data = response; 
        if (data) {
          setAppointment({
            mascota: {
              nombre: data.mascota?.nombre || '',
              _id: data.mascota?._id || ''  // Inicializa el ID del perro
            },
            fecha: data.fecha ? new Date(data.fecha).toISOString().split('T')[0] : '',
            motivo: data.motivo || '',
            email: data.email || '',
            state: data.state || '',
            veterinaria: data.veterinaria || '',
            diagnostico: data.diagnostico || ''
          });
        } else {
          setError('La respuesta del servidor no contiene datos');
        }
      } catch (error) {
        setError('Error al obtener la cita');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCita();
    }
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
        // Formatea la fecha a ISO 8601
        const formattedDate = new Date(appointment.fecha).toISOString().split('T')[0];

        const appointmentData = {
            mascota: appointment.mascota._id, // Usa el ID del perro
            motivo: appointment.motivo,
            fecha: formattedDate,
            email: appointment.email,
            state: appointment.state,
            veterinaria: appointment.veterinaria,
            diagnostico: appointment.diagnostico
            
           
        };

        await updateCitaVet(id, appointmentData);
        navigate('/Citas-Vet');
    } catch (error) {
        // Verifica si el error es debido a malas palabras
        if (error.response && error.response.data && error.response.data.message) {
            alert(error.response.data.message); // Muestra el mensaje de error en un pop-up
        } else {
            setError('Error al actualizar la cita');
        }
    }
};

const eliminarCita = async (e) => {
  e.preventDefault();
  try {
    await deleteCitaVet(id);
    navigate('/Citas-Vet');
  } catch (error) {
    setError('Error al eliminar la cita');
  }
};


  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="form-container">
      <h2>{user && user.roles.includes('admin') ? 'Actualizar Cita Veterinaria' : 'Detalles de la Cita Veterinaria'}</h2>
      <form onSubmit={onSubmit}>
        <h3 className='titleC'>Información de la Cita</h3>
        <p>Nombre de la mascota</p>
        <input
          type="text"
          name="nombreMascota"
          value={appointment.mascota.nombre}
          readOnly
          placeholder="Nombre de la Mascota"
        />
        <p>Motivo</p>
        <input
          type="text"
          name="motivo"
          value={appointment.motivo}
          readOnly
          placeholder="Razón de la Cita"
        />
        <p>Fecha</p>
        <input
          type="date"
          name="fecha"
          value={appointment.fecha}
          onChange={user && user.roles.includes('admin') ? handleChange : undefined}
          placeholder="Fecha"
          required
          disabled={!user || !user.roles.includes('admin')}
        />
        <p>Correo</p>
        <input
          type="email"
          name="email"
          value={appointment.email}
          onChange={user && user.roles.includes('admin') ? handleChange : undefined}
          placeholder="Correo Electrónico"
          required
          disabled={!user || !user.roles.includes('admin')}
        />
        <p>Estado</p>
        <select
          name="state"
          value={appointment.state}
          onChange={user && user.roles.includes('admin') ? handleChange : undefined}
          disabled={!user || !user.roles.includes('admin')}
        >
          <option value="por confirmar">Por confirmar</option>
          <option value="confirmada">Confirmada</option>
          <option value="cancelada">Cancelada</option>
          <option value="realizada">Realizada</option>
        </select>

        <p>Nombre de la veterinaria</p>
        <input
          type="text"
          name="veterinaria"
          value={appointment.veterinaria}
          onChange={user && user.roles.includes('admin') ? handleChange : undefined}
          placeholder="Nombre de la veterinaria"
          required
          disabled={!user || !user.roles.includes('admin')}
        />
    
          <p>Diagnóstico dictado por el veterinario</p>
            <input
              type="text"
              name="diagnostico"
              value={appointment.diagnostico}
              onChange={user && user.roles.includes('admin') ? handleChange : undefined}
              placeholder="Diagnóstico"
              disabled={!user || !user.roles.includes('admin')}
            />
          
      

        {user && user.roles.includes('admin') && (
          <button type="submit">Actualizar</button>
        )}
        <button type="button" onClick={() => navigate('/Citas-Vet')}>Cancelar</button>
        {user && user.roles.includes('admin') && (
          <button onClick={eliminarCita} className='button-cancel'>eliminar</button>
        )}
        
      </form>
    </div>
  );
};

export default EditCita;
