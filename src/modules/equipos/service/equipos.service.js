import { ObjectId } from 'mongodb';
import { EquiposRepository } from "../repository/equipos.repository.js";
import { EstadiosRepository } from "../../estadios/repository/estadios.repository.js"
import { JugadoresRepository} from "../../jugadores/repository/jugadores.repository.js"
import { PartidosRepository } from "../../partidos/repository/partidos.repository.js"

// Función para verificar si un estadio existe
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
export const GestionEquipo = async (nombre, ciudad, Estadio, entrenador, Jugadores, Partidos) => {
  // Verificar si el estadio existe
  const estadioExiste = await verificarEstadio(Estadio);
  //if (!estadioExiste) return;

  // Validar que los jugadores existan
  const jugadoresRepo = new JugadoresRepository();
  const jugadoresList = await jugadoresRepo.getAllJugadores();
  verificarJugadores(Jugadores, jugadoresList);

  // Validar que los partidos existan
  const partidosRepo = new PartidosRepository();
  const partidosList = await partidosRepo.getAllPartidos();
  verificarPartidos(Partidos, partidosList);

  // Función para agregar equipo
  // TODO: Implementar la lógica para agregar un equipo

  // Función para editar equipo
  // TODO: Implementar la lógica para editar un equipo

  // Función para eliminar equipo
  // TODO: Implementar la lógica para eliminar un equipo
};