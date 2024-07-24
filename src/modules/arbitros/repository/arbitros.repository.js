import { Connect } from "../../../config/db.js"; 

export class ArbitrosRepository extends Connect {
    static instance;
    constructor() {
        if (typeof ArbitrosRepository.instance === 'object') {
            return ArbitrosRepository.instance;
        }
        super();
        this.collection = this.db.collection('arbitros');
        ArbitrosRepository.instance = this;
        return this;
    }

    /**
     * 
     * @param 
     * @returns Retorna un array con todos los elementos de la coleccion Entradas
     */

    async getAllTarjetas() {
        let res = await this.collection.find({}).toArray();
        return res;
    }

    /**
     * 
     * @param {ObjectId} object Objeto que contiente toda la informacion de los campos
     * @returns Retorna un array con el registro de actualizadion de coleccion
     */

    async aggregateArbitro(object) {
        let res = await this.collection.insertOne(object)
        return res
    }

    /**
     * 
     * @param {ObjectId} filter Objeto que se desea ingresar a Partidos
     * @returns Retorna un array con el registro de estado de eliminacion de documento
     */

    async deleteArbitro(filter) {
        let res = await this.collection.deleteOne(filter);
        return res;
    }
    
    /**
     * 
     * @param {ObjectId} filter Objeto que se desea ingresar a Partidos, update Objeto que contiene campo y valor
     * @returns Retorna un array con el registro de actualizadion de coleccion
     */

    async updateArbitro(filter, update) {
        let res = await this.collection.updateOne(filter, { $set: update });
        return res;
    }

}