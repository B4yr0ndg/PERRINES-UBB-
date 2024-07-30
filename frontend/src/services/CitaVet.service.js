import axios from './root.service';

export const getCitasVet = async () => {
    try {
        const { data } = await axios.get('/citas/getvet');
        return data.data;
    } catch (error) {
        console.error('Error al obtener las citas:', error);
        throw error;
    }
}

export const getCitaVetById = async (id) => {
    try {
        const { data } = await axios.get(`/citas/getvet/${id}`);
        return data.data;
    } catch (error) {
        console.error('Error al obtener la cita:', error);
        throw error;
    }
}

export const getCitasVetByDogId = async (id) => {
    try {
        const { data } = await axios.get(`/citas/getvet/dog/${id}`);
        return data.data;
    } catch (error) {
        console.error('Error al obtener las citas:', error);
        throw error;
    }
}

export const createCitaVet = async (citaVetData) => {
    try {
        const { data } = await axios.post('/citas/create/vet', citaVetData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return data.data;
    } catch (error) {
        console.error('Error al crear la cita:', error);
        throw error;
    }
}
export const updateCitaVet = async (id, citaVetData) => {
    try {
        const response = await axios.put(`/citas/update/vet/${id}`, citaVetData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data; 
    } catch (error) {
        console.error('Error al actualizar la cita:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const deleteCitaVet = async (id) => {
    try {
        const { data } = await axios.delete(`/citas/deleteVet/${id}`);
        return data.data;
    } catch (error) {
        console.error('Error al eliminar la cita:', error);
        throw error;
    }
}



