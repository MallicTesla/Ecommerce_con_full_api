import React from "react";

import MostrarUnidadesMedidas from "../../unidad_medida/componente_intermedio/unidades_medidas";
import MostrarCategorias from "../../categoria/componente_intermedio/MostrarCategorias";


const ActualizarProductoForm = ({ producto, handleInputChange, handleActualizarProducto, input_archivo, pre_visualizasion, camposObligatorios }) => {
    const mostrarUnidadesMedidas = MostrarUnidadesMedidas();
    const mostrarCategoria = MostrarCategorias();

    // const handleFileInputChange = (e) => { handleInputChange(e); };

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
                {camposObligatorios.producto && <p style = {{ color: "red" }}> Este campo es obligatorio </p>}
            </div>

            <div>
                <label> Precio : </label>
                <input
                    type = "text"
                    name = "precio"
                    value = {producto.precio}
                    onChange = {handleInputChange}
                />
                {camposObligatorios.precio && <p style = {{ color: "red" }}> Este campo es obligatorio </p>}
            </div>

            <div>
                <label> Descripcion producto : </label>
                <textarea
                    name = "descripcion_producto"
                    value = {producto.descripcion_producto}
                    onChange = {handleInputChange}
                />
                {camposObligatorios.descripcion_producto && <p style = {{ color: "red" }}> Este campo es obligatorio </p>}
            </div>

            <div>
                <label> Unidad de medida : </label>
                <select
                    name = "unidad_medida"
                    value = {producto.unidad_medida}
                    onChange = {handleInputChange}
                >

                    <option value = "" key = ""> Selecsionar Unidad de medida </option>
                {mostrarUnidadesMedidas.map ((output) => (
                    <option value = {output.id}> {output.descripción} </option>
                ))}
                </select>

                {camposObligatorios.unidad_medida && <p style = {{ color: "red" }}> Este campo es obligatorio </p>}
            </div>

            <div>
                <label> Categoria producto : </label>
                <select
                    name = "categoria_producto"
                    value = {producto.categoria_producto}
                    onChange = {handleInputChange}
                >

                    <option value = "" key = ""> Selecsionar Categoria producto </option>
                {mostrarCategoria.map ((output) => (
                    <option value = {output.id}> {output.descripción} </option>
                ))}
                </select>

                {camposObligatorios.categoria_producto && <p style = {{ color: "red" }}> Este campo es obligatorio </p>}
            </div>

            <div>
                <label> Imagen : </label>
                <input
                    type = "file"
                    accept = "image/*"
                    name = "imagen_producto"
                    onChange = {input_archivo}
                />
                {camposObligatorios.imagen_producto && <p style = {{ color: "red" }}> Este campo es obligatorio </p>}
            </div>

            <div>
                <h3> Vista previa de la imagen : </h3>
                {pre_visualizasion && (
                    <img
                        src = {URL.createObjectURL(pre_visualizasion)}
                        style = {{ maxWidth: "300px", maxHeight: "300px" }}
                        alt = "Vista previa de la imagen"
                    />
                )}
            </div>

            <button onClick = {handleActualizarProducto}>Actualizar Producto</button>
        </div>
    );
};

export default ActualizarProductoForm;