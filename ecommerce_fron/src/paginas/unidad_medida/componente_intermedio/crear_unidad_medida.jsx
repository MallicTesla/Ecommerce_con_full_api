import React, { useState } from "react";

import CrearUnidadMedidaForm from "../componentes/Crear_unidad_medida";
import { boton_crear } from "../api/api";
import MensajeModal from "../../mensajes/creado_corectamente";


// Declara el componente funcional CrearUnidadMedida.
const CrearUnidadMedida = () => {
    // Utiliza el hook useState para declarar un estado llamado 'unidad_medida' con un valor inicial de un objeto vacío.
    const [unidad_medida, setUnidad_medida] = useState({
        descripción: "",
    });
    const [camposObligatorios, setCamposObligatorios] = useState({
        descripción: false,
    });
    const [mensaje, setMensaje] = useState("");
    const [mostrarModal, setMostrarModal] = useState(false);

    // Declara una función 'input_form' que se ejecuta cuando hay cambios en los campos de entrada del formulario.
    const input_form = (e) => {
        // Actualiza el estado 'unidad_medida' copiando el estado actual y sobrescribiendo la propiedad correspondiente con el nuevo valor.
        setUnidad_medida ({ ...unidad_medida, [e.target.name]: e.target.value });
    };

    // Función para manejar la creación del unidad_medida
    
    const handleCloseModal = () => {
        setMostrarModal (false);
        setMensaje ("");
    };
    
    // Función para manejar el clic en el botón de crear unidad_medida
    const handleCrearUnidadMedida = async () => {
        try {
            // Verificar qué campos son obligatorios y si están vacíos
            const camposVacios = {};
            for (const campo in camposObligatorios) {
                if (!unidad_medida[campo]) {
                    camposVacios[campo] = true;
                }
            }
            setCamposObligatorios (camposVacios);

            // Lógica para crear el unidad_medida si todos los campos obligatorios están completos
            if (Object.keys (camposVacios).length === 0) {
                await boton_crear (unidad_medida);
                // Actualiza el mensaje después de una creación exitosa
                setMensaje("Producto creado exitosamente.");
                setMostrarModal(true);
    
                // Ocultar el modal después de 3 segundos (3000 milisegundos)
                setTimeout(() => {
                    setMostrarModal(false);
                    setMensaje("");
                }, 3000);
            }
        } catch (error) {
            console.error('Error al crear el unidad_medida:', error.response.status);
        }
    };

    return (
        <div>
            <CrearUnidadMedidaForm
                unidad_medida = {unidad_medida}
                input_form = {input_form}
                boton_crear = {handleCrearUnidadMedida}
                camposObligatorios = {camposObligatorios}
            />

            {mostrarModal && (
                <MensajeModal mensaje = {mensaje} onClose = {handleCloseModal} />
            )}
        </div>
    );
};

export default CrearUnidadMedida;