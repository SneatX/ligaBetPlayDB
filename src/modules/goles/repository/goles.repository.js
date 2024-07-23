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

    async getAllGoles() {
        let res = await this.collection.find({}).toArray();
        return res;
    }

    async agregatteNewGol(object){
        let res = await this.collection.insertOne(object);
        return res
    }

    async getGolesByPartidoId(idPartido){
        let res = await this.collection.find({partido: new ObjectId(idPartido)}).toArray()
        return res
    }

}