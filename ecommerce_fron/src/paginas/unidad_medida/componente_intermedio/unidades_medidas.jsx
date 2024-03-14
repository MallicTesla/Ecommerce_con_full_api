import { useState, useEffect } from "react";
import { optener_lista } from "../api/api";

function MostrarUnidadesMedidas() {
    const [detalles, setDetalles] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await optener_lista();
            setDetalles(data);
        };

        fetchData();
    }, []);

    return detalles;
}

export default MostrarUnidadesMedidas;