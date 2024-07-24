import { Connect } from "../../../config/db.js"; 

export class ArbitrosRepository extends Connect {
    static instance;
    constructor() {
        if (typeof ArbitrosRepository.instance === 'object') {
            return ArbitrosRepository.instance;
        }
        super();
        this.collection = this.db.collection('arbitros');
        ArbitrosRepository.instance = this;
        return this;
    }

    async getAllTarjetas() {
        let res = await this.collection.find({}).toArray();
        return res;
    }

    async aggregateArbitro(object) {
        let res = await this.collection.insertOne(object)
        return res
    }

    async deleteArbitro(filter) {
        let res = await this.collection.deleteOne(filter);
        return res;
    }
    
    async updateArbitro(filter, update) {
        let res = await this.collection.updateOne(filter, { $set: update });
        return res;
    }

}