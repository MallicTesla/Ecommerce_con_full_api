import React from "react";


const ActualizarUnidadMedidaForm = ({ unidad_medida, handleInputChange, handleActualizar_Unidad_medida, camposObligatorios }) => {

    return (
        <div>
            <h2>Actualizar Producto</h2>

            <div>
                <label> Producto : </label>
                <input
                    type = "text"
                    name = "descripción"
                    value = {unidad_medida.descripción}
                    onChange = {handleInputChange}
                />
                {camposObligatorios.descripción && <p style = {{ color: "red" }}> Este campo es obligatorio </p>}
            </div>

            <button onClick = {handleActualizar_Unidad_medida}>Actualizar Producto</button>
        </div>
    );
};

export default ActualizarUnidadMedidaForm;