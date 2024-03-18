import React from "react";

import MostrarUnidadesMedidas from "../../unidad_medida/componente_intermedio/unidades_medidas";
import MostrarCategorias from "../../categoria/componente_intermedio/MostrarCategorias";


const ActualizarProductoForm = ({ producto, handleInputChange, handleActualizarProducto }) => {
    const mostrarUnidadesMedidas = MostrarUnidadesMedidas();
    const mostrarCategoria = MostrarCategorias();

    const handleFileInputChange = (e) => { handleInputChange(e); };

    return (
        <div>
            <h2>Actualizar Producto</h2>

            <div>
                <label> Producto : </label>
                <input
                    type = "text"
                    name = "producto"
                    value = {producto.producto}
                    onChange = {handleInputChange}
                />
            </div>

            <div>
                <label> Precio : </label>
                <input
                    type = "text"
                    name = "precio"
                    value = {producto.precio}
                    onChange = {handleInputChange}
                />
            </div>

            <div>
                <label> Descripcion producto : </label>
                <textarea
                    name = "descripcion_producto"
                    value = {producto.descripcion_producto}
                    onChange = {handleInputChange}
                />
            </div>

            <div>
                <label> Unidad de medida : </label>
                <select
                    name = "unidad_medida"
                    value = {producto.unidad_medida}
                    onChange = {handleInputChange}
                >

                {mostrarUnidadesMedidas.map ((output) => (
                    <option value = {output.id}> {output.descripción} </option>
                ))}
                </select>
            </div>

            <div>
                <label> Categoria producto : </label>
                <select
                    name = "categoria_producto"
                    value = {producto.categoria_producto}
                    onChange = {handleInputChange}
                >

                {mostrarCategoria.map ((output) => (
                    <option value = {output.id}> {output.descripción} </option>
                ))}
                </select>
            </div>

            <div>
                <label> Imagen : </label>
                <input
                    type = "file"
                    accept = "image/*"
                    name = "imagen_producto"
                    onChange = {handleFileInputChange}
                />
            </div>

            <button onClick = {handleActualizarProducto}>Actualizar Producto</button>
        </div>
    );
};

export default ActualizarProductoForm;