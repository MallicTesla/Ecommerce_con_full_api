import React from "react";
import MostrarUnidadesMedidas from "../../unidad_medida/componente_intermedio/unidades_medidas";
import MostrarCategorias from "../../categoria/componente_intermedio/MostrarCategorias";


const CrearProductoForm = ({ producto, input_form, boton_crear, input_archivo, camposObligatorios })  => {
    const mostrarUnidadesMedidas = MostrarUnidadesMedidas();
    const mostrarCategoria = MostrarCategorias();

    // Retorna la estructura del componente, que es un formulario para crear un nuevo producto.
    return (
        <div>
            <h2> Agregar Producto </h2>
            {/* Cada div representa un campo de entrada del formulario con su respectiva etiqueta y controlado por el estado 'producto'. */}
            <div>
                <label> Producto : </label>
                <input
                    type = "text"
                    name = "producto"
                    value = {producto.producto}
                    onChange = {input_form}
                />

                {camposObligatorios.producto && <p style = {{ color: "red" }}> Este campo es obligatorio </p>}
            </div>

            <div>
                <label> Precio : </label>
                <input
                    type = "text"
                    name = "precio"
                    value = {producto.precio}
                    onChange = {input_form}
                />

                {camposObligatorios.precio && <p style = {{ color: "red" }}> Este campo es obligatorio </p>}
            </div>

            <div>
                <label> Descripcion producto : </label>
                <textarea
                    name = "descripcion_producto"
                    value = {producto.descripcion_producto}
                    onChange = {input_form}
                />

                {camposObligatorios.descripcion_producto && <p style = {{ color: "red" }}> Este campo es obligatorio </p>}
            </div>

            <div>
                <label> Unidad de medida : </label>
                <select
                    name = "unidad_medida"
                    value = {producto.unidad_medida}
                    onChange = {input_form}
                >
                    <option value = "" key = ""> Selecsionar Unidad de medida </option>
                    {mostrarUnidadesMedidas.map((output)  => (
                        <option value = {output.id} key = {output.id}>{output.descripción}</option>
                    ))}
                </select>

                {camposObligatorios.unidad_medida && <p style = {{ color: "red" }}> Este campo es obligatorio </p>}
            </div>

            <div>
                <label> Categoria producto : </label>
                <select
                    name = "categoria_producto"
                    value = {producto.categoria_producto}
                    onChange  =  {input_form}
                >
                    <option value = "" key = ""> Selecsionar Categoria producto </option>
                    {mostrarCategoria.map((output)  => (
                        <option value = {output.id} key = {output.id}>{output.descripción}</option>
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
                <button onClick = {boton_crear}> Crear Producto </button>
            </div>

            <div>
                <h3> Vista previa de la imagen : </h3>
                {producto.imagen_producto && (
                    <img
                        src = {URL.createObjectURL (producto.imagen_producto)}
                        style = {{ maxWidth: "300px", maxHeight: "300px" }}
                        alt = "Vista previa de la imagen"
                    />
                )}
            </div>

        </div>
    );
};

export default CrearProductoForm;