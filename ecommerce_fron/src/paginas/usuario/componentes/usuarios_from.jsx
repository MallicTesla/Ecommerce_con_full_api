import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { usuarios_api } from "../api/usuarios_api";

function Usuarios() {
    const [detalles, setDetalles] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        const data = await usuarios_api();
        setDetalles(data);
        };

        fetchData();
    }, []);

    return (
        <div>
            <div>
                <h2> Usuarios </h2>
                <hr />

                {detalles.map ((output, id) => (
                    <div key={id}>
                        <div>
                            <h3> Nombre de usuario : {output.nombre_de_usuario}</h3>
                            <h4> ID : {output.id}</h4>
                            <h4> Email : {output.correo}</h4>
                            <li><Link to={{pathname: `/usuario/${output.id}`}} > Mas  </Link></li>
                            <hr />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Usuarios;
