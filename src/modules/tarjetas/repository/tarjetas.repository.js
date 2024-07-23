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

    async getAllTarjetas() {
        let res = await this.collection.find({}).toArray();
        return res;
    }

    async agregatteNewTarjeta(object){
        let res = await this.collection.insertOne(object);
        return res
    }

}