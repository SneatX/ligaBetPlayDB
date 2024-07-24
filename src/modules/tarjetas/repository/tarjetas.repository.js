import { Connect } from "../../../config/db.js"; 
import { ObjectId } from "mongodb";

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

    async getTarjetasByPartidoId(idPartido){
        let res = await this.collection.find({partido: new ObjectId(idPartido)}).toArray()
        return res
    }

}