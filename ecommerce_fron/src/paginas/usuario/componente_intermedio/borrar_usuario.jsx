import React from "react";
import { useNavigate } from "react-router-dom";
import { borrar_usuario } from "../api/borrar_usuario_api";

function Borrar_Usuario({ usuarioId }) {
    const navigate = useNavigate();

    const borrarUsuarioHandler = () => {
        const confirmacion = window.confirm("¿Estás seguro de que quieres borrar este usuario?");
        if (confirmacion) {
            borrarUsuario();
        }
    };

    const borrarUsuario = async () => {
        try {
            await borrar_usuario(usuarioId);
            // Redirige a la página de lista de usuarios u otra página deseada después de borrar
            navigate("/usuarios");
        } catch (error) {
        // Manejar el error si es necesario
        }
    };

    return (
        <button onClick={borrarUsuarioHandler}>Borrar usuario</button>
    );
}

export default Borrar_Usuario;