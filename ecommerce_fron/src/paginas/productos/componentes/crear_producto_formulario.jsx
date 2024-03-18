import React from "react";
import MostrarUnidadesMedidas from "../../unidad_medida/componente_intermedio/unidades_medidas";
import MostrarCategorias from "../../categoria/componente_intermedio/MostrarCategorias";


const CrearProductoForm = ({ producto, input_form, boton_crear }) => {
    const mostrarUnidadesMedidas = MostrarUnidadesMedidas();
    const mostrarCategoria = MostrarCategorias();

    // Función para manejar el cambio de archivo seleccionado
    const handleFileInputChange = (e) => {
        // Actualizar el estado del producto con la imagen seleccionada
        input_form(e);
        // Aquí puedes añadir más lógica si es necesario
    };

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
                <label> Precio : </label>
                <input
                    type="text"
                    name="precio"
                    value={producto.precio}
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
                <label> Unidad de medida : </label>
                <select
                    name="unidad_medida"
                    value={producto.unidad_medida}
                    onChange={input_form}
                >
                    {mostrarUnidadesMedidas.map((output) => (
                        <option value={output.id} key={output.id}>{output.descripción}</option>
                    ))}
                </select>
            </div>

            <div>
                <label> Categoria producto : </label>
                <select
                    name="categoria_producto"
                    value={producto.categoria_producto}
                    onChange = {input_form}
                >
                    {mostrarCategoria.map((output) => (
                        <option value={output.id} key={output.id}>{output.descripción}</option>
                    ))}
                </select>
            </div>

            <div>
                <label> Imagen : </label>
                <input
                    type="file"
                    accept="image/*"
                    name="imagen_producto"
                    onChange={handleFileInputChange}
                />
            </div>

            {/* El botón "Crear Producto" llama a la función 'boton_crear' cuando se hace clic. */}
            <button onClick={boton_crear}>Crear Producto</button>
        </div>
    );
};

export default CrearProductoForm;