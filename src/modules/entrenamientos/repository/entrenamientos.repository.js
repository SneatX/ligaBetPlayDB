import { Connect } from "../../../config/db.js"; 

export class EntrenamientosRepository extends Connect {
    static instance;
    constructor() {
        if (typeof EntrenamientosRepository.instance === 'object') {
            return EntrenamientosRepository.instance;
        }
        super();
        this.collection = this.db.collection('entrenamientos');
        EntrenamientosRepository.instance = this;
        return this;
    }

    async getAllEntrenamientos() {
        let res = await this.collection.find({}).toArray();
        return res;
    }

}