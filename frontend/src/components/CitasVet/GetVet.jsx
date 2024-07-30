import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDogs } from '../../services/dog.service';
import { getCitasVetByDogId } from '../../services/CitaVet.service';
import NavBar from '../NavBar';
import '../../index.css';
import { useAuth } from '../../context/AuthContext';

function ShowDogs() {
  const [perros, setPerros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchPerros = async () => {
      setLoading(true);
      try {
        const data = await getDogs();
        setPerros(data);
      } catch (error) {
        setError('Error al obtener los perros.');
        console.error('Error al obtener los perros:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPerros();
  }, []);

  const handleDogClick = async (id) => {
    try {
      await getCitasVetByDogId(id); // No es necesario guardar en estado, solo redirige
      navigate(`/Citas-Vet/${id}`); // Redirige a la página de citas del perro
    } catch (error) {
      console.error('Error al obtener las citas:', error);
    }
  };

  const handleNewAppointment = () => {
    navigate('/addVet'); // Redirige a la página de creación de citas
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='gestion-perros-menu-container'>
      <NavBar />
      <div className='banner'>
        <div className="banner-section image-section">
          <img src="https://cdn.pixabay.com/photo/2024/02/11/17/14/dogs-8567089_1280.png" alt="Imagen de un perro" className="banner-image" />
        </div>
        <div className="banner-section text-section">
          <h2>¡Bienvenido! En este panel podrás gestionar la información sobre las citas de cada perro de la universidad.</h2>
        </div>
        <div className="banner-section image-section">
          <img src="https://cdn.pixabay.com/photo/2020/08/02/14/34/dogs-5457759_640.png" alt="Imagen de un perro" className="banner-image" />
        </div>
      </div>
      <div className="dog-cards-container">
        {perros.length > 0 ? (
          perros.map((perro) => (
            <div key={perro._id} className="dog-card" onClick={() => handleDogClick(perro._id)}>
              <p><strong>Nombre:</strong> {perro.nombre}</p>
              <p><strong>Raza:</strong> {perro.raza}</p>
            </div>
          ))
        ) : (
          <p>No hay perros registrados.</p>
        )}
      </div>
      {user && user.roles.includes('admin') && (
        <>
          <div>
            <button onClick={handleNewAppointment} className="new-appointment-button">
              Nueva Cita
            </button>
          </div>
        </>
      )}
      
    </div>
  );
}

export default ShowDogs;
