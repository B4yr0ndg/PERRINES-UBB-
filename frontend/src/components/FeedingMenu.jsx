import React, { useState, useEffect } from 'react';
import { getAllFeedings, getFeedingById } from '../services/feeding.service';
import axios from '../services/root.service';
import { useAuth } from '../context/AuthContext'; 
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from '../../src/components/NavBar';
import './FeedingMenu.css';

const FeedingMenu = () => {
    const { user } = useAuth(); 
    const [allFeedings, setAllFeedings] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllFeedings = async () => {
            try {
                const data = await getAllFeedings();
                if (data && Array.isArray(data.data)) {
                    setAllFeedings(data.data);
                } else {
                    setError('Formato de datos incorrecto');
                }
            } catch (error) {
                console.error('Error al obtener todas las alimentaciones:', error.response?.data || error.message);
                setError('Error al obtener todas las alimentaciones');
            } finally {
                setLoading(false);
            }
        };

        fetchAllFeedings();
    }, []);

    const findDogIdByName = (name, feedings) => {
        const feeding = feedings.find(feeding => feeding.perro && feeding.perro.nombre.toLowerCase() === name.toLowerCase());
        return feeding ? feeding.perro._id : null;
    };

    const handleSearchByName = () => {
        Swal.fire({
            title: 'Buscar Alimentación por Nombre del Perro',
            input: 'text',
            inputPlaceholder: 'Ingrese el nombre del perro',
            showCancelButton: true,
            confirmButtonText: 'Buscar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const perroNombre = result.value;
                if (perroNombre) {
                    const perroId = findDogIdByName(perroNombre, allFeedings);
                    if (perroId) {
                        try {
                            const data = await getFeedingById(perroId);
                            console.log('Datos recibidos del backend:', data); // Verifica los datos recibidos
                            setSearchResults(data);
                        } catch (error) {
                            Swal.fire('Error', error.message, 'error');
                        }
                    } else {
                        Swal.fire('Error', 'No se encontró un perro con ese nombre', 'error');
                    }
                }
            }
        });
    };

    const handleDelete = async (perroId) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminarlo!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`/feeding/eliminar/${perroId}`);
                    console.log('Alimentación eliminada:', response.data);
                    Swal.fire('Eliminado!', 'La alimentación ha sido eliminada.', 'success');
                    const filterFeedings = (feeding) => feeding.perro._id !== perroId;
                    setAllFeedings((prevFeedings) => prevFeedings.filter(filterFeedings));
                } catch (error) {
                    console.error('Error al eliminar la alimentación:', error.response?.data || error.message);
                    Swal.fire('Error', 'Error al eliminar la alimentación', 'error');
                }
            }
        });
    };

    const handleDownloadPDF = async (perroId, perroNombre) => {
        try {
            console.log('Iniciando descarga del PDF...');
            const response = await axios.get(`/feeding/descargar/${perroId}`, {
                responseType: 'blob',
            });
            console.log('Datos recibidos del backend:', response.data);
    
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${perroNombre} alimentacion.pdf`);
            document.body.appendChild(link);
            link.click();
    
            console.log('PDF descargado correctamente');
            Swal.fire('Descargado', 'El PDF se ha descargado correctamente', 'success');
        } catch (error) {
            console.error('Error al descargar el PDF:', error.response?.data || error.message);
            Swal.fire('Error', 'Error al descargar el PDF', 'error');
        }
    };

    const handleActualizar = () => {
        navigate('/gestion-alimentacion');
    };

    const handleMenuPrincipal = () => {
        navigate('/menu');
    };

    useEffect(() => {
        console.log('Resultados de la búsqueda:', searchResults); // Añadir log para verificar estado
    }, [searchResults]);

    return (
        <div className="gestion-alimentacion-menu-container">
            <Navbar />
            <div >
                <h2>GESTIÓN DE ALIMENTACIÓN</h2>
                <div className="menu-actions">
                    {user?.roles.includes('admin') && (
                        <Link to="/gestion-alimentacion" className="menu-item">
                            Registrar Alimentación
                        </Link>
                    )}
                    <button onClick={handleSearchByName} className="search-button">Buscar por Nombre</button>
                </div>
                <h2>Todas las Alimentaciones</h2>
                {loading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div>{error}</div>
                ) : allFeedings.length > 0 ? (
                    <div className="feedings-list">
                        {allFeedings.map((feeding) => (
                            <div key={feeding._id} className="feeding-card">
                                <p><strong>Perro:</strong> {feeding.perro ? feeding.perro.nombre : 'Desconocido'}</p>
                                <p><strong>Tipo de Alimento:</strong> {feeding.tipoAlimento}</p>
                                <p><strong>Cantidad:</strong> {feeding.cantidad}g</p>
                                <p><strong>Frecuencia:</strong> {feeding.frecuencia}</p>
                                <p><strong>Horarios:</strong> {feeding.horariosAlimentacion.join(', ')}</p>
                                <p><strong>Límite Diario:</strong> {feeding.limiteDiario}g</p>
                                <p><strong>Horarios Permitidos:</strong> {feeding.horariosPermitidos.join(', ')}</p>
                                <button type="button" className="action-button" onClick={() => handleDownloadPDF(feeding.perro._id, feeding.perro.nombre)}>Descargar PDF</button>
                                {user?.roles.includes('admin') && (
                                    <>
                                        <button className="action-button" onClick={handleActualizar}>Actualizar</button>
                                        <button type="button" className="action-button action-button-delete" onClick={() => handleDelete(feeding.perro._id)}>Eliminar</button>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No hay alimentaciones registradas.</p>
                )}
                {searchResults.length > 0 && (
                    <>
                        <h2>Resultados de la Búsqueda</h2>
                        <div className="feedings-list">
                            {searchResults.map((feeding) => (
                                <div key={feeding._id} className="feeding-card">
                                    <p><strong>Perro:</strong> {feeding.perro ? feeding.perro.nombre : 'Desconocido'}</p>
                                    <p><strong>Tipo de Alimento:</strong> {feeding.tipoAlimento}</p>
                                    <p><strong>Cantidad:</strong> {feeding.cantidad}g</p>
                                    <p><strong>Frecuencia:</strong> {feeding.frecuencia}</p>
                                    <p><strong>Horarios:</strong> {feeding.horariosAlimentacion.join(', ')}</p>
                                    <p><strong>Límite Diario:</strong> {feeding.limiteDiario}g</p>
                                    <p><strong>Horarios Permitidos:</strong> {feeding.horariosPermitidos.join(', ')}</p>
                                    <button type="button" className="action-button" onClick={() => handleDownloadPDF(feeding.perro._id, feeding.perro.nombre)}>Descargar PDF</button>
                                    {user?.roles.includes('admin') && (
                                        <>
                                            <button className="action-button" onClick={handleActualizar}>Actualizar</button>
                                            <button type="button" className="action-button action-button-delete" onClick={() => handleDelete(feeding.perro._id)}>Eliminar</button>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </>
                )}
                <button onClick={handleMenuPrincipal} className="menu-principal-button">Volver</button>
            </div>
        </div>
    );
};

export default FeedingMenu;
