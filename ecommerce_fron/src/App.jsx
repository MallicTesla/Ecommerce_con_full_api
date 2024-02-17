import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Usuario from "./paginas/usuario";

function App() {
    const [mostrarUsuario, setMostrarUsuario] = useState (false);    //Utiliza el hook useState para declarar un estado llamado mostrarUsuario con un valor inicial de false. También declara una función setMostrarUsuario para actualizar este estado.

    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/"> Inicio </Link></li>
                        <li><Link to="/usuarios" onClick = {() => setMostrarUsuario (true)}> Usuario </Link></li>
                    </ul>
                </nav>

                <Routes>
                    {/* Dentro de Routes, hay una Route que especifica que cuando la ruta sea "/usuarios", el elemento que se renderizará será Usuario si mostrarUsuario es true, de lo contrario, se renderizará null. */}
                    <Route path="/usuarios" element = {mostrarUsuario ? <Usuario /> : null} />
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