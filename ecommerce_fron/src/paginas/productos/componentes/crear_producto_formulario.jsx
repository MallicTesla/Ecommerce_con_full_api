import React from "react";


const CrearProductoForm = ({ producto, input_form, boton_crear }) => {
    // Retorna la estructura del componente, que es un formulario para crear un nuevo producto.
    return (
        <div>
            <h2>Agregar Producto</h2>
            {/* Cada div representa un campo de entrada del formulario con su respectiva etiqueta y controlado por el estado 'producto'. */}
            <div>
                <label> Producto : </label>
                <input
                    type="text"
                    name="producto"
                    value={producto.producto}
                    onChange={input_form}
                />
            </div>

            <div>
                <label> Descripcion producto : </label>
                <textarea
                    name="descripcion_producto"
                    value={producto.descripcion_producto}
                    onChange={input_form}
                />
            </div>

            <div>
                <label>Unidad de medida:</label>
                <select
                    name="unidad_medida"
                    value={producto.unidad_medida}
                    onChange={input_form}
                >

                    <option value="kilogramos">Kilogramos</option>
                    <option value="litros">Litros</option>
                    <option value="piezas">Piezas</option>
                </select>
            </div>

            <div>
                <label>Categoria producto:</label>
                <select
                    name="categoria_producto"
                    value={producto.categoria_producto}
                    onChange={input_form}
                >

                    <option value="electronicos">Electrónicos</option>
                    <option value="ropa">Ropa</option>
                    <option value="alimentos">Alimentos</option>
                </select>
            </div>

            {/* El botón "Crear Producto" llama a la función 'boton_crear' cuando se hace clic. */}
            <button onClick={boton_crear}>Crear Producto</button>
        </div>
    );
};

export default CrearProductoForm;
