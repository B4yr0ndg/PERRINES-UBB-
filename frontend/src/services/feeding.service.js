// src/services/feeding.service.js
import axios from './root.service';

export const getFeedingById = async (id) => {
  const { data } = await axios.get(`/feeding/obtener/${id}`);
  return data;
};

export const getAllFeedings = async () => {
  const { data } = await axios.get('/feeding/todas');
  return data;
};

export const createFeeding = async (feedingData) => {
  const { data } = await axios.post('/feeding/crear', feedingData);
  return data;
};

export const updateFeeding = async (id, feedingData) => {
  const { data } = await axios.put(`/feeding/actualizar/${id}`, feedingData);
  return data;
};

export const deleteFeeding = async (id) => {
  const { data } = await axios.delete(`/feeding/eliminar/${id}`);
  return data;
};

export const downloadFeedingPDF = async (id) => {
  const { data } = await axios.get(`/feeding/descargar/${id}`, { responseType: 'blob' });
  return data;
};
