//import { GestionJugador } from "../service/jugadores.service.js";
import { ObjectId } from 'mongodb';

    /**
     * 
     * @param accion String especifica si quiere "editar", "eliminar" o "agregar"
     * @returns Retorna un array con todos los elementos de la coleccion Entradas
     */


export async function casoUso8(accion) {
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

    /**
     * 
     * @param accion String especifica si quiere "editar", "eliminar" o "agregar", jugadorData Objeto con informacion, 
     * @param campo String que se quiere actualizar
     * @param valor String asoaciado al campo sujeto a edicion
     * @returns Retorna un objeto de acuerdo a la accion selecionada
     */
    
    let res = await GestionJugador(accion, jugadorData, campo, valor);
    console.log(res);
  }
  
  