import axios from "axios";
import { PRODUCTOS_API_URL } from "../../../urls_base";

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
                respuesta = await axios.post (url, datos, {
                    headers: {
                        // espesifica el tipo de contenido para que sea un formulario
                        'Content-Type': 'multipart/form-data'
                    }
                });
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
    const url = `${PRODUCTOS_API_URL}`;
    return enviarPeticion (url, "optener_lista")
}

export const obtenerProductoID = async (productoID) => {
    const url = `${PRODUCTOS_API_URL}${productoID}/`;
    return enviarPeticion (url, "get");
};

export const boton_crear = async (producto) => {
    const url = PRODUCTOS_API_URL;

    // crea un formulario vacio
    const form = new FormData ();

    // recore todos los campos del producto
    Object.keys (producto).forEach ((campo)=> {
        // y los agrega al formulario
        form.append (campo, producto [campo]);
    });

    return enviarPeticion (url, "post", form);
};

export const actualizarProducto = async (productoID, producto) => {
    const url = `${PRODUCTOS_API_URL}${productoID}/`;
    return enviarPeticion (url, "put", producto);
};

export const borrar_producto = async (productoID) => {
    const url = `${PRODUCTOS_API_URL}${productoID}/`;
    return enviarPeticion (url, "delete");
};

// export const actualizarContraseña = async (productoID, datosContraseña) => {
//     const url = `${PRODUCTOS_API_URL}${productoID}/`;
//     return enviarPeticion(url, "patch", datosContraseña);
// };
