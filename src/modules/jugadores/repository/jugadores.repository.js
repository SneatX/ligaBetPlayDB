import { Connect } from "../../../config/db.js"; 
import { ObjectId } from "mongodb";

export class JugadoresRepository extends Connect {
    static instance;
    constructor() {
        if (typeof JugadoresRepository.instance === 'object') {
            return JugadoresRepository.instance;
        }
        super();
        this.collection = this.db.collection('jugadores');
        JugadoresRepository.instance = this;
        return this;
    }

    /**
     * 
     * @param 
     * @returns Retorna un array con todos los elementos de la coleccion Jugadores
     */

    async getAllJugadores() {
        let res = await this.collection.find({}).toArray();
        return res;
    }

    /**
     * 
     * @param {String} id Id del jugador a buscar
     * @returns Objeto con el documento o undefined
     */

    async getJugadorById(id){
        let objectId = new ObjectId(id)
        let [res] = await this.collection.find({_id: objectId}).toArray();
        return res
    }

}