import { Connect } from "../../../config/db.js"; 
import { ObjectId } from "mongodb";

export class GolesRepository extends Connect {
    static instance;
    constructor() {
        if (typeof GolesRepository.instance === 'object') {
            return GolesRepository.instance;
        }
        super();
        this.collection = this.db.collection('goles');
        GolesRepository.instance = this;
        return this;
    }

    /**
     * 
     * @param 
     * @returns Retorna un array con todos los elementos de la coleccion goles
     */

    async getAllGoles() {
        let res = await this.collection.find({}).toArray();
        return res;
    }

    /**
     * 
     * @param {*} object Objeto a ingresar en la coleccion goles
     * @returns 
     */

    async agregatteNewGol(object){
        let res = await this.collection.insertOne(object);
        return res
    }

    /**
     * 
     * @param {String} idPartido Id del partido al cual haremos la consulta de goles
     * @returns Array con los goles realizadons durante el partido
     */

    async getGolesByPartidoId(idPartido){
        let res = await this.collection.find({partido: new ObjectId(idPartido)}).toArray()
        return res
    }

}