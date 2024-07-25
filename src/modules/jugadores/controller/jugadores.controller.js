import { GestionJugador } from "../service/jugadores.service.js";
import { ObjectId } from 'mongodb';


/**
     * 
     * @param accion String especifica si quiere "editar", "eliminar" o "agregar"
     * @returns Retorna un objeto con informacion de resultado de accion
     */

export async function casoUso2(accion) {
    const _id = new ObjectId('66a019c01f2114100f3c12cc');
    const nombre = "Agustin Rodriguez";
    const edad = 28;
    const posicion = "Delantero";
    const nacionalidad = "Uruguayo";
    const numeroCamiseta = 9;
    const equipo = new ObjectId('669ae0e3d2847f9a6eac5fff');
    const lesiones = [];
    const rendimientos = [];
  
    const campo = "numeroCamiseta"; // Campo a actualizar
    const valor = 10; // Nuevo valor para el campo
  
    const jugadorData = {
      _id,
      nombre,
      edad,
      posicion,
      nacionalidad,
      numeroCamiseta,
      equipo,
      lesiones,
      rendimientos,
    };
    
    console.log(`campo: ${campo}, valor: ${valor}`);
    
    let res = await GestionJugador(accion, jugadorData, campo, valor);
    console.log(res);
  }