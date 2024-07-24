import { Connect } from "../../../config/db.js"; 
import { ObjectId } from "mongodb";

export class EquiposRepository extends Connect {
    static instance;
    constructor() {
        if (typeof EquiposRepository.instance === 'object') {
            return EquiposRepository.instance;
        }
        super();
        this.collection = this.db.collection('equipos');
        EquiposRepository.instance = this;
        return this;
    }

    /**
     * 
     * @returns Retorna un array con todos los elementos de la coleccion Equipos
     */

    async getAllEquipos() {
        let res = await this.collection.find({}).toArray();
        return res;
    }

    /**
     * 
     * @param {Object} Object con la informacion a agregar
     * @returns Retorna un objeto de estado de insercion de documento
     */

    async aggregateEquipo(object) {
        let res = await this.collection.insertOne(object)
        return res
    }

    /**
     * 
     * @param {ObjectId} filter identifacion de documento a eliminar
     * @returns Retorna un objeto estado de eliminacion de documento
     */

    async deleteEquipo(filter) {
        let res = await this.collection.deleteOne(filter);
        return res;
    }

    /**
     * 
     * @param {ObjectId} filter identifacion de documento a actualizar
     * @param {Object}update con el campo y valor para actualizar
     * @returns Retorna un array con todos los elementos de la coleccion Entradas
     */
    
    async updateEquipo(filter, update) {
        let res = await this.collection.updateOne(filter, { $set: update });
        return res;
    }
    
    /**
     * 
     * @param {String} id Id del equipo a buscar
     * @returns Objeto con el documento o undefined
     */

    async getEquipoById(id){
        let objectId = new ObjectId(id)
        let [res] = await this.collection.find({_id: objectId}).toArray()
        return res
    }

    /**
     * 
     * @param {String} id Id del estadio a buscar en equipos
     * @returns Objeto con el documento o undefined
     */

    async getEquipoByEstadioId(id){
        let objectId = new ObjectId(id)
        let [res] = await this.collection.find({Estadio: objectId}).toArray()
        return res
    }
}