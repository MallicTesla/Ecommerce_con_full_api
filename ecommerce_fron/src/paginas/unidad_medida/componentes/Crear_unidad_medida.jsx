import React from "react";


const CrearUnidadMedidaForm = ({ unidad_medida, input_form, boton_crear, camposObligatorios })  => {

    // Retorna la estructura del componente, que es un formulario para crear un nuevo unidad_medida.
    return (
        <div>
            <h2> Agregar Unidad Medida </h2>
            {/* Cada div representa un campo de entrada del formulario con su respectiva etiqueta y controlado por el estado 'unidad_medida'. */}
            <div>
                <label> Unidad Medida : </label>
                <input
                    type = "text"
                    name = "descripción"
                    // value = {unidad_medida.descripción}
                    onChange = {input_form}
                />

                {camposObligatorios.unidad_medida && <p style = {{ color: "red" }}> Este campo es obligatorio </p>}
            </div>

            <div>
                <button onClick = {boton_crear}> Crear Unidad Medida </button>
            </div>

        </div>
    );
};

export default CrearUnidadMedidaForm;