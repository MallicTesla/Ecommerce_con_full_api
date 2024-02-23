import axios from "axios";

export const obtenerUsuarioPorId = async (usuarioId) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/usuario/usuario/${usuarioId}/`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener usuario:", error.response.data);
        throw error;
    }
};