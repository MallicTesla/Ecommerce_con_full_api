import React from "react";
import { Link } from "react-router-dom";
import MostrarCategorias from "../componente_intermedio/MostrarCategorias";

function CategoriasComponente() {
    const detalles = MostrarCategorias();

    return (
        <div>
            <div>
                <h2> Categorias </h2>
                <hr />

                {detalles.map ((output, id) => (
                    <div key = {id}>
                        <div>
                            <h3> Categoria : {output.descripción} </h3>
                            <h4> ID : {output.id} </h4>

                            <h4> Creada : {output.frcha_creacion} </h4>
                            <h4> Actualizada : {output.fecha_modificado} </h4>

                            <li><Link to = {{pathname: `/categoria/${output.id}` }} > Mas  </Link></li>
                            <hr />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoriasComponente;