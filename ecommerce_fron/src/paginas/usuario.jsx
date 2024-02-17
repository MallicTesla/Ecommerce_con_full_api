import React, { useState, useEffect } from "react";
import axios from "axios";

function Usuario() {
    const [detalles, setDetalles] = useState([]);
    const [usuarioId, setUsuarioId] = useState("");
    const [mostrarUsuarios, setMostrarUsuarios] = useState(true);

    const obtenerUsuarioPorId = () => {
        axios.get (`http://127.0.0.1:8000/usuario/usuario/${usuarioId}/`).then ((res) => {
            const data = res.data;
            setDetalles ([data]);
            setMostrarUsuarios(false);                          // Oculta la lista de usuarios al mostrar uno específico por ID.
        })
        .catch((err) => {});
    };

    const obtenerUsuarios = () => {
        axios.get (`http://127.0.0.1:8000/usuario/usuario/`).then ((res) => {
            const data = res.data;
            setDetalles (data);
            setMostrarUsuarios (true);                           // Muestra la lista de usuarios al obtener todos.
        })
        .catch((err) => {});
    };

    useEffect(() => {
        obtenerUsuarios(); // Llama a obtenerUsuarios cuando el componente se monta
    }, []);

    return (
        <div>
            <h1> Vista de Usuarios </h1>
            <hr />

            <div>
                <label> ID del Usuario: </label>
                <input type="text" value={usuarioId} onChange = {(e) => setUsuarioId (e.target.value)}/>
                <button onClick = {obtenerUsuarioPorId}> Mostrar Usuario por ID </button>
            </div>
            <hr />

            {mostrarUsuarios ? (<h2> Usuarios </h2>) : (<h2> Usuario </h2>)}
            <hr />

            {detalles.map ((output, id) => (
                <div key = {id}>
                    {mostrarUsuarios ? (
                        <div>
                            <h3> Nombre de usuario : {output.nombre_de_usuario}</h3>
                            <h4> ID : {output.id}</h4>
                            <h4> Email : {output.correo}</h4>
                            <hr />
                        </div>
                    ) : (
                        <div>
                            <h3> Nombre de usuario : {output.nombre_usuario}</h3>
                            <h4> ID : {output.id}</h4>
                            <h4> Nombre : {output.nombre}</h4>
                            <h4> Apellido : {output.apellido}</h4>
                            <h4> Email : {output.email}</h4>
                            <h4> Grupos : {output.groups}</h4>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Usuario;




// function Usuario() {
//     const [detalles, setDetalles] = useState([]);   // Utiliza el hook useState para definir el estado detalles y la función setDetalles que será utilizada para actualizar el estado. Inicializa detalles con un array vacío.

//     useEffect(() => {                               // Utiliza el hook useEffect para ejecutar código después de que el componente se ha montado. 
//         let data;                                   // Declara una variable data para almacenar los datos de la respuesta de la solicitud HTTP.
//         axios.get ("http://127.0.0.1:8000/usuario/usuario/1/").then ((res) => {     // Realiza una solicitud GET a la URL proporcionada utilizando Axios. 
//             data = res.data;                        // Almacena los datos de la respuesta en la variable data.
//             setDetalles ([data]);
//         })
//         .catch ((err) => {});                       // captura errores en la función catch.
//     }, []);                                         // El segundo argumento del useEffect es un array vacío para que se ejecute solo una vez al montar el componente.

//     return (
//         <div>
//             <header> Mostrando la API de Django con React </header>
//             <hr></hr>
//             {detalles.map ((output, id) => (        // Utiliza el método map para iterar sobre el array detalles y renderizar elementos para cada elemento en el array.
//                 <div key={id}>
//                     <div>
//                         <h2> {output.nombre_usuario} </h2>
//                         <h3> {output.email} </h3>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default Usuario;



// ---------------------------------------------------------- esta es la forma bieja de hacerlo ------------------------------------
// import axios from "axios";
// import React from "react";


// class App extends React.Component{
//     state = {detalles: [], }

//     componentDidMount(){
//         let data;
//         axios.get ("http://127.0.0.1:8000/usuario/usuario/1/")      // Realiza una solicitud GET a la URL proporcionada.
//             .then (res => {                                         // Maneja la respuesta exitosa de la solicitud.
//                 data = res.data;                                    // Almacena los datos de la respuesta en la variable "data"
//                 this.setState({                                     //Actualiza el estado del componente con los datos recibidos, almacenándolos en el campo detalles como un array.
//                     detalles: [data]
//                 })
//             })
//             .catch (err => {})                                      // Captura errores en caso de que la solicitud falle, pero en este caso, no realiza ninguna acción.
//     }

//     render(){
//         return(
//             <div>
//                 <header>Mostrando la api de django con React</header>
//                 <hr></hr>
//                 {this.state.detalles.map((output, id) => (           //  Utiliza el método map para iterar sobre el array detalles y renderiza elementos para cada elemento en el array.
//                     <div key= {id}>
//                         <div>
//                             <h2>{output.nombre_usuario}</h2>
//                             <h3>{output.email}</h3>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//             )
//     }
// }


