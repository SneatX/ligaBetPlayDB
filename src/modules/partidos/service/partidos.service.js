import { EquiposRepository } from "../../equipos/repository/equipos.repository.js";
import { EstadiosRepository } from "../../estadios/repository/estadios.repository.js";

export async function registroPartido(idEquipoVisita, fecha, idEstadio){

    //Validar existencia del equipo visitante 
    let equiposCollection = new EquiposRepository()
    let estadiosCollection = new EstadiosRepository()
    let [equipoVisitante, estadio] = await Promise.all([
        equiposCollection.getEquipoById(idEquipoVisita),
        estadiosCollection.getEstadioById(idEstadio)
    ])
    if(!equipoVisitante) return {resultado: "error", mensaje: "Equipo visita inexistente"}

    if(!estadio) return {resultado: "error", mensaje: "Estadio inexistente"}

    //Buscar equipo local
    let equipoLocal = await equiposCollection.getEquipoByEstadioId(idEstadio)

    if(!equipoLocal) return {resultado: "error", mensaje: "Equipo local inexistente"}

    if(equipoLocal._id.toString() === equipoVisitante._id.toString()){
        return {resultado: "error", mensaje: "El equipo local y visitante son iguales"}
    }
}