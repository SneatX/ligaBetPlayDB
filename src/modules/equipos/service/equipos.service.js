import { ObjectId } from 'mongodb';
import { EquiposRepository } from "../repository/equipos.repository.js";
import { EstadiosRepository } from "../../estadios/repository/estadios.repository.js"
import { JugadoresRepository} from "../../jugadores/repository/jugadores.repository.js"
import { PartidosRepository } from "../../partidos/repository/partidos.repository.js"

// Función para verificar si un estadio existe
/**
     * 
     * @param nombre String nombre del estadio de futbol
     * @returns Retorna un valor tipo Booleano
     */

const verificarEstadio = async (nombre) => {
  const estadiosRepo = new EstadiosRepository();
  const estadiosList = await estadiosRepo.getAllEstadios();
  const estadiosNombres = new Set(estadiosList.map(estadio => estadio.nombre));

  if (estadiosNombres.has(nombre)) {
    console.log(`El estadio ${nombre} ya existe.`);
    return true;
  } else {
    console.error(`El estadio ${nombre} no existe.`);
    return false;
  }
};

// Función para verificar si los jugadores existen
/**
     * 
     * @param nombre String nombre del estadio de futbol
     * @returns Retorna un valor tipo Booleano
     */
const verificarJugadores = (nombres, jugadoresList) => {
  const jugadoresNombres = new Set(jugadoresList.map(jugador => jugador.nombre));

  nombres.forEach(nombre => {
    if (jugadoresNombres.has(nombre)) {
      console.log(`El jugador ${nombre} existe en la lista.`);
    } else {
      console.error(`El jugador ${nombre} no existe en la lista.`);
    }
  });
};

// Función para verificar si los partidos existen
/**
     * 
     * @param partidos Array con los partidos 
     * @param partidosList Array con los partidos existentes en el documento
     * @returns void Mensaje de informacion
     */

const verificarPartidos = (partidos, partidosList) => {
  const partidosSet = new Set(partidosList.map(partido => partido._id.toString()));

  partidos.forEach(partido => {
    if (!partidosSet.has(partido.toString())) {
      console.error(`Error: El partido con ID ${partido} no existe en la lista.`);
    }
  });
  
  console.log('Todos los partidos existentes en la lista.');
};

// Función principal para gestionar el equipo
/**
     * 
     * @param accion String nombre del equipo de futbol
     * @param equipoData Array con informacion de equipo
     * @returns Retorna un objeto
     */

export const GestionEquipo = async (accion, equipoData) => {
  const { _id, nombre, ciudad, Estadio, entrenador, Jugadores, Partidos, campo } = equipoData;

  // Repositorios
  const jugadoresRepo = new JugadoresRepository();
  const partidosRepo = new PartidosRepository();
  const estadiosRepo = new EstadiosRepository();

  // Verificar si el estadio existe
  const estadioExiste = await verificarEstadio(Estadio);
  if (!estadioExiste) throw new Error('Estadio no existe');

  // Validar que los jugadores existan
  const jugadoresList = await jugadoresRepo.getAllJugadores();
  verificarJugadores(Jugadores, jugadoresList);

  // Validar que los partidos existan
  const partidosList = await partidosRepo.getAllPartidos();
  verificarPartidos(Partidos, partidosList);

  let res;

  switch (accion) {
      case 'agregar':
          const nuevoEquipo = {
              nombre: nombre,
              ciudad: ciudad,
              Estadio: new ObjectId(Estadio),
              entrenador: entrenador,
              Jugadores: [...Jugadores],
              Partidos: [...Partidos]
          };
          res = await estadiosRepo.aggregateEquipo(nuevoEquipo);
          break;

      case 'editar':
          if (!_id || !campo) throw new Error('Falta información para editar el equipo');
          res = await estadiosRepo.updateEquipo({ _id: new ObjectId(_id) }, campo);
          break;

      case 'eliminar':
          if (!_id) throw new Error('Falta información para eliminar el equipo');
          res = await estadiosRepo.deleteEquipo({ _id: new ObjectId(_id) });
          break;

      default:
          throw new Error('Acción no válida');
  }

  return res;
};
