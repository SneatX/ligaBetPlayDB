import { GolesRepository } from "../../goles/repository/goles.repository.js";
import { TarjetasRepository } from "../../tarjetas/repository/tarjetas.repository.js";
import { PartidosRepository } from "../../partidos/repository/partidos.repository.js";
import { ObjectId } from "mongodb";

export async function registroResultado(idPartido){
    let golesCollection = new GolesRepository()
    let tarjetasCollection = new TarjetasRepository()
    let partidosCollection = new PartidosRepository()

    let partido = await partidosCollection.getPartidoById(idPartido)
    console.log(partido)
    if(!partido) return { resultado: "error", mensaje: "Partido inexistente" }
    
    let goles = await golesCollection.getGolesByPartidoId(idPartido)
    
    let tarjetas = await tarjetasCollection.getTarjetasByPartidoId(idPartido)

    let object = {
        partido : new ObjectId(idPartido),
        golesEquipoLocal : [],
        golesEquipoVisitante: [],
        tarjetasEquipoLocal : [],
        tarjetasEquipoVisitante: []
    }

    goles.forEach((gol) => {
        if(gol.equipo.toString() === partido.equipoLocal.toString()){
            object.golesEquipoLocal.push(gol._id)
        }
        else{
            object.golesEquipoVisitante.push(gol._id)
        }
    })

    console.log(object)
}