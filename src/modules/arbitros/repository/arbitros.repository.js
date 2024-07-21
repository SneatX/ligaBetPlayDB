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

}