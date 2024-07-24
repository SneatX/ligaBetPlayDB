import { JugadoresRepository } from "../../jugadores/repository/jugadores.repository.js"
import { PartidosRepository } from "../../partidos/repository/partidos.repository.js"
import { GolesRepository } from "../repository/goles.repository.js"

import { ObjectId } from "mongodb"

/**
 * 
 * @param {*} idJugador Id del jugador que marco el gol
 * @param {*} minuto Minuto en el cual marco el gol
 * @param {*} idPartido Id del partido donde realizo el gol
 * @returns Un objeto con el id ingresado o mensaje de error
 */

export async function insertarNuevoGol(idJugador, minuto, idPartido){
    let jugadoresCollection = new JugadoresRepository()
    let partidosCollection = new PartidosRepository()
    let golesCollection = new GolesRepository()

    // Validar existencia del jugador
    let jugador = await jugadoresCollection.getJugadorById(idJugador)
    if(!jugador) return { resultado: "error", mensaje: "Jugador no registrado" }

    //Validar que el equipo estuvo en el partido
    let partido = await partidosCollection.getPartidoById(idPartido)
    let equiposParticipantes = [partido.equipoLocal.toString(), partido.equipoVisitante.toString()]
    
    if (!equiposParticipantes.includes(jugador.equipo.toString())){
        return { resultado: "error", mensaje: "Jugador no registrado" }
    }

    //Validar que el minuto de juego sea correcto 
    if (minuto < 0 || minuto > 150){
        return { resultado: "error", mensaje: "Minuto de juego incorrecto" }
    }

    let objeto = {
        jugador : new ObjectId(idJugador),
        equipo : jugador.equipo,
        minuto : minuto,
        partido : new ObjectId(idPartido)
    }
    let res = await golesCollection.agregatteNewGol(objeto)
    return res
}