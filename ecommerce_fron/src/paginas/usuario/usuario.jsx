import { BrowserRouter as useNavigate  } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

import Usuarios from "./usuarios";

function Usuario () {
    const [detalles, setDetalles] = useState([]);
    const [usuarioId, setUsuarioId] = useState();
    const [mostrarUsuarios, setMostrarUsuarios] = useState(true);
    // const navigate = useNavigate();

    const obtenerUsuarioPorId = () => {
        axios.get (`http://127.0.0.1:8000/usuario/usuario/${usuarioId}/`).then ((res) => {
            const data = res.data;
            setDetalles ([data]);
            setMostrarUsuarios (false);  
        })
        .catch((err) => {});
    };

    // {mostrarUsuarios ? ( navigate ("/usuaris", usuarioId ) ) : (<h2> Usuario </h2>)}
    // navigate("/usuaris", usuarioId );

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
            </div>

            {mostrarUsuarios ? (
                <Usuarios />
                // <h1> asdasd </h1>
            ) : (
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
            )}
        </div>
    );
}

export default Usuario;