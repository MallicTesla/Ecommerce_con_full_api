import React, { useState } from "react";

import CrearProductoForm from "../componentes/crear_producto_formulario";
import { boton_crear } from "../api/api";
import MensajeModal from "../../mensajes/creado_corectamente";


// Declara el componente funcional CrearProducto.
const CrearProducto = () => {
    // Utiliza el hook useState para declarar un estado llamado 'producto' con un valor inicial de un objeto vacío.
    const [producto, setProducto] = useState({
        producto: "",
        descripcion_producto: "",
        unidad_medida: "",
        categoria_producto: "",
    });
    const [mensaje, setMensaje] = useState("");
    const [mostrarModal, setMostrarModal] = useState(false);

    // Declara una función 'input_form' que se ejecuta cuando hay cambios en los campos de entrada del formulario.
    const input_form = (e) => {
        // Actualiza el estado 'producto' copiando el estado actual y sobrescribiendo la propiedad correspondiente con el nuevo valor.
        setProducto({ ...producto, [e.target.name]: e.target.value });
    };

    // Función para manejar la creación del producto
    const handleCrearProducto = async () => {
        try {
            await boton_crear (producto);
            // Actualiza el mensaje después de una creación exitosa
            setMensaje ("Usuario creado exitosamente.");
            setMostrarModal (true);

            
        // Ocultar el modal después de 3 segundos (3000 milisegundos)
        setTimeout (() => {
            setMostrarModal (false);
            setMensaje ("");
        }, 3000);
            } catch (error) {
                console.error ('Error al crear el producto:', error.response.status);
                // Puedes manejar otros casos de error aquí si es necesario
        }
    };

    const handleCloseModal = () => {
        setMostrarModal (false);
        setMensaje ("");
    };

    return (
        <div>
            <CrearProductoForm
                producto = {producto}
                input_form = {input_form}
                boton_crear = {handleCrearProducto}
            />

            {mostrarModal && (
                <MensajeModal mensaje = {mensaje} onClose = {handleCloseModal} />
            )}
        </div>
    );
};

export default CrearProducto;