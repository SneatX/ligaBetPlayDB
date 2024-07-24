import { registroResultado } from "../service/resultados.service.js";

export async function casoUso4(){
    let partido = "669eb9fdee5df68095c5ccb8"

    let res = await registroResultado(partido)
    console.log(res)
}