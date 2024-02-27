import React, { useState, useEffect } from "react";

import ActualizarUsuarioForm from "../componentes/actualizar_usuario_form";
import { obtenerUsuarioPorId, actualizarUsuario } from "../api/api";


const ActualizarUsuario = ({ usuarioId, onActualizarUsuario }) => {
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
        try {
            await actualizarUsuario (usuarioId, usuario);
            // Actualización exitosa, establece el estado actualizacionExitosa en true
            onActualizarUsuario();
        } catch (error) {
            // Manejar el error si es necesario
        }
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