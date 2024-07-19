import { Connect } from "../../../config/db.js"; 

export class EntradasRepository extends Connect {
    static instance;
    constructor() {
        if (typeof EntradasRepository.instance === 'object') {
            return EntradasRepository.instance;
        }
        super();
        this.collection = this.db.collection('entradas');
        EntradasRepository.instance = this;
        return this;
    }

    async getAllEntradas() {
        let res = await this.collection.find({}).toArray();
        return res;
    }

}