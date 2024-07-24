import {JugadoresRepository} from "./src/modules/jugadores/repository/jugadores.repository.js"
import {casoUso1} from "./src/modules/equipos/controller/equipos.controller.js"
import {casoUso2} from "./src/modules/jugadores/controller/jugadores.controller.js"
import {casoUso8} from "./src/modules/arbitros/controller/arbitros.controller.js"
//Prueba
/*
const jugadores = new JugadoresRepository();
console.log(await jugadores.getAllJugadores());
*/

//casoUso1()

/**
 * @param accion Se puede pasar "editar", "eliminar", "agregar"
 *  Si usa "agregar", por favor, pasar al archivo jugadores.controller.js 
 *  para agregar el documentos
 */
casoUso2("eliminar")
//casoUso8()