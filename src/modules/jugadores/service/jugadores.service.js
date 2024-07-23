import { ObjectId } from 'mongodb';
import { JugadoresRepository } from "../repository/jugadores.repository.js"
import { EquiposRepository } from "../../equipos/repository/equipos.repository.js";

// Función para verificar si un equipo existe
const verificarEquipo = async (nombre) => {
  const equiposRepo = new EquiposRepository();
  const equiposList = await equiposRepo.getAllEquipos();
  const equiposNombres = new Set(equiposList.map(equipo => equipo._id.toString()));
  console.log(equiposNombres)
  if (equiposNombres.has(nombre.toString())) {
    console.log(`El equipo ${nombre} existe.`);
    return true;
  } else {
    console.error(`El equipo ${nombre} no existe.`);
    return false;
  }
};


// Función principal para gestionar el equipo
export const GestionJugador = async (accion, jugadorData) => {
  const { _id, campo, nombre, edad, posicion, nacionalidad, numeroCamiseta, equipo, lesiones, rendimientos } = jugadorData;

  // Repositorios
  const jugadoresRepo = new JugadoresRepository();

  // Verificar si el equipo existe
  console.log(equipo)
  

  let res;
  console.log(_id)
  console.log(_id)  
  switch (accion) {
      case 'agregar':
          const nuevoJugador = {
            nombre : nombre,
            edad : edad,
            posicion : posicion,
            nacionalidad : nacionalidad,
            numeroCamiseta : numeroCamiseta,
            equipo : new ObjectId('669ae0e3d2847f9a6eac5fff'),
            lesiones : [],
            rendimientos : [],
        };
        const equipoExiste = await verificarEquipo(nuevoJugador.equipo);
        
        if (!equipoExiste) throw new Error('Equipo no existe');
        res = await jugadoresRepo.aggregateJugador(nuevoJugador);
        break;

      case 'editar':
          
          if (!_id || !campo) throw new Error('Falta información para editar el equipo');
          res = await jugadoresRepo.updateJugador({ _id: new ObjectId(_id) }, {campo:"25"});
          break;

      case 'eliminar':
          if (!_id) throw new Error('Falta información para eliminar el equipo');
          res = await jugadoresRepo.deleteJugador({ _id: new ObjectId(_id) });
          break;

      default:
          throw new Error('Acción no válida');
  }

  return res;
};