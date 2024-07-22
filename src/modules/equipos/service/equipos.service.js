import { ObjectId } from 'mongodb';
import { EquiposRepository } from "../repository/equipos.repository.js";
import { EstadiosRepository } from "../../estadios/repository/estadios.repository.js"
import { JugadoresRepository} from "../../jugadores/repository/jugadores.repository.js"
import { PartidosRepository } from "../../partidos/repository/partidos.repository.js"

export const GestionEquipo = async(nombre, ciudad, Estadio, entrenador, Jugadores, Partidos) =>{


    //VALIDAR QUE ESTADIO EXISTA
    let Estadios = new EstadiosRepository()
    let estadiosList = await Estadios.getAllEstadios();
    //console.log(estadiosList)
    /*
    estadiosList.forEach(element => {
        if(element.nombre == nombre){
            console.log("Ya existe usuario")
        }
        else {
            console.log("pasa")
        }
    });
    */
    //VALIDAR QUE LOS JUGADORES EXISTAN

    let JugadoresNew = new JugadoresRepository()
    let JugadoresList = await JugadoresNew.getAllJugadores();
    console.log(JugadoresList)

    // Función para verificar si los nombres existen en el objeto
    const verificarJugadores = (nombres, data) => {
    // Crear un conjunto de nombres en el objeto para una búsqueda más rápida
    const nombresEnData = new Set(data.map(jugador => jugador.nombre));
    
    // Verificar si al menos uno de los nombres está en el conjunto y mostrar en consola
    nombres.forEach(nombre => {
      if (nombresEnData.has(nombre)) {
        console.log(`El jugador ${nombre} existe en la lista.`);
      }
        });
    };
  
  // Verificar los nombres
  verificarJugadores(Jugadores, JugadoresList);
    
    //VALIDAR QUE LOS PARTIDOS EXISTAN

    
    

    //Funcion de agreagar equipo


    //Funcion editar 

    //Duncion de eliminar equipos

}