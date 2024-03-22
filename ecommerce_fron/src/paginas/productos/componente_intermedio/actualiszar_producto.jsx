import React, { useState, useEffect } from "react";

import ActualizarProductoForm from "../componentes/actualizar_producto_formulario";
import { obtenerProductoID, actualizarProducto } from "../api/api";


const ActualizarProducto = ({ productoID, onActualizarProducto }) => {
    const [pre_visualizasion, serPre_visualizasion] = useState (false)
    const [producto, setProducto] = useState({
        producto: "",
        descripcion_producto: "",
        unidad_medida: "",
        categoria_producto: "",
    });

    useEffect(() => {
        const cargarProducto = async () => {
            try {
                const data = await obtenerProductoID (productoID);
                setProducto(data);

            } catch (error) {
                // Manejar el error si es necesario
            }
        };

        cargarProducto();
    }, [productoID]);

    const handleInputChange = (e) => {
        setProducto ({ ...producto, [e.target.name]: e.target.value });
    };

    const input_archivo = (e) => {
        setProducto({ ...producto, [e.target.name]: e.target.files[0] });
        const imagen = e.target.files[0];
        serPre_visualizasion (imagen);
    };

    const handleActualizarProducto = async () => {
        try {
            await actualizarProducto (productoID, producto);
            // Actualización exitosa, establece el estado actualizacionExitosa en true
            onActualizarProducto();
        } catch (error) {
            // Manejar el error si es necesario
        }
    };

    return (
        <ActualizarProductoForm
        producto = {producto}
        handleInputChange = {handleInputChange}
        handleActualizarProducto = {handleActualizarProducto}
        input_archivo = {input_archivo}
        pre_visualizasion = {pre_visualizasion}
        />
    );
};


export default ActualizarProducto;