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


export const GestionJugador = async (accion, jugadorData, campo="numeroCamiseta", valor=10) => {
  const { _id, nombre, edad, posicion, nacionalidad, numeroCamiseta, equipo, lesiones, rendimientos } = jugadorData;

  // Repositorios
  const jugadoresRepo = new JugadoresRepository();

  let res;
  //console.log(campo)
  //console.log(valor)
  //console.log(_id)
  //console.log(accion)
  switch (accion) {
    case 'agregar':
      // Verifica que todos los datos necesarios para agregar estén presentes
      if (!nombre || !edad || !posicion || !nacionalidad || !numeroCamiseta || !equipo) {
        throw new Error('Falta información para agregar el jugador');
      }

      const nuevoJugador = {
        nombre,
        edad,
        posicion,
        nacionalidad,
        numeroCamiseta,
        equipo: new ObjectId(equipo),
        lesiones: lesiones || [],
        rendimientos: rendimientos || [],
      };

      const equipoExiste = await verificarEquipo(nuevoJugador.equipo);
      if (!equipoExiste) throw new Error('Equipo no existe');

      res = await jugadoresRepo.aggregateJugador(nuevoJugador);
      break;

    case 'editar':
      if (!_id || !campo || valor === undefined) {
        throw new Error('Falta información para editar el jugador');
      }

      // Construye el objeto de actualización dinámicamente
      let updateObj = {};
      updateObj[campo] = valor;

      res = await jugadoresRepo.updateJugador({ _id: new ObjectId(_id) }, updateObj);
      break;

    case 'eliminar':
      if (!_id) {
        throw new Error('Falta información para eliminar el jugador');
      }

      res = await jugadoresRepo.deleteJugador({ _id: new ObjectId(_id) });
      break;

    default:
      throw new Error('Acción no válida');
  }

  return res;
};

