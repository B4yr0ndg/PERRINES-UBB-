// src/services/dog.service.js
import axios from './root.service';

export const getDogs = async () => {
  const { data } = await axios.get('/perros/todos');
  return data.data;
};

export const getDogById = async (id) => {
  const { data } = await axios.get(`/perros/obtener/${id}`);
  return data.data;
};

export const createDog = async (dogData) => {
  const { data } = await axios.post('/perros/crear', dogData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data.data;
};

export const updateDog = async (id, dogData) => {
  const { data } = await axios.put(`/perros/actualizar/${id}`, dogData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data.data;
};

export const deleteDog = async (id) => {
  const { data } = await axios.delete(`/perros/eliminar/${id}`);
  return data.data;
};

export const generateDogPdf = async (id) => {
  const { data } = await axios.get(`/perros/pdf/${id}`, { responseType: 'blob' });
  return data;
};
