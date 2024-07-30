import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCitasVetByDogId } from '../../services/CitaVet.service';
import { getDogById } from '../../services/dog.service';
import Navbar from '../../../src/components/NavBar';
import '../../index.css';

function DogAppointments() {
  const [citas, setCitas] = useState([]);
  const [lastCita, setLastCita] = useState(null);
  const [dog, setDog] = useState(null);
  const [filterState, setFilterState] = useState('all');
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [citasData, dogData] = await Promise.all([
          getCitasVetByDogId(id),
          getDogById(id)
        ]);

        if (!citasData || citasData.length === 0) {
          alert('No hay citas registradas para este perro.');
          return;
        }

        const today = new Date();
        const sortedCitas = citasData.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
        const closestCita = sortedCitas.reduce((closest, cita) => {
          const citaDate = new Date(cita.fecha);
          if (!closest) return cita;
          return Math.abs(citaDate - today) < Math.abs(new Date(closest.fecha) - today) ? cita : closest;
        }, null);

        setLastCita(closestCita); // La cita con la fecha más cercana a hoy
        setCitas(sortedCitas.filter(cita => cita !== closestCita)); // El resto de las citas
        setDog(dogData);

      } catch (error) {
        setError('Error al obtener los datos.');
        console.error('Error:', error);
      }
    };
    fetchData();
  }, [id]);

  const formatFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES'); // Formato 'dd/mm/yyyy'
  };

  const handleFilterChange = (e) => {
    setFilterState(e.target.value);
  };

  const filteredCitas = filterState === 'all'
    ? citas
    : citas.filter(cita => cita.state === filterState);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="menu-principal-container">
        <h2 className='titleC'>Citas para {dog ? dog.nombre : 'el Perro'}</h2>
        {lastCita ? (
          <>
            <h3 className='titleC'>Próxima Cita</h3>
            <div key={lastCita._id} className="cita-item last-cita" onClick={() => navigate(`/editar-cita/${lastCita._id}`)}>
              <p><strong>Fecha:</strong> {formatFecha(lastCita.fecha)}</p>
              <p><strong>Razón:</strong> {lastCita.motivo}</p>
              <p><strong>Estado:</strong> {lastCita.state}</p>
            </div>
          </>
        ) : (
          <p>No hay citas registradas para este perro.</p>
        )}
        {citas.length > 0 && (
          <>
            <h3 className='titleC'>Todas las citas</h3>
            <div className="filter-container">
              <label htmlFor="state-filter">Filtrar por estado:</label>
              <select id="state-filter" value={filterState} onChange={handleFilterChange}>
                <option value="all">Todos</option>
                <option value="por confirmar">Por confirmar</option>
                <option value="confirmada">Confirmada</option>
                <option value="cancelada">Cancelada</option>
              </select>
            </div>
            <div className="citas-grid">
              {filteredCitas.map((cita) => (
                <div key={cita._id} className="cita-item" onClick={() => navigate(`/editar-cita/${cita._id}`)}>
                  <p><strong>Fecha:</strong> {formatFecha(cita.fecha)}</p>
                  <p><strong>Razón:</strong> {cita.motivo}</p>
                  <p><strong>Estado:</strong> {cita.state}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DogAppointments;
