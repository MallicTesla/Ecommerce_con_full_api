import axios from "axios";
import React from "react";


class App extends React.Component{
    state = {detalles: [], }

    componentDidMount(){
        let data;
        axios.get ("http://127.0.0.1:8000/usuario/usuario/1/")      // Realiza una solicitud GET a la URL proporcionada.
            .then (res => {                                         // Maneja la respuesta exitosa de la solicitud.
                data = res.data;                                    // Almacena los datos de la respuesta en la variable "data"
                this.setState({                                     //Actualiza el estado del componente con los datos recibidos, almacenándolos en el campo detalles como un array.
                    detalles: [data]
                })
            })
            .catch (err => {})                                      // Captura errores en caso de que la solicitud falle, pero en este caso, no realiza ninguna acción.
    }

    render(){
        return(
            <div>
                <header>Mostrando la api de django con React</header>
                <hr></hr>
                {this.state.detalles.map((output, id) => (           //  Utiliza el método map para iterar sobre el array detalles y renderiza elementos para cada elemento en el array.
                    <div key= {id}>
                        <div>
                            <h2>{output.nombre_usuario}</h2>
                            <h3>{output.email}</h3>
                        </div>
                    </div>
                ))}
            </div>
            )
    }
}

export default App;
