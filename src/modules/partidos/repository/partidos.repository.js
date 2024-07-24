import { Connect } from "../../../config/db.js"; 
import { ObjectId } from "mongodb";

export class PartidosRepository extends Connect {
    static instance;
    constructor() {
        if (typeof PartidosRepository.instance === 'object') {
            return PartidosRepository.instance;
        }
        super();
        this.collection = this.db.collection('partidos');
        PartidosRepository.instance = this;
        return this;
    }

    /**
     * 
     * @param 
     * @returns Retorna un array con todos los elementos de la coleccion Partidos
     */

    async getAllPartidos() {
        let res = await this.collection.find({}).toArray();
        return res;
    }

    /**
     * 
     * @param {ObjectId} object Objeto que se desea ingresar a Partidos
     * @returns Objeto con informacion de ingreso
     */

    async aggregatePartido(object) {
        let res = await this.collection.insertOne(object)
        return res
    }

    /**
     * 
     * @param {String} id Id del partido a buscar
     * @returns Objeto con el documento o undefined
     */

    async getPartidoById(id) {
        let objectId = new ObjectId(id)
        let [res] = await this.collection.find({_id: objectId}).toArray()
        return res
    }

}