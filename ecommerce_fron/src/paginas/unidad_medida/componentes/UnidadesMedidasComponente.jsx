import React from "react";
import { Link } from "react-router-dom";
import MostrarUnidadesMedidas from "../componente_intermedio/unidades_medidas";

function UnidadesMedidasComponente() {
    const detalles = MostrarUnidadesMedidas();

    return (
        <div>
            <div>
                <h2> Unidades medidas </h2>
                <hr />

                {detalles.map((output, id) => (
                    <div key={id}>
                        <div>
                            <h3> Unidad de medida : {output.descripción} </h3>
                            <h4> ID : {output.id} </h4>

                            <h4> Creada : {output.frcha_creacion} </h4>
                            <h4> Actualizada : {output.fecha_modificado} </h4>

                            <li><Link to={{ pathname: `/unidad_medida/${output.id}` }}> Mas  </Link></li>
                            <hr />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UnidadesMedidasComponente;
