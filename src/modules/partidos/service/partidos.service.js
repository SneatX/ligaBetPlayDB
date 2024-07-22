import { EquiposRepository } from "../../equipos/repository/equipos.repository.js";
import { EstadiosRepository } from "../../estadios/repository/estadios.repository.js";

export async function registroPartido(idEquipoVisita, fecha, idEstadio){
    
    //Validar existencia del equipo visitante 
    let equiposCollection = new EquiposRepository()
    let estadiosCollection = new EstadiosRepository()
    let [equipo, estadio] = await Promise.all([
        equiposCollection.getEquipoById(idEquipoVisita),
        estadiosCollection.getEstadioById(idEstadio)
    ])
    if(equipo) console.log("Existencia de equipo validada")
    else return {mensaje: "Equipo visita inexistente"}

    if(estadio) console.log("Existencia de estadio validada")  
    else return {mensaje: "Estadio inexistente"}
}