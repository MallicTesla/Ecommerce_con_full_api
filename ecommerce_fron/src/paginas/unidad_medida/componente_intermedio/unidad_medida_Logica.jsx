import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { obtenerUnidad_medidaID } from "../api/api";

export function useUnidadMedidaLogica() {
    const [detalles, setDetalles] = useState([]);
    const [Unidad_Medida_ID, setUnidad_Medida_ID] = useState("");
    const [error, setError] = useState(null);
    const [mostrarActualizar, setMostrarActualizar] = useState(false);
    const { id_id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id_id) {
            cargarUnidad_medida (id_id);
        }
    }, [id_id]);

    const cargarUnidad_medida = async (id) => {
        try {
            const data = await obtenerUnidad_medidaID (id);
            setDetalles ([data]);

        } catch (error) {
            setError ("No se a podido cargar el producto");
        }
    };

    const handleClick = async () => {
        navigate("/unidad_medida/" + Unidad_Medida_ID);
        await cargarUnidad_medida(Unidad_Medida_ID);
    };

    const editar_unidad_medida = () => {
        setMostrarActualizar(true);
    };

    const onActualizarUnidadMedid = async () => {
        const updatedUnidad_medida = await obtenerUnidad_medidaID(id_id);
        setDetalles([updatedUnidad_medida]);
        setMostrarActualizar(false);
    };


    return {
        detalles,
        Unidad_Medida_ID,
        error,
        mostrarActualizar,
        id_id,
        setUnidad_Medida_ID,
        handleClick,
        editar_unidad_medida,
        onActualizarUnidadMedid,
    };
}