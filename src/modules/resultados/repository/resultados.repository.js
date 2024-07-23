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

    async getAllResultados() {
        let res = await this.collection.find({}).toArray();
        return res;
    }

    async getResultadoByPartidoId(idPartido){
        let objectId = new ObjectId(idPartido)
        let [res] = await this.collection.find({partido: objectId}).toArray()
        return res
    }

    async aggregateNewResultado(object){
        let res = await this.collection.insertOne(object)
        return res
    }

}