import { Connect } from "../../../config/db.js"; 

export class EntradasRepository extends Connect {
    static instance;
    constructor() {
        if (typeof EntradasRepository.instance === 'object') {
            return EntradasRepository.instance;
        }
        super();
        this.collection = this.db.collection('entradas');
        EntradasRepository.instance = this;
        return this;
    }
    /**
     * 
     * @param 
     * @returns Retorna un array con todos los elementos de la coleccion Entradas
     */
    async getAllEntradas() {
        let res = await this.collection.find({}).toArray();
        return res;
    }

}