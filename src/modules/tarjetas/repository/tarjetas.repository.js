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

     /**
     * 
     * @param 
     * @returns Retorna un array con todos los elementos de la coleccion Resultados
     */

    async getAllTarjetas() {
        let res = await this.collection.find({}).toArray();
        return res;
    }

    /**
     * 
     * @param {Objeto} object Objeto con la informacion de la nueva tarjeta
     * @returns Informacion del ingreso
     */

    async agregatteNewTarjeta(object){
        let res = await this.collection.insertOne(object);
        return res
    }

    /**
     * 
     * @param {String} idPartido Id del partido a buscar en tarjetas
     * @returns Objeto con el documento o undefined
     */

    async getTarjetasByPartidoId(idPartido){
        let res = await this.collection.find({partido: new ObjectId(idPartido)}).toArray()
        return res
    }

}