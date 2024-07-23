import { insertarNuevaTarjeta } from "../service/tarjetas.service.js"

export function nuevaTarjeta(){
    let jugador = "669eb292ee5df68095c5ccb0"
    let partido = "669eb9fdee5df68095c5ccb8"
    let tipo = "amarilla"
    let minuto = 20

    let res = insertarNuevaTarjeta(jugador, partido, tipo, minuto)
    return res
}