import axios from "axios";


// Declara una función 'boton_crear' que se ejecuta cuando se hace clic en el botón "Crear Usuario".
const boton_crear = async (usuario) => {
    try {
        // Realiza una solicitud POST a la URL especificada con los detalles del usuario.
        const response = await axios.post("http://127.0.0.1:8000/usuario/usuario/", usuario);
        // Registra la respuesta en la consola.
        console.log(response.data);
        // Maneja la respuesta, por ejemplo, redirigiendo a otra página después de crear el usuario.
    } catch (error) {
        // Captura errores y los registra en la consola.
        console.error("Error al crear usuario:", error.response.data);
        // Maneja el error de creación de usuario, por ejemplo, mostrando un mensaje al usuario.
    }
};

export default boton_crear;
