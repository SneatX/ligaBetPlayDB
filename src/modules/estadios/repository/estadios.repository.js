import { Connect } from "../../../config/db.js"; 
import { ObjectId } from "mongodb";

export class EstadiosRepository extends Connect {
    static instance;
    constructor() {
        if (typeof EstadiosRepository.instance === 'object') {
            return EstadiosRepository.instance;
        }
        super();
        this.collection = this.db.collection('estadios');
        EstadiosRepository.instance = this;
        return this;
    }

    /**
     * 
     * @returns Retorna un array con todos los elementos de la coleccion Estadios
     */

    async getAllEstadios() {
        let res = await this.collection.find({}, { projection: { nombre: 1, _id: 0} }).toArray();
        return res;
    }

    /**
     * 
     * @param {String} id Id del estadio a buscar 
     * @returns Objeto con el documento o undefined
     */

    async getEstadioById(id){
        let objectId = new ObjectId(id)
        let [res] = await this.collection.find({_id: objectId}).toArray()
        return res
    }

    /**
     * 
     * @param {ObjectId} objectId ObjectId del documento a actualizar
     * @param {Date} fecha Fecha a ingresar en el array de horario
     * @returns 
     */

    async insertFechaInEstadio(objectId, fecha){
        let filter = {_id: objectId}
        let accion = {
            $push: {
                Horarios: fecha
            }
        }
        let res = await this.collection.updateOne(filter, accion)
        return res
    }

}