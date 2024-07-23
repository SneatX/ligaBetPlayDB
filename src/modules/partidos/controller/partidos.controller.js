import { registroPartido } from "../service/partidos.service.js";

export async function casoUso4() {
    let equipoVisitante = "669ae0e3d2847f9a6eac5fff";
    let fecha = "2024-06-01T18:30:00Z";
    let estadio = "669eb05aee5df68095c5cca5";
    
    let res = await registroPartido(equipoVisitante, fecha, estadio)
    console.log("Salida casoUso4:", res)
}
