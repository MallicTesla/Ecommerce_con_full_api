import axios from "axios";

export const usuarios_api = async () => {
    try {
        const response = await axios.get("http://127.0.0.1:8000/usuario/usuario/");
        return response.data;
    } catch (error) {
        console.error("Error al obtener usuarios:", error.response.data);
        return [];
    }
};
