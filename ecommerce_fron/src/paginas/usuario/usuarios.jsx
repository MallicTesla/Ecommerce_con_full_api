import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Route, Routes, useNavigate  } from "react-router-dom";
import axios from "axios";

import Usuario from "./usuario";

function Usuarios () {
    const [detalles, setDetalles] = useState([]);
    const [usuarioId, setUsuarioId] = useState();
    const [mostrarUsuarios, setMostrarUsuarios] = useState(true);
    const navigate = useNavigate(); // Importa useNavigate desde react-router-dom y declara una instancia de navigate.


    const obtenerUsuarioPorId = () => {
        setMostrarUsuarios (false);                             // Oculta la lista de usuarios al mostrar uno específico por ID.
        // Cambia la ruta a /usuario y pasa el usuarioId como state
        navigate("/usuario", { state: { usuarioId } });
    };

    const obtenerUsuarios = () => {
        axios.get (`http://127.0.0.1:8000/usuario/usuario/`).then ((res) => {
            const data = res.data;
            setDetalles (data);
            // setMostrarUsuarios (true);                           // Muestra la lista de usuarios al obtener todos.
        })
        .catch((err) => {});
    };

    useEffect(() => {
        obtenerUsuarios(); // Llama a obtenerUsuarios cuando el componente se monta
    }, []);

    return (
        <div>

            <div>
                <h1> Vista de Usuarios </h1>
                <hr />

                <div>
                    <label> ID del Usuario: </label>
                    <input type="text" value={usuarioId} onChange = {(e) => setUsuarioId (e.target.value)}/>
                    <button onClick = {obtenerUsuarioPorId}> Mostrar Usuario por ID </button>
                </div>
                <hr />

                <h2> Usuarios </h2>
                <hr />

                {detalles.map ((output, id) => (
                    <div key = {id}>
                        <div>
                            <h3> Nombre de usuario : {output.nombre_de_usuario}</h3>
                            <h4> ID : {output.id}</h4>
                            <h4> Email : {output.correo}</h4>
                            <hr />
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Usuarios;