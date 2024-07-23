import { insertarNuevoGol } from "../service/goles.service.js"

export function nuevoGol(){
    let jugador = "669eb292ee5df68095c5ccb0"
    let minuto = 12
    let partido = "669eb9fdee5df68095c5ccb8"

    let res = insertarNuevoGol(jugador, minuto, partido)
    return res
}