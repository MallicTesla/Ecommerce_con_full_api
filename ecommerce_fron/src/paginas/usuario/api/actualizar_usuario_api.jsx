import axios from "axios";
import { USUARIO_API_URL } from "../../../urls_base";

export const obtenerUsuarioPorId = async (usuarioId) => {
    try {
        const response = await axios.get (`${USUARIO_API_URL}/${usuarioId}/`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const actualizarUsuario = async (usuarioId, usuario) => {
    try {
        await axios.put (`${USUARIO_API_URL}${usuarioId}/`, usuario);
        console.log("Usuario actualizado correctamente");
    } catch (error) {
        console.error("Error al actualizar usuario:", error.response.data);
        throw error;
    }
};