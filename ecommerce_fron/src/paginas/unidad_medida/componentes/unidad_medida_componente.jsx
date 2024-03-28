import React from "react";
import { useUnidadMedidaLogica } from "../componente_intermedio/unidad_medida_Logica";
import ActualizarUnidad_Medida from "../componente_intermedio/actualiszar_unidad_medida";
// import Borrar_Producto from "../componente_intermedio/borrar_producto";


function Unidad_medida_componente() {
    const {
        detalles,
        Unidad_Medida_ID,
        error,
        mostrarActualizar,
        id_id,
        setUnidad_Medida_ID,
        handleClick,
        editar_unidad_medida,
        onActualizarUnidadMedid,
    } = useUnidadMedidaLogica();


    return (
        <div>
            <div>
                <h1> Vista de Unidad de Medida ({id_id}) </h1>
                <hr />

                <div>
                    <label> ID del Unidad de Medida : </label>
                    <input type = "text" value = {Unidad_Medida_ID} onChange = {(e) => setUnidad_Medida_ID (e.target.value)} />
                    <button onClick = {handleClick}> Mostrar Unidad de Medida por ID </button>
                </div>
                <hr />
            </div>

            <div>
                <h2> Unidad de Medida </h2>
                <hr />
                {detalles.map ((output, id) => (
                    <div key = {id}>
                        <div>
                            <h3> Unidad de medida : {output.descripción} </h3>
                            <h4> ID : {output.id} </h4>

                            <h4> Creada : {output.frcha_creacion} </h4>
                            <h4> Actualizada : {output.fecha_modificado} </h4>
                        </div>
                    </div>
                ))}

                {error && <p style = {{ color: "red" }}>{error}</p>}
            </div>

            <div>
                <div>
                    <button onClick = {editar_unidad_medida}> Editar Unidad de Medida </button>
                    {/* <Borrar_Producto Unidad_Medida_ID = {id_id} /> */}
                </div>
                <hr />

                <div>
                    {mostrarActualizar && (
                        <div>
                            <ActualizarUnidad_Medida Unidad_Medida_ID = {id_id} onActualizarUnidadMedid = {onActualizarUnidadMedid} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Unidad_medida_componente;
