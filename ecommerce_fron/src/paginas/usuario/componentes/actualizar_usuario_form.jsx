import React from "react";

const ActualizarUsuarioForm = ({ usuario, handleInputChange, handleActualizarUsuario }) => {
    return (
        <div>
            <h2>Actualizar Usuario</h2>

            <div>
                <label>Nombre de Usuario:</label>
                <input
                    type="text"
                    name="nombre_usuario"
                    value={usuario.nombre_usuario}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="text"
                    name="email"
                    value={usuario.email}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Nombre:</label>
                <input
                    type="text"
                    name="nombre"
                    value={usuario.nombre}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Apellido:</label>
                <input
                    type="text"
                    name="apellido"
                    value={usuario.apellido}
                    onChange={handleInputChange}
                />
            </div>

            <button onClick={handleActualizarUsuario}>Actualizar Usuario</button>
        </div>
    );
};

export default ActualizarUsuarioForm;