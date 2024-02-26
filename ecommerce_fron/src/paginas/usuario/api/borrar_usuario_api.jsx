import axios from "axios";
import { USUARIO_API_URL } from "../../../urls_base";

export const borrar_usuario = async (usuarioId) => {
    try {
        const response = await axios.delete (`${USUARIO_API_URL}${usuarioId}/`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener usuario:", error.response.data);
        throw error;
    }
};