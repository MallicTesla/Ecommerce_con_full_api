import React, { useState, useEffect } from "react";

import ActualizarUnidadMedidaForm from "../componentes/actualizar_unidad_medida_form";
import { obtenerUnidad_medidaID, actualizarUnidad_medida } from "../api/api";


const ActualizarUnidad_Medida = ({ Unidad_Medida_ID, onActualizarUnidadMedid }) => {
    const [unidad_medida, setUnidad_medida] = useState({
        descripción: "",
    });
    const [camposObligatorios, setCamposObligatorios] = useState({
        descripción: false,
    });

    useEffect(() => {
        const cargarUnidad_medida = async () => {
            try {
                const data = await obtenerUnidad_medidaID (Unidad_Medida_ID);
                setUnidad_medida(data);

            } catch (error) {
                // Manejar el error si es necesario
            }
        };

        cargarUnidad_medida();
    }, [Unidad_Medida_ID]);

    const handleInputChange = (e) => {
        setUnidad_medida ({ ...unidad_medida, [e.target.name]: e.target.value });
        setCamposObligatorios({ ...camposObligatorios, [e.target.name]: false });
    };

    const handleActualizar_Unidad_medida = async () => {
        // Verificar qué campos son obligatorios y si están vacíos
        const camposVacios = {};
        for (const campo in camposObligatorios) {
            if (!unidad_medida[campo]) {
                camposVacios[campo] = true;
            }
        }
        setCamposObligatorios(camposVacios);

        // Lógica para actualizar el unidad_medida si todos los campos obligatorios están completos
        if (Object.keys (camposVacios).length === 0){
            try {
                await actualizarUnidad_medida (Unidad_Medida_ID, unidad_medida);
                // Actualización exitosa, establece el estado actualizacionExitosa en true
                onActualizarUnidadMedid();
            } catch (error) {
                // Manejar el error si es necesario
            }
        }
    };

    return (
        <ActualizarUnidadMedidaForm
        unidad_medida = {unidad_medida}
        handleInputChange = {handleInputChange}
        handleActualizar_Unidad_medida = {handleActualizar_Unidad_medida}
        camposObligatorios = {camposObligatorios}
        />
    );
};


export default ActualizarUnidad_Medida;