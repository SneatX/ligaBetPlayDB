import { Connect } from "../../../config/db.js"; 

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
     * @param 
     * @returns Retorna un array con todos los elementos de la coleccion Entradas
     */
    
    async getAllResultados() {
        let res = await this.collection.find({}).toArray();
        return res;
    }

}