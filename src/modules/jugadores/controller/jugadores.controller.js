import { GestionJugador } from "../service/jugadores.service.js";
import { ObjectId } from 'mongodb';


export async function casoUso2() {
    const _id = new ObjectId('66a019c01f2114100f3c12cc');
    const nombre = "Agustin Rodriguez";
    const edad = "28";
    const posicion = "Delantero";
    const nacionalidad = "Uruguayo";
    const numeroCamiseta = "9";
    const equipo = new ObjectId('669ae0e3d2847f9a6eac5fff');
    const lesiones = [];
    const rendimientos = [];

    const campo = { numeroCamiseta }; // Campo a actualizar

    const jugadorData = {
        _id,
        campo,
        nombre,
        edad,
        posicion,
        nacionalidad,
        numeroCamiseta,
        equipo,
        lesiones,
        rendimientos
    };

    let res = await GestionJugador("editar", jugadorData);
    console.log(res);
}