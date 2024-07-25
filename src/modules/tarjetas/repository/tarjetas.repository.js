import { Connect } from "../../../config/db.js"; 

export class TarjetasRepository extends Connect {
    static instance;
    constructor() {
        if (typeof TarjetasRepository.instance === 'object') {
            return TarjetasRepository.instance;
        }
        super();
        this.collection = this.db.collection('tarjetas');
        TarjetasRepository.instance = this;
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

}