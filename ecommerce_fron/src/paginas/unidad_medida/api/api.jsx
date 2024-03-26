import axios from "axios";
import { UNIDAD_MEDIDA_API_URL } from "../../../urls_base";

export const enviarPeticion = async (url, metodo, datos = null) => {
    try {
        let respuesta;
        switch (metodo.toLowerCase()) {
            case "optener_lista":
                respuesta = await axios.get (url);
                break;

            case "get":
                respuesta = await axios.get (url);
                break;

            case "post":
                respuesta = await axios.post (url, datos);
                break;

            case "put":
                respuesta = await axios.put (url, datos);
                break;

            case "patch":
                respuesta = await axios.put (url, datos);
                break;

            case "delete":
                respuesta = await axios.delete (url);
                break;

            default:
                throw new Error (`Método HTTP no válido: ${metodo}`);
        }
        return respuesta.data;

    } catch (error) {
        console.error (`Error en la solicitud a ${url}:`, error.response.data);
        throw error;
    }
};

export const optener_lista = async () => {
    const url = `${UNIDAD_MEDIDA_API_URL}`;
    return enviarPeticion (url, "optener_lista")
}

// export const obtenerUsuarioPorId = async (usuarioId) => {
//     const url = `${UNIDAD_MEDIDA_API_URL}${usuarioId}/`;
//     return enviarPeticion (url, "get");
// };

export const boton_crear = async (unidad_medida) => {
    console.log ("API");
    const url = UNIDAD_MEDIDA_API_URL;
    return enviarPeticion (url, "post", unidad_medida);
};

// export const actualizarUsuario = async (usuarioId, unidad_medida) => {
//     const url = `${UNIDAD_MEDIDA_API_URL}${usuarioId}/`;
//     return enviarPeticion (url, "put", unidad_medida);
// };

// export const borrar_usuario = async (usuarioId) => {
//     const url = `${UNIDAD_MEDIDA_API_URL}${usuarioId}/`;
//     return enviarPeticion (url, "delete");
// };

// export const actualizarContraseña = async (usuarioId, datosContraseña) => {
//     const url = `${UNIDAD_MEDIDA_API_URL}${usuarioId}/`;
//     return enviarPeticion(url, "patch", datosContraseña);
// };
