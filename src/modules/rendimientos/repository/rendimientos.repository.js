import { Connect } from "../../../config/db.js"; 

export class RendimientosRepository extends Connect {
    static instance;
    constructor() {
        if (typeof RendimientosRepository.instance === 'object') {
            return RendimientosRepository.instance;
        }
        super();
        this.collection = this.db.collection('rendimientos');
        RendimientosRepository.instance = this;
        return this;
    }

    async getAllRendimientos() {
        let res = await this.collection.find({}).toArray();
        return res;
    }

}