import "./App.css"
import React from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Usuarios from "./paginas/usuario/componentes/usuarios_from";
import Usuario  from "./paginas/usuario/componentes/UsuarioComponente";
import CrearUsuario  from "./paginas/usuario/componente_intermedio/crear_usuario";

import Productos from "./paginas/productos/componentes/productos";
import CrearProducto from "./paginas/productos/componente_intermedio/agregar_producto"

function App() {

    return (
        <Router>
            <div>
                <nav className="nav">
                    {/* inicio */}
                    <ul>
                        <li><Link to="/"> Inicio </Link></li>
                    </ul>

                    {/* usuariao */}
                    <ul>
                        <li><Link to = "/usuarios"> Usuarios </Link></li>
                        <li><Link to = "/usuario "> Usuario  </Link></li>
                        <li><Link to = "/crearUsuario "> CrearUsuario  </Link></li>
                    </ul>

                    {/* productos */}
                    <ul>
                        <li><Link to = "/productos "> Productos </Link></li>
                        <li><Link to = "/CrearProducto"> Crear producto </Link></li>
                    </ul>
                </nav>

                <Routes>
                    {/* usuario */}
                    <Route path = "/crearUsuario" element = {<CrearUsuario />} />
                    <Route path = "/usuarios" element = {<Usuarios />} />
                    <Route path = "/usuario" element = {<Usuario />} />
                    <Route path = "/usuario/:id_id" element = {<Usuario />} />

                    productos
                    <Route path = "/productos" element = {<Productos />} />
                    <Route path = "/CrearProducto" element = {<CrearProducto />}/>                      {/* Otras rutas y componentes */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;



// -----------------------------la barra de nabegacion sin usar "react-router-dom"---------------------------------
// import React, { useState } from "react";
// import Usuario from "./01-App";


// function App() {
//     const [currentPage, setCurrentPage] = useState("inicio");                   // Estado para realizar un seguimiento de la página actual

//     const handleNavigation = (page) => {                                        // Función para manejar la navegación y actualizar el estado de la página actual
//         setCurrentPage(page);
//     };

//     return (
//         <div>
//             <nav>
//                 <ul>
//                     <li onClick={() => handleNavigation("inicio")}>Inicio</li>
//                     <li onClick={() => handleNavigation("usuarios")}>Usuarios</li>
//                 </ul>
//             </nav>

//             {currentPage === "inicio" && <h1> Página de Inicio </h1>}
//             {currentPage === "usuarios" && <Usuario />}
//         </div>
//     );
// }

// export default App;


// --------------------llamo de forma directa a la funcion Usuario------------------------

// import React from "react";
// import Usuario from "./01-App";

// function App() {
//     return (
//         <div>
//             <h1> JSX Principal </h1>
//             <Usuario />
//         </div>
//     );
// }

// export default App;