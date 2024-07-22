import { GestionEquipo } from "../service/equipos.service.js";
import { ObjectId } from 'mongodb';


export async function casoUso1(){
    const nombre = "Nemesio Camacho El Campin"
    const ciudad = "Liverspool"
    const Estadio = "Anfield"
    const entrenador = "Jurgen Klop"
    const Jugadores = ["Millan", "Chaverra"]
    const Partidos = [new ObjectId('669eb9fdee5df68095c5ccb8'), new ObjectId('669eb9fdee5df68095c5ccba')]
    
    let res = await GestionEquipo(nombre, ciudad, Estadio, entrenador, Jugadores, Partidos)
    console.log(res)
}
/*
export async function casoUso7(){
    const hora_inicio = new Date("2024-07-16T09:40:00.000Z")
    const hora_fin = new Date("2024-08-15T09:00:00.000Z")
    const deportes = ["baloncesto"]

    consultarEventos(hora_inicio, hora_fin, deportes)
}
*/