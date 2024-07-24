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
     * @returns Retorna un array con todos los elementos de la coleccion Jugadores
     */

    async getAllJugadores() {
        let res = await this.collection.find({},{projection: {nombre:1,_id:0}}).toArray();
        return res;
    }

    /**
     * 
     * @param {Object} Object Objeto con la informacion de jugador
     * @returns Retorna un array con todos los elementos de la coleccion Entradas
     */

    async aggregateJugador(object) {
        let res = await this.collection.insertOne(object)
        return res
    }

    /**
     * 
     * @param {ObjectId} filter id del jugador a elminar
     * @returns Retorna un array con todos los elementos de la coleccion Entradas
     */

    async deleteJugador(filter) {
        let res = await this.collection.deleteOne(filter);
        return res;
    }

     /**
     * 
     * @param {ObjectId} filter identifacion de documento a actualizar
     * @param {Objeto} update campo y valor para actualizar
     * @returns Retorna un array con todos los elementos de la coleccion Entradas
     */
    
    async updateJugador(filter, update) {
        let res = await this.collection.updateOne(filter, { $set: update });
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