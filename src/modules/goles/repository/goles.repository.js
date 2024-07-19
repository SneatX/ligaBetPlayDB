import { Connect } from "../../../config/db.js"; 

export class GolesRepository extends Connect {
    static instance;
    constructor() {
        if (typeof GolesRepository.instance === 'object') {
            return GolesRepository.instance;
        }
        super();
        this.collection = this.db.collection('goles');
        GolesRepository.instance = this;
        return this;
    }

    async getAllGoles() {
        let res = await this.collection.find({}).toArray();
        return res;
    }

}