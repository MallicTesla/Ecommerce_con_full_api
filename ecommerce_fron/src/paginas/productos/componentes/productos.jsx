import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { optener_lista } from "../api/api";

function Productos() {
    const [detalles, setDetalles] = useState([]);

    useEffect (() => {
        const fetchData = async () => {
        const data = await optener_lista();
        setDetalles (data);
        };

        fetchData();
    }, []);

    return (
        <div>
            <div>
                <h2> Productos </h2>
                <hr />

                {detalles.map ((output, id) => (
                    <div key = {id}>
                        <div>
                            <h3> Nombre del producto : {output.producto} </h3>
                            <h4> ID : {output.id} </h4>
                            <h4> descripcion : {output.descripcion_producto}</h4>

                            <li><Link to = {{pathname: `/Producto/${output.id}` }} > Mas  </Link></li>
                            <hr />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Productos;