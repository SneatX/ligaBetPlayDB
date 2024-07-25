import {JugadoresRepository} from "./src/modules/jugadores/repository/jugadores.repository.js"
import {casoUso1} from "./src/modules/equipos/controller/equipos.controller.js"
import {casoUso2} from "./src/modules/jugadores/controller/jugadores.controller.js"
import {casoUso8} from "./src/modules/arbitros/controller/arbitros.controller.js"
//Prueba
/*
const jugadores = new JugadoresRepository();
console.log(await jugadores.getAllJugadores());
*/

/**
 * 
 * 
 */

casoUso1()

/**
 * 
 * @param accion Se puede pasar "editar", "eliminar", "agregar"
 * 
 * * Si usa "agregar", por favor, pasar la informacion en jugadores.controller.js 
 *   para agregar el documento
 * 
 * * Si usa "eliminar", por favor, pasar el _id del jugador a eliminar en jugadores.controller.js
 * 
 * * Si usa "editar", por favor, especificar el campo y el nuevo valor en los parametros de la funcion GestionJugador
 *  de jugadores.service.js
 * 
 *  
 */

//casoUso2("eliminar")
//casoUso8()