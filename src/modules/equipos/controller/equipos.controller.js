import { ObjectId } from 'mongodb';
import { GestionEquipo } from './path/to/GestionEquipoModule'; // Asegúrate de importar la función correctamente

export async function casoUso1() {
    const equipoData = {
        nombre: "Nemesio Camacho El Campin",
        ciudad: "Liverspool",
        Estadio: "Anfield",
        entrenador: "Jurgen Klop",
        Jugadores: ["Millan", "Chaverra"],
        Partidos: [new ObjectId('669eb9fdee5df68095c5ccb8'), new ObjectId('669eb9fdee5df68095c5ccba')]
    };

    /**
     * 
     * @param {String} accion nombre del equipo de futbol
     * @param {Array} equipoData con informacion de jugador
     * @returns Retorna un objeto
     */

    let res = await GestionEquipo("agregar", equipoData);
    console.log(res);
}

/*
export async function casoUso7(){
    const hora_inicio = new Date("2024-07-16T09:40:00.000Z")
    const hora_fin = new Date("2024-08-15T09:00:00.000Z")
    const deportes = ["baloncesto"]

    consultarEventos(hora_inicio, hora_fin, deportes)
}
*/