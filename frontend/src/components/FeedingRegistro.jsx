import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from '../services/root.service';
import { useNavigate } from 'react-router-dom';
import './FeedingRegistro.css';

const FeedingRegistro = () => {
    const [feeding, setFeeding] = useState({
        perroId: '',
        tipoAlimento: '',
        cantidad: '',
        frecuencia: '',
        horariosAlimentacion: '',
        limiteDiario: '',
        horariosPermitidos: ''
    });

    const [perros, setPerros] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPerros = async () => {
            try {
                const response = await axios.get('/perros/todos');
                console.log('Perros encontrados:', response.data);
                setPerros(response.data.data);
            } catch (error) {
                console.error('Error al obtener la lista de perros:', error);
            }
        };

        fetchPerros();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFeeding((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        Swal.fire({
            title: "¿Deseas guardar los cambios?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Guardar",
            denyButtonText: `No guardar`
        }).then(async (result) => {
            if (result.isConfirmed) {
                const formattedFeeding = {
                    ...feeding,
                    horariosAlimentacion: feeding.horariosAlimentacion.split(',').map(h => h.trim()),
                    horariosPermitidos: feeding.horariosPermitidos.split(',').map(h => h.trim())
                };
                try {
                    const response = await axios.post('/feeding/crear', formattedFeeding);
                    console.log('Alimentación registrada:', response.data);
                    Swal.fire("Guardado!", "La alimentación se ha registrado correctamente", "success");
                } catch (error) {
                    console.error('Error al registrar la alimentación:', error.response?.data || error.message);
                    Swal.fire('Error', 'Error al registrar la alimentación', 'error');
                }
            } else if (result.isDenied) {
                Swal.fire("Cambios no guardados", "", "info");
            }
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const formattedFeeding = {
            ...feeding,
            horariosAlimentacion: feeding.horariosAlimentacion.split(',').map(h => h.trim()),
            horariosPermitidos: feeding.horariosPermitidos.split(',').map(h => h.trim())
        };
        try {
            const response = await axios.put(`/feeding/actualizar/${feeding.perroId}`, formattedFeeding);
            console.log('Alimentación actualizada:', response.data);
            Swal.fire('Actualizado', 'La alimentación se ha actualizado correctamente', 'success');
        } catch (error) {
            console.error('Error al actualizar la alimentación:', error.response?.data || error.message);
            Swal.fire('Error', 'Error al actualizar la alimentación', 'error');
        }
    };

    return (
        <div className="gestion-perros-menu-container">
            <h2>GESTIÓN DE ALIMENTACIÓN</h2>
            <div className="banner">
                <div className="banner-section image-section">
                    <img src="https://cdn.pixabay.com/photo/2024/02/11/17/14/dogs-8567089_1280.png" alt="Imagen de un perro" className="banner-image" />
                </div>
                <div className="banner-section text-section">
                    <p>Registro de alimentación para perros</p>
                </div>
                <div className="banner-section image-section">
                    <img src="https://cdn.pixabay.com/photo/2024/02/11/17/14/dogs-8567089_1280.png" alt="Imagen de un perro" className="banner-image" />
                </div>
            </div>
            <form onSubmit={onSubmit} className="form-container">
                <select name="perroId" value={feeding.perroId} onChange={handleChange} className="input">
                    <option value="">Seleccionar perro</option>
                    {perros.map((perro) => (
                        <option key={perro._id} value={perro._id}>
                            {perro.nombre}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    name="tipoAlimento"
                    value={feeding.tipoAlimento}
                    onChange={handleChange}
                    placeholder="Tipo de Alimento"
                    required
                    className="input"
                />
                <input
                    type="number"
                    name="cantidad"
                    value={feeding.cantidad}
                    onChange={handleChange}
                    placeholder="Cantidad (en gramos)"
                    required
                    className="input"
                    min="0"
                />
                <input
                    type="text"
                    name="frecuencia"
                    value={feeding.frecuencia}
                    onChange={handleChange}
                    placeholder="Frecuencia"
                    required
                    className="input"
                />
                <input
                    type="text"
                    name="horariosAlimentacion"
                    value={feeding.horariosAlimentacion}
                    onChange={handleChange}
                    placeholder="Horarios de Alimentación (separados por comas)"
                    required
                    className="input"
                />
                <input
                    type="number"
                    name="limiteDiario"
                    value={feeding.limiteDiario}
                    onChange={handleChange}
                    placeholder="Límite Diario (en gramos)"
                    required
                    className="input"
                    min="0"
                />
                <input
                    type="text"
                    name="horariosPermitidos"
                    value={feeding.horariosPermitidos}
                    onChange={handleChange}
                    placeholder="Horarios Permitidos (separados por comas)"
                    required
                    className="input"
                />
                <div className="button-container">
                    <button type="submit" className="button">Registrar</button>
                    <button type="button" className="button" onClick={handleUpdate}>Actualizar</button>
                    <button type="button" className="button" onClick={() => navigate('/feeding-menu')}>Volver</button>
                </div>
            </form>
        </div>
    );
};

export default FeedingRegistro;
