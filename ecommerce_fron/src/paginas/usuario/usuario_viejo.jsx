import React, { useState, useEffect } from "react";
import axios from "axios";

function Usuario() {
    const [detalles, setDetalles] = useState([]);
    const [usuarioId, setUsuarioId] = useState("");
    const [mostrarUsuarios, setMostrarUsuarios] = useState(true);

    const obtenerUsuarioPorId = () => {
        axios.get (`http://127.0.0.1:8000/usuario/usuario/${usuarioId}/`).then ((res) => {
            const data = res.data;
            setDetalles ([data]);
            setMostrarUsuarios (false);                          // Oculta la lista de usuarios al mostrar uno específico por ID.
        })
        .catch((err) => {});
    };

    const obtenerUsuarios = () => {
        axios.get (`http://127.0.0.1:8000/usuario/usuario/`).then ((res) => {
            const data = res.data;
            setDetalles (data);
            setMostrarUsuarios (true);                           // Muestra la lista de usuarios al obtener todos.
        })
        .catch((err) => {});
    };

    useEffect(() => {
        obtenerUsuarios(); // Llama a obtenerUsuarios cuando el componente se monta
    }, []);


    // useEffect(() => {{mostrarUsuarios ? (obtenerUsuarios()) : (window.location.reload())}
    //     // obtenerUsuarios(); // Llama a obtenerUsuarios cuando el componente se monta
    // }, []);

    return (
        <div>
            <h1> Vista de Usuarios </h1>
            <hr />

            <div>
                <label> ID del Usuario: </label>
                <input type="text" value={usuarioId} onChange = {(e) => setUsuarioId (e.target.value)}/>
                <button onClick = {obtenerUsuarioPorId}> Mostrar Usuario por ID </button>
            </div>
            <hr />

            {mostrarUsuarios ? (<h2> Usuarios </h2>) : (<h2> Usuario </h2>)}
            <hr />

            {detalles.map ((output, id) => (
                <div key = {id}>
                    {mostrarUsuarios ? (
                        <div>
                            <h3> Nombre de usuario : {output.nombre_de_usuario}</h3>
                            <h4> ID : {output.id}</h4>
                            <h4> Email : {output.correo}</h4>
                            <hr />
                        </div>
                    ) : (
                        <div>
                            <h3> Nombre de usuario : {output.nombre_usuario}</h3>
                            <h4> ID : {output.id}</h4>
                            <h4> Nombre : {output.nombre}</h4>
                            <h4> Apellido : {output.apellido}</h4>
                            <h4> Email : {output.email}</h4>
                            <h4> Grupos : {output.groups}</h4>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Usuario;