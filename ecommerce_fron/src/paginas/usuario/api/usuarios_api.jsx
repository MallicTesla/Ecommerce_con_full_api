import axios from "axios";

import { USUARIO_API_URL } from "../../../urls_base";


export const usuarios_api = async () => {
    try {
        const response = await axios.get(USUARIO_API_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener usuarios:", error.response.data);
        return [];
    }
};
