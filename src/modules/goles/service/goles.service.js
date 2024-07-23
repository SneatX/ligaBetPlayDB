import { JugadoresRepository } from "../../jugadores/repository/jugadores.repository.js"
import { EquiposRepository } from "../../equipos/repository/equipos.repository.js"
import { PartidosRepository } from "../../partidos/repository/partidos.repository.js"

import { ObjectId } from "mongodb"

export async function insertarNuevoGol(idJugador, minuto, idPartido){
    let jugadoresCollection = new JugadoresRepository()
    let equiposCollection = new EquiposRepository()
    let partidosCollection = new PartidosRepository()

    // Validar existencia del jugador
    let jugador = await jugadoresCollection.getJugadorById(idJugador)
    if(!jugador) return { resultado: "error", mensaje: "Jugador no registrado" }

    //Validar que el equipo estuvo en el partido
    let partido = await partidosCollection.getPartidoById(idPartido)
    let equiposParticipantes = [partido.equipoLocal.toString(), partido.equipoVisitante.toString()]
    
    if (!equiposParticipantes.includes(jugador.equipo.toString())){
        return { resultado: "error", mensaje: "Jugador no registrado" }
    }
}