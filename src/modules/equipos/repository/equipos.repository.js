import { Connect } from "../../../config/db.js"; 
import { ObjectId } from "mongodb";

export class EquiposRepository extends Connect {
    static instance;
    constructor() {
        if (typeof EquiposRepository.instance === 'object') {
            return EquiposRepository.instance;
        }
        super();
        this.collection = this.db.collection('equipos');
        EquiposRepository.instance = this;
        return this;
    }

    async getAllEquipos() {
        let res = await this.collection.find({}).toArray();
        return res;
    }

    async getEquipoById(id){
        let objectId = new ObjectId(id)
        let [res] = await this.collection.find({_id: objectId}).toArray()
        return res
    }

}