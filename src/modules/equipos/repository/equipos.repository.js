import { Connect } from "../../../config/db.js"; 

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
     * @param 
     * @returns Retorna un array con todos los elementos de la coleccion Entradas
     */

    async getAllEquipos() {
        let res = await this.collection.find({}).toArray();
        return res;
    }

    /**
     * 
     * @param Object Objeto con la informacion a agregar
     * @returns Retorna un objeto de estado de insercion de documento
     */

    async aggregateEquipo(object) {
        let res = await this.collection.insertOne(object)
        return res
    }

    /**
     * 
     * @param filter {ObjectId} identifacion de documento a eliminar
     * @returns Retorna un objeto estado de eliminacion de documento
     */

    async deleteEquipo(filter) {
        let res = await this.collection.deleteOne(filter);
        return res;
    }

    /**
     * 
     * @param filter {ObjectId} identifacion de documento a actualizar
     * @param update Objeto con el campo y valor para actualizar
     * @returns Retorna un array con todos los elementos de la coleccion Entradas
     */
    
    async updateEquipo(filter, update) {
        let res = await this.collection.updateOne(filter, { $set: update });
        return res;
    }
    
}