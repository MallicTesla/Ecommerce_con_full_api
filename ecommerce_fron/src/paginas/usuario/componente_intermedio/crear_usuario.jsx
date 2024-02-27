import React, { useState } from "react";

import CrearUsuarioForm from "../componentes/crear_usuario_form";
import { boton_crear } from "../api/api";
// import boton_crear from "../api/crear_usuario_api";


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

    // Declara una función 'input_form' que se ejecuta cuando hay cambios en los campos de entrada del formulario.
    const input_form = (e) => {
        // Actualiza el estado 'usuario' copiando el estado actual y sobrescribiendo la propiedad correspondiente con el nuevo valor.
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    };

    return (
        <CrearUsuarioForm
            usuario = {usuario}
            input_form = {input_form}
            boton_crear = {() => boton_crear (usuario)}
        />
    );
};

export default CrearUsuario;
