import React from "react";
import { useNavigate } from "react-router-dom";

import { borrar_producto } from "../api/api";

function Borrar_Producto ({ productoID }) {
    const navigate = useNavigate();

    const borrarProductoHandler = () => {
        const confirmacion = window.confirm ("¿Estás seguro de que quieres borrar este producto?");
        if (confirmacion) {
            borrarProducto();
        }
    };

    const borrarProducto = async () => {
        try {
            await borrar_producto (productoID);
            // Redirige a la página de lista de productos u otra página deseada después de borrar
            navigate ("/productos");
        } catch (error) {
        // Manejar el error si es necesario
        }
    };

    return (
        <button onClick = {borrarProductoHandler}> Borrar producto </button>
    );
}

export default Borrar_Producto;