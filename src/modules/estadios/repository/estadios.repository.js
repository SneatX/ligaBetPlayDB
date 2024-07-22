import { Connect } from "../../../config/db.js"; 
import { ObjectId } from "mongodb";

export class EstadiosRepository extends Connect {
    static instance;
    constructor() {
        if (typeof EstadiosRepository.instance === 'object') {
            return EstadiosRepository.instance;
        }
        super();
        this.collection = this.db.collection('estadios');
        EstadiosRepository.instance = this;
        return this;
    }

    async getAllEstadios() {
        let res = await this.collection.find({}).toArray();
        return res;
    }

    async getEstadioById(id){
        let objectId = new ObjectId(id)
        let [res] = await this.collection.find({_id: objectId}).toArray()
        return res
    }

}