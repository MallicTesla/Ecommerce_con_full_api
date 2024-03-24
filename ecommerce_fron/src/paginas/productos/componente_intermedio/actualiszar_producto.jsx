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
    const [camposObligatorios, setCamposObligatorios] = useState({
        producto: false,
        precio: false,
        descripcion_producto: false,
        unidad_medida: false,
        categoria_producto: false,
        imagen_producto: false,
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
        setCamposObligatorios({ ...camposObligatorios, [e.target.name]: false });
    };

    const input_archivo = (e) => {
        setProducto({ ...producto, [e.target.name]: e.target.files[0] });
        const imagen = e.target.files[0];
        serPre_visualizasion (imagen);
    };

    const handleActualizarProducto = async () => {
        // Verificar qué campos son obligatorios y si están vacíos
        const camposVacios = {};
        for (const campo in camposObligatorios) {
            if (!producto[campo]) {
                camposVacios[campo] = true;
            }
        }
        setCamposObligatorios(camposVacios);

        // Lógica para actualizar el producto si todos los campos obligatorios están completos
        if (Object.keys (camposVacios).length === 0){
            try {
                await actualizarProducto (productoID, producto);
                // Actualización exitosa, establece el estado actualizacionExitosa en true
                onActualizarProducto();
            } catch (error) {
                // Manejar el error si es necesario
            }
        }
    };

    return (
        <ActualizarProductoForm
        producto = {producto}
        handleInputChange = {handleInputChange}
        handleActualizarProducto = {handleActualizarProducto}
        input_archivo = {input_archivo}
        pre_visualizasion = {pre_visualizasion}
        camposObligatorios = {camposObligatorios}
        />
    );
};


export default ActualizarProducto;