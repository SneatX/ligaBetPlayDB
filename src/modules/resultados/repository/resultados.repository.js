import { Connect } from "../../../config/db.js"; 
import { ObjectId } from "mongodb";

export class ResultadosRepository extends Connect {
    static instance;
    constructor() {
        if (typeof ResultadosRepository.instance === 'object') {
            return ResultadosRepository.instance;
        }
        super();
        this.collection = this.db.collection('resultados');
        ResultadosRepository.instance = this;
        return this;
    }

     /**
     * 
     * @returns Retorna un array con todos los elementos de la coleccion Resultados
     */

    async getAllResultados() {
        let res = await this.collection.find({}).toArray();
        return res;
    }

    /**
     * 
     * @param {String} idPartido Id del partido del cual se desea saber el resultado
     * @returns Objeto con el documento o undefined
     */

    async getResultadoByPartidoId(idPartido){
        let objectId = new ObjectId(idPartido)
        let [res] = await this.collection.find({partido: objectId}).toArray()
        return res
    }

    /**
     * 
     * @param {Object} object Objeto con la informacion a agregar la Resultados
     * @returns Objeto con la informacion de ingreso
     */

    async aggregateNewResultado(object){
        let res = await this.collection.insertOne(object)
        return res
    }

}