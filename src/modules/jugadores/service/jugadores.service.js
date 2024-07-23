import { ObjectId } from 'mongodb';
import { EquiposRepository } from "../../equipos/repository/equipos.repository.js";

// Función para verificar si un equipo existe
const verificarEquipo = async (nombre) => {
  const equiposRepo = new EquiposRepository();
  const equiposList = await equiposRepo.getAllEquipos();
  const equiposNombres = new Set(estadiosList.map(estadio => estadio.nombre));

  if (equiposNombres.has(nombre)) {
    console.log(`El equipo ${nombre} existe.`);
    return true;
  } else {
    console.error(`El equipo ${nombre} no existe.`);
    return false;
  }
};


// Función principal para gestionar el equipo
export const GestionJugador = async (accion, jugadorData) => {
  const { _id, nombre, edad, posicion, nacionalidad, numeroCamiseta, equipo, lesiones, rendimientos } = jugadorData;

  // Repositorios
  const equiposRepo = new EquiposRepository();

  // Verificar si el equipo existe
  const equipoExiste = await verificarEquipo(Equipo);
  if (!equipoExiste) throw new Error('Equipo no existe');

  let res;

  switch (accion) {
      case 'agregar':
          const nuevoJugador = {
            nombre : "Agustin Rodriguez",
            edad : "28",
            posicion : "Delantero",
            nacionalidad : "Uruguayo",
            numeroCamiseta : "9",
            equipo : new ObjectId('669ae0e3d2847f9a6eac5fff'),
            lesiones : [],
            rendimientos : [],
          };
          res = await equiposRepo.aggregateJugador(nuevoJugador);
          break;

      case 'editar':
          if (!_id || !campo) throw new Error('Falta información para editar el equipo');
          res = await equiposRepo.updateJugador({ _id: new ObjectId(_id) }, campo);
          break;

      case 'eliminar':
          if (!_id) throw new Error('Falta información para eliminar el equipo');
          res = await equiposRepo.deleteJugador({ _id: new ObjectId(_id) });
          break;

      default:
          throw new Error('Acción no válida');
  }

  return res;
};