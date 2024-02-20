import React, { useState, useEffect } from "react";
import axios from "axios";


function Usuarios () {
    const [detalles, setDetalles] = useState([]);

    const obtenerUsuarios = () => {
        axios.get (`http://127.0.0.1:8000/usuario/usuario/`).then ((res) => {
            const data = res.data;
            setDetalles (data);
        })
        .catch((err) => {});
    };

    useEffect(() => {
        obtenerUsuarios();
    }, []);

    return (
        <div>

            <div>

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