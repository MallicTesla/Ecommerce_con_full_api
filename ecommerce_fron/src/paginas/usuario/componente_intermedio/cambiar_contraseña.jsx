import React, { useState } from "react";
import { actualizarContraseña } from "../api/api"; // Asegúrate de tener la función para actualizar la contraseña

function CambiarContraseña({ usuarioId, onContraseñaActualizada }) {
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [error, setError] = useState(null);

    const handlePasswordChange = (e) => {
        setError(null);
        setPassword1(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setError(null);
        setPassword2(e.target.value);
    };

    const handleCambiarContraseña = async () => {
        try {
        // Lógica para actualizar la contraseña
        // Debes implementar la función actualizarContraseña en tu archivo api/api.js
        await actualizarContraseña(usuarioId, { password_1: password1, password_2: password2 });

        // Actualizar estado o realizar otras acciones necesarias
        setPassword1("");
        setPassword2("");
        onContraseñaActualizada();
        } catch (error) {
        setError("Hubo un error al cambiar la contraseña. Por favor, verifica tus datos.");
        }
    };

    return (
        <div>
        <h2>Cambiar Contraseña</h2>
        <label>Nueva Contraseña:</label>
        <input type="password" value={password1} onChange={handlePasswordChange} />
        <br />
        <label>Confirmar Contraseña:</label>
        <input type="password" value={password2} onChange={handleConfirmPasswordChange} />
        <br />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button onClick={handleCambiarContraseña}>Cambiar Contraseña</button>
        </div>
    );
    }

export default CambiarContraseña;
