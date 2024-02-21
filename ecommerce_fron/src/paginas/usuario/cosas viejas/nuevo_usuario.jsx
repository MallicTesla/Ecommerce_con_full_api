import React, { useState } from "react";
import axios from "axios";

// Declara el componente funcional CrearUsuario.
const CrearUsuario = () => {
    // Utiliza el hook useState para declarar un estado llamado 'usuario' con un valor inicial de un objeto vacío.
    const [usuario, setUsuario] = useState({
        nombre_usuario: "",
        email: "",
        nombre: "",
        apellido: "",
        password: "",
    });

    // Declara una función 'handleInputChange' que se ejecuta cuando hay cambios en los campos de entrada del formulario.
    const handleInputChange = (e) => {
        // Actualiza el estado 'usuario' copiando el estado actual y sobrescribiendo la propiedad correspondiente con el nuevo valor.
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    };

    // Declara una función 'handleCrearUsuario' que se ejecuta cuando se hace clic en el botón "Crear Usuario".
    const handleCrearUsuario = async () => {
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

    // Retorna la estructura del componente, que es un formulario para crear un nuevo usuario.
    return (
        <div>
            <h2>Crear Usuario</h2>
            {/* Cada div representa un campo de entrada del formulario con su respectiva etiqueta y controlado por el estado 'usuario'. */}
            <div>
                <label>Nombre de Usuario:</label>
                <input
                    type="text"
                    name="nombre_usuario"
                    value={usuario.nombre_usuario}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="text"
                    name="email"
                    value={usuario.email}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Nombre:</label>
                <input
                    type="text"
                    name="nombre"
                    value={usuario.nombre}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Apellido:</label>
                <input
                    type="text"
                    name="apellido"
                    value={usuario.apellido}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={usuario.password}
                    onChange={handleInputChange}
                />
            </div>
            {/* El botón "Crear Usuario" llama a la función 'handleCrearUsuario' cuando se hace clic. */}
            <button onClick={handleCrearUsuario}>Crear Usuario</button>
        </div>
    );
};

// Exporta el componente CrearUsuario para que pueda ser utilizado en otros archivos.
export default CrearUsuario;
