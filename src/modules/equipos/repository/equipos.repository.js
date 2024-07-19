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

}