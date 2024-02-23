import React from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Usuarios from "./paginas/usuario/componentes/usuarios_from";
import Usuario  from "./paginas/usuario/componentes/usuario_comp";
import CrearUsuario  from "./paginas/usuario/componentes/crear_usuario";


function App() {

    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/"> Inicio </Link></li>
                        <li><Link to="/usuarios"> Usuarios </Link></li>
                        <li><Link to="/usuario "> Usuario  </Link></li>
                        <li><Link to="/crearUsuario "> CrearUsuario  </Link></li>

                    </ul>
                </nav>

                <Routes>
                    {/* Define la ruta para /usuarios y utiliza el componente Usuarios */}
                    <Route path="/crearUsuario" element={<CrearUsuario />} />

                    <Route path="/usuarios" element={<Usuarios />} />
                    <Route path="/usuario" element={<Usuario />} />
                    <Route path="/usuario/:id_id" element={<Usuario />} />

                    {/* Otras rutas y componentes */}
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