import React from "react";


const CrearUsuarioForm = ({ usuario, input_form, boton_crear }) => {
    // Retorna la estructura del componente, que es un formulario para crear un nuevo usuario.
    return (
        <div>
            <h2>Crear Usuario</h2>
            {/* Cada div representa un campo de entrada del formulario con su respectiva etiqueta y controlado por el estado 'usuario'. */}
            <div>
                <label>Nombre de Usuario:</label>
                <input
                    type="text"
                    name="nombre_usuario"
                    value={usuario.nombre_usuario}
                    onChange={input_form}
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="text"
                    name="email"
                    value={usuario.email}
                    onChange={input_form}
                />
            </div>
            <div>
                <label>Nombre:</label>
                <input
                    type="text"
                    name="nombre"
                    value={usuario.nombre}
                    onChange={input_form}
                />
            </div>
            <div>
                <label>Apellido:</label>
                <input
                    type="text"
                    name="apellido"
                    value={usuario.apellido}
                    onChange={input_form}
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={usuario.password}
                    onChange={input_form}
                />
            </div>
            {/* El botón "Crear Usuario" llama a la función 'boton_crear' cuando se hace clic. */}
            <button onClick={boton_crear}>Crear Usuario</button>
        </div>
    );
};

export default CrearUsuarioForm;
