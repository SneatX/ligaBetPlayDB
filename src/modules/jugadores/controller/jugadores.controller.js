import { GestionEquipo } from "../service/equipos.service.js";
import { ObjectId } from 'mongodb';


export async function casoUso2(){
    const nombre = "Agustin Rodriguez"
    const edad = "28"
    const posicion = "Delantero"
    const nacionalidad = "Uruguayo"
    const numeroCamiseta = "9"
    const equipo = new ObjectId('669ae0e3d2847f9a6eac5fff')
    const lesiones = []
    const rendimientos = []

    let res = await GestionJugador(accion, nombre, ciudad, Estadio, entrenador, Jugadores, Partidos)
    console.log(res)
}