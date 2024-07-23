import { Connect } from "../../../config/db.js"; 
import { ObjectId } from "mongodb";

export class PartidosRepository extends Connect {
    static instance;
    constructor() {
        if (typeof PartidosRepository.instance === 'object') {
            return PartidosRepository.instance;
        }
        super();
        this.collection = this.db.collection('partidos');
        PartidosRepository.instance = this;
        return this;
    }

    async getAllPartidos() {
        let res = await this.collection.find({}).toArray();
        return res;
    }

    async aggregatePartido(object) {
        let res = await this.collection.insertOne(object)
        return res
    }

    async getPartidoById(id) {
        let objectId = new ObjectId(id)
        let [res] = await this.collection.find({_id: objectId}).toArray()
        return res
    }

}