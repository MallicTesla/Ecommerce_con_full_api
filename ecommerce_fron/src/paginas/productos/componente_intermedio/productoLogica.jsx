import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { obtenerProductoID } from "../api/api";

export function useProductoLogica() {;
    const [detalles, setDetalles] = useState([]);
    const [productoID, setProductoID] = useState("");
    const [error, setError] = useState(null);
    const [mostrarActualizar, setMostrarActualizar] = useState(false);
    const { id_id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id_id) {
            cargarProducto (id_id);
        }
    }, [id_id]);

    const cargarProducto = async (id) => {
        try {
            const data = await obtenerProductoID (id);
            setDetalles ([data]);
            console.log("antes")

        } catch (error) {
            setError ("No se a podido cargar el producto");
        }
    };

    const handleClick = async () => {
        navigate("/producto/" + productoID);
        await cargarProducto(productoID);
    };

    const editar_producto = () => {
        setMostrarActualizar(true);
    };

    const onActualizarProducto = async () => {
        const updatedProducto = await obtenerProductoID(id_id);
        setDetalles([updatedProducto]);
        setMostrarActualizar(false);
    };


    return {
        detalles,
        productoID,
        error,
        mostrarActualizar,
        id_id,
        setProductoID,
        handleClick,
        editar_producto,
        onActualizarProducto,
    };
}