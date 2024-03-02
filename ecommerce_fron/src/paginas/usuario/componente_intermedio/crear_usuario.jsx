import React, { useState } from "react";

import CrearUsuarioForm from "../componentes/crear_usuario_form";
import { boton_crear } from "../api/api";
import MensajeModal from "../../mensajes/creado_corectamente";


// Declara el componente funcional CrearUsuario.
const CrearUsuario = () => {
    // Utiliza el hook useState para declarar un estado llamado 'usuario' con un valor inicial de un objeto vacío.
    const [usuario, setUsuario] = useState({
        nombre_usuario: "",
        email: "",
        nombre: "",
        apellido: "",
        password: "",
    });
    const [mensaje, setMensaje] = useState("");
    const [mostrarModal, setMostrarModal] = useState(false);

    // Declara una función 'input_form' que se ejecuta cuando hay cambios en los campos de entrada del formulario.
    const input_form = (e) => {
        // Actualiza el estado 'usuario' copiando el estado actual y sobrescribiendo la propiedad correspondiente con el nuevo valor.
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    };

    // Función para manejar la creación del usuario
    const handleCrearUsuario = async () => {
        try {
            await boton_crear(usuario);
            // Actualiza el mensaje después de una creación exitosa
            setMensaje("Usuario creado exitosamente.");
            setMostrarModal(true);

            
        // Ocultar el modal después de 3 segundos (3000 milisegundos)
        setTimeout(() => {
            setMostrarModal(false);
            setMensaje("");
        }, 3000);
            } catch (error) {
                console.error('Error al crear el usuario:', error.response.status);
                // Puedes manejar otros casos de error aquí si es necesario
        }
    };

    const handleCloseModal = () => {
        setMostrarModal(false);
        setMensaje("");
    };

    return (
        <div>
            <CrearUsuarioForm
                usuario = {usuario}
                input_form = {input_form}
                boton_crear = {handleCrearUsuario}
            />

            {mostrarModal && (
                <MensajeModal mensaje={mensaje} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default CrearUsuario;
