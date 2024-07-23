import { GolesRepository } from "../../goles/repository/goles.repository.js";
import { TarjetasRepository } from "../../tarjetas/repository/tarjetas.repository.js";
import { PartidosRepository } from "../../partidos/repository/partidos.repository.js";
import { ResultadosRepository } from "../repository/resultados.repository.js";
import { ObjectId } from "mongodb";

export async function registroResultado(idPartido) {
    let golesCollection = new GolesRepository()
    let tarjetasCollection = new TarjetasRepository()
    let partidosCollection = new PartidosRepository()
    let resultadosCollection = new ResultadosRepository()

    //Validacion existencia partido
    let partido = await partidosCollection.getPartidoById(idPartido)
    if (!partido) return { resultado: "error", mensaje: "Partido inexistente" }

    //Validar la no existencia de un resultado para el partido
    let posibleResultado = await resultadosCollection.getResultadoByPartidoId(idPartido)
    if(posibleResultado) return { resultado: "error", mensaje: "Resultado existente para el partido ingresado" }

    //Extraccion de data
    let goles = await golesCollection.getGolesByPartidoId(idPartido)
    let tarjetas = await tarjetasCollection.getTarjetasByPartidoId(idPartido)

    let nuevoResultado = {
        partido: new ObjectId(idPartido),
        golesEquipoLocal: [],
        golesEquipoVisitante: [],
        tarjetasEquipoLocal: [],
        tarjetasEquipoVisitante: []
    }

    //Reparticion del resultado por equipos
    goles.forEach((gol) => {
        gol.equipo.toString() === partido.equipoLocal.toString() ? nuevoResultado.golesEquipoLocal.push(gol._id) : nuevoResultado.golesEquipoVisitante.push(gol._id)
    })

    tarjetas.forEach((tarjeta) => {
        tarjeta.equipo.toString() === partido.equipoLocal.toString() ? nuevoResultado.tarjetasEquipoLocal.push(tarjeta._id) : nuevoResultado.tarjetasEquipoVisitante.push(tarjeta._id)
    })

    let res = resultadosCollection.aggregateNewResultado(nuevoResultado)
    return res
}