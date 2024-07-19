import { Connect } from "../../../config/db.js"; 

export class ComunicacionesRepository extends Connect {
    static instance;
    constructor() {
        if (typeof ComunicacionesRepository.instance === 'object') {
            return ComunicacionesRepository.instance;
        }
        super();
        this.collection = this.db.collection('comunicaciones');
        ComunicacionesRepository.instance = this;
        return this;
    }

    async getAllComunicaciones() {
        let res = await this.collection.find({}).toArray();
        return res;
    }

}