import { Connect } from "../../../config/db.js"; 

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

    async aggregateEquipo(object) {
        let res = await this.collection.insertOne(object)
        return res
    }

    async deleteEquipo(filter) {
        let res = await this.collection.deleteOne(filter);
        return res;
    }
    
    async updateEquipo(filter, update) {
        let res = await this.collection.updateOne(filter, { $set: update });
        return res;
    }
    
}