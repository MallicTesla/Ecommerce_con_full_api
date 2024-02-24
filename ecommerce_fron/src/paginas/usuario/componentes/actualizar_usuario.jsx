import React, { useState, useEffect } from "react";
import ActualizarUsuarioForm from "./actualizar_usuario_form";
import { obtenerUsuarioPorId, actualizarUsuario } from "../api/actualizar_usuario_api";

const ActualizarUsuario = ({ usuarioId }) => {
    const [usuario, setUsuario] = useState({
        nombre_usuario: "",
        email: "",
        nombre: "",
        apellido: "",
        password: "",
    });

    useEffect(() => {
        const cargarUsuario = async () => {
        try {
            const data = await obtenerUsuarioPorId (usuarioId);
            setUsuario(data);

        } catch (error) {
            // Manejar el error si es necesario
        }
        };

        cargarUsuario();
    }, [usuarioId]);

    const handleInputChange = (e) => {
        setUsuario ({ ...usuario, [e.target.name]: e.target.value });
    };

    const handleActualizarUsuario = async () => {
        await actualizarUsuario (usuarioId, usuario);
        // Puedes redirigir a otra página después de la actualización si es necesario.
    };

    return (
        <ActualizarUsuarioForm
        usuario = {usuario}
        handleInputChange = {handleInputChange}
        handleActualizarUsuario = {handleActualizarUsuario}
        />
    );
};

export default ActualizarUsuario;