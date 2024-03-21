import React from "react";
import { useProductoLogica } from "../componente_intermedio/productoLogica";
import ActualizarProducto from "../componente_intermedio/actualiszar_producto";
import Borrar_Producto from "../componente_intermedio/borrar_producto"; 


function ProductoComponente() {
    const {
        detalles,
        productoID,
        error,
        mostrarActualizar,
        id_id,
        imagen,
        setProductoID,
        handleClick,
        editar_producto,
        onActualizarProducto,
    } = useProductoLogica();


    return (
        <div>
            <div>
                <h1>Vista de Producto ({id_id}) </h1>
                <hr />

                <div>
                    <label>ID del Producto:</label>
                    <input type="text" value={productoID} onChange={(e) => setProductoID(e.target.value)} />
                    <button onClick={handleClick}>Mostrar Producto por ID</button>
                </div>
                <hr />
            </div>

            <div>
                <h2>Producto</h2>
                <hr />
                {detalles.map((output, id) => (
                    <div key={id}>
                        <div>
                            <h3> Nombre del producto : {output.producto} </h3>
                            <h4> ID : {output.id} </h4>
                            <h4> Precio : {output.precio} </h4>
                            <h4> descripcion : {output.descripcion_producto}</h4>
                            <h4> Unidad de medida : {output.unidad_medida} </h4>
                            <h4> Categoria del producto : {output.categoria_producto} </h4>
                            <h4> Imagen : {output.imagen_producto} </h4>
                        </div>

                    </div>
                ))}

                        <div>
                        {/* {console.log(imagen)} */}
                            {imagen && (
                                <div>
                                    <h4>Imagen:</h4>
                                    <img src={imagen} alt="Imagen del producto" />
                                </div>
                            )}
                        </div>

                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>

            <div>
                <div>
                    <button onClick={editar_producto}> Editar Producto </button>
                    <Borrar_Producto productoID={id_id} />
                </div>
                <hr />

                <div>
                    {mostrarActualizar && (
                        <div>
                            <ActualizarProducto productoID={id_id} onActualizarProducto={onActualizarProducto} />

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductoComponente;
