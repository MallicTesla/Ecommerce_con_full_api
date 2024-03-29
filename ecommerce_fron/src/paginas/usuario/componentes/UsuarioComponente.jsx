import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { obtenerUsuarioPorId } from "../api/api";

import ActualizarUsuario from "../componente_intermedio/actualizar_usuario";
import Borrar_Usuario from "../componente_intermedio/borrar_usuario"; 
import CambiarContraseña from "../componente_intermedio/cambiar_contraseña";


function UsuarioComponente() {
    const [detalles, setDetalles] = useState([]);
    const [usuarioId, setUsuarioId] = useState("");
    const [error, setError] = useState (null);
    const [mostrarActualizar, setMostrarActualizar] = useState (false);
    const [mostrarCambiarContraseña, setMostrarCambiarContraseña] = useState(false); // Nuevo estado para controlar la visibilidad del componente CambiarContraseña
    const { id_id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id_id) {
            cargarUsuario (id_id);
        }
    }, [id_id]);

    const cargarUsuario = async (id) => {
        try {
            const data = await obtenerUsuarioPorId (id);
            setDetalles ([data]);
        } catch (error) {
            setError ("No se han podido cargar los usuarios");
        }
    };

    const handleClick = async () => {
        navigate ("/usuario/" + usuarioId);
        await cargarUsuario (usuarioId);
    };

    const editar_usuario = () => {
        setMostrarActualizar (true);
    };

    const onActualizarUsuario = async () => {
        const updatedUser = await obtenerUsuarioPorId (id_id);
        setDetalles ([updatedUser]);
        setMostrarActualizar (false);
    };

    const handleContraseñaActualizada = () => {
        // Aquí puedes realizar acciones adicionales después de cambiar la contraseña si es necesario
        setMostrarCambiarContraseña(false);
    };

    return (
        <div>
            <div>
                <h1>Vista de Usuarios</h1>
                <hr />

                <div>
                    <label>ID del Usuario:</label>
                    <input type = "text" value = {usuarioId} onChange = {(e) => setUsuarioId (e.target.value)} />
                    <button onClick = {handleClick}>Mostrar Usuario por ID</button>
                </div>
                <hr />
            </div>

            <div>
                <h2>Usuario</h2>
                <hr />
                {detalles.map((output, id) => (
                    <div key={id}>
                        <div>
                            <h3>Nombre de usuario: {output.nombre_usuario}</h3>
                            <h4>ID: {output.id}</h4>
                            <h4>Nombre: {output.nombre}</h4>
                            <h4>Apellido: {output.apellido}</h4>
                            <h4>Email: {output.email}</h4>
                            <h4>Grupos: {output.groups}</h4>
                        </div>
                    </div>
                ))}

                {error && <p style = {{ color: "red" }}> {error} </p>}
            </div>

            <div>
                <div>
                    <button onClick = {editar_usuario}> Editar usuario </button>
                    <Borrar_Usuario usuarioId = {id_id} />
                </div>
                <hr />

                <div>
                    {mostrarActualizar && (
                        <div>

                            <ActualizarUsuario usuarioId = {id_id} onActualizarUsuario = {onActualizarUsuario} />

                            <button onClick={() => setMostrarCambiarContraseña(!mostrarCambiarContraseña)}> Cambiar Contraseña </button>
                            {mostrarCambiarContraseña && (
                                <CambiarContraseña usuarioId = {id_id} onContraseñaActualizada = {handleContraseñaActualizada} />
                            )}
                        </div>

                    )}
                </div>
            </div>
        </div>
    );
}

export default UsuarioComponente;
