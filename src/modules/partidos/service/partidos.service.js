import { EquiposRepository } from "../../equipos/repository/equipos.repository.js";
import { EstadiosRepository } from "../../estadios/repository/estadios.repository.js";
import { ObjectId } from "mongodb";
export async function registroPartido(idEquipoVisita, fecha, idEstadio) {

    //Validar existencia del equipo visitante 
    let equiposCollection = new EquiposRepository()
    let estadiosCollection = new EstadiosRepository()
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

        // Verificar si los intervalos se cruzan
        if (
            (fechaInicioDeseada >= fechaInicioRegistrada && fechaInicioDeseada <= fechaFinRegistrada) || //Fecha de inicio esta entre los intervalos
            (fechaFinDeseada >= fechaInicioRegistrada && fechaFinDeseada <= fechaFinRegistrada) //Fecha de fin esta entre los intervalos
        ) {
            return { resultado: "error", mensaje: "El intervalo de tiempo deseado cruza con un horario registrado" };
        }
    }
}