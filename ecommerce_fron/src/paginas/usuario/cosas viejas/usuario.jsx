import { useNavigate  } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { useParams  } from "react-router-dom";


function Usuario () {
    const [detalles, setDetalles] = useState([]);
    const [usuarioId, setUsuarioId] = useState();
    const {id_id} = useParams ();

    useEffect (( ) => { 
        if (id_id) {
            obtenerUsuarioPorId (id_id);
        }
    },[id_id] );
    const navigate = useNavigate();

    const obtenerUsuarioPorId = (usuarioId) => {
        axios.get (`http://127.0.0.1:8000/usuario/usuario/${usuarioId}/`).then ((res) => {
            const data = res.data;
            setDetalles ([data]);
        })
        .catch((err) => {});
    };


    return (
        <div>
            <div>
                <h1> Vista de Usuarios  {id_id} </h1>
                <hr />

                <div>
                    <label> ID del Usuario: </label>
                    <input type="text" value={usuarioId} onChange = {(e) => setUsuarioId (e.target.value)}/>
                    <button onClick = {() => {navigate ("/usuario/"+usuarioId);obtenerUsuarioPorId (usuarioId)} }> Mostrar Usuario por ID </button>
                </div>
                <hr />
            </div>
            <div>
                <h2> Usuario </h2>
                <hr />

                {detalles.map ((output, id) => (
                    <div key = {id}>
                        <div>
                            <h3> Nombre de usuario : {output.nombre_usuario}</h3>
                            <h4> ID : {output.id}</h4>
                            <h4> Nombre : {output.nombre}</h4>
                            <h4> Apellido : {output.apellido}</h4>
                            <h4> Email : {output.email}</h4>
                            <h4> Grupos : {output.groups}</h4>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Usuario;