import { ObjectId } from "mongodb"
import { JugadoresRepository } from "../../jugadores/repository/jugadores.repository.js"
import { PartidosRepository } from "../../partidos/repository/partidos.repository.js"
import { TarjetasRepository } from "../repository/tarjetas.repository.js"

export async function insertarNuevaTarjeta(idJugador, idPartido, tipo, minuto){
    let jugadoresCollection = new JugadoresRepository()
    let partidosCollection = new PartidosRepository()
    let tarjetasCollection = new TarjetasRepository()

    // Validar existencia del jugador
    let jugador = await jugadoresCollection.getJugadorById(idJugador)
    if(!jugador) return { resultado: "error", mensaje: "Jugador no registrado" }

    //Validar que el equipo estuvo en el partido
    let partido = await partidosCollection.getPartidoById(idPartido)
    let equiposParticipantes = [partido.equipoLocal.toString(), partido.equipoVisitante.toString()]
    
    if (!equiposParticipantes.includes(jugador.equipo.toString())){
        return { resultado: "error", mensaje: "El equipo no participo de este partido" }
    }

    //Validar que el minuto de juego sea correcto 
    if (minuto < 0 || minuto > 150){
        return { resultado: "error", mensaje: "Minuto de juego incorrecto" }
    }

    //Validar tipo de tarjeta 
    if(!(tipo.toLowerCase() === "amarilla" || tipo.toLowerCase() === "roja")){
        return { resultado: "error", mensaje: "Tarjeta ingresada invalida" }
    }

    let objeto = {
        jugador: new ObjectId(idJugador),
        partido : new ObjectId(idPartido),
        tipo : tipo,
        minuto : minuto
    }

    let res = await tarjetasCollection.agregatteNewTarjeta(objeto)
    return res
}