import { Connect } from "../../../config/db.js"; 

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
     * @returns Retorna un array con todos los elementos de la coleccion Entradas
     */

    async getAllJugadores() {
        let res = await this.collection.find({},{projection: {nombre:1,_id:0}}).toArray();
        return res;
    }

    /**
     * 
     * @param Object Objeto con la informacion de jugador
     * @returns Retorna un array con todos los elementos de la coleccion Entradas
     */

    async aggregateJugador(object) {
        let res = await this.collection.insertOne(object)
        return res
    }

    /**
     * 
     * @param filter {ObjectId} con el id del jugador a elminar
     * @returns Retorna un array con todos los elementos de la coleccion Entradas
     */

    async deleteJugador(filter) {
        let res = await this.collection.deleteOne(filter);
        return res;
    }

     /**
     * 
     * @param filter {ObjectId} identifacion de documento a actualizar
     * @param update Objeto con el campo y valor para actualizar
     * @returns Retorna un array con todos los elementos de la coleccion Entradas
     */
    
    async updateJugador(filter, update) {
        let res = await this.collection.updateOne(filter, { $set: update });
        return res;
    }
}