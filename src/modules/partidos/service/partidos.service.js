import { EquiposRepository } from "../../equipos/repository/equipos.repository.js";
import { EstadiosRepository } from "../../estadios/repository/estadios.repository.js";
import { PartidosRepository } from "../repository/partidos.repository.js";
import { ObjectId } from "mongodb";

/**
 * 
 * @param {String} idEquipoVisita Id del equipo visitante del partido
 * @param {String} fecha Fecha en la cual se realizo el partido
 * @param {String} idEstadio Id del estadio donde se realizara o realizo el partido
 * @returns 
 */

export async function registroPartido(idEquipoVisita, fecha, idEstadio) {
    let equiposCollection = new EquiposRepository()
    let estadiosCollection = new EstadiosRepository()
    let partidosCollection = new PartidosRepository()

    //Validar existencia del equipo visitante 
    let [equipoVisitante, estadio] = await Promise.all([
        equiposCollection.getEquipoById(idEquipoVisita),
        estadiosCollection.getEstadioById(idEstadio)
    ])
    if (!equipoVisitante) return { resultado: "error", mensaje: "Equipo visita inexistente" }

    if (!estadio) return { resultado: "error", mensaje: "Estadio inexistente" }

    //Buscar equipo local
    let equipoLocal = await equiposCollection.getEquipoByEstadioId(idEstadio)

    if (!equipoLocal) return { resultado: "error", mensaje: "Equipo local inexistente" }

    if (equipoLocal._id.toString() === equipoVisitante._id.toString()) {
        return { resultado: "error", mensaje: "El equipo local y visitante son iguales" }
    }

    //Validacion disponibilidad del estadio en la fecha
    for (let horario of estadio.Horarios) {
        let fechaInicioRegistrada = new Date(horario);
        let fechaFinRegistrada = new Date(horario);
        fechaFinRegistrada.setHours(fechaFinRegistrada.getHours() + 4);

        let fechaInicioDeseada = new Date(fecha);
        let fechaFinDeseada = new Date(fecha);
        fechaFinDeseada.setHours(fechaFinDeseada.getHours() + 4);

        if (
            (fechaInicioDeseada >= fechaInicioRegistrada && fechaInicioDeseada <= fechaFinRegistrada) || //Fecha de inicio esta entre los intervalos
            (fechaFinDeseada >= fechaInicioRegistrada && fechaFinDeseada <= fechaFinRegistrada)||
            (fechaInicioDeseada <= fechaInicioRegistrada && fechaFinDeseada >= fechaFinRegistrada) //Fecha de fin esta entre los intervalos
        ) {
            return { resultado: "error", mensaje: "El intervalo de tiempo deseado cruza con un horario registrado" };
        }
    }

    let objeto = {
        equipoLocal: new ObjectId(equipoLocal._id),
        equipoVisitante: new ObjectId(equipoVisitante._id),
        fecha: fecha,
        estadio: new ObjectId(estadio._id),
        goles: [],
        tarjetas: [],
        incidentes: [],
        resultado: null
    }

    //Insertar objeto del nuevo partido
    let res = await partidosCollection.aggregatePartido(objeto)
    let resEstadio = await estadiosCollection.insertFechaInEstadio(new ObjectId(estadio._id), fecha)
    return res
}