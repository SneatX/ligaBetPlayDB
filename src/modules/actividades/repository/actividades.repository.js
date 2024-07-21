import { Connect } from "../../../config/db.js"; 

export class ActividadesRepository extends Connect {
    static instance;
    constructor() {
        if (typeof ActividadesRepository.instance === 'object') {
            return ActividadesRepository.instance;
        }
        super();
        this.collection = this.db.collection('actividades');
        ActividadesRepository.instance = this;
        return this;
    }

    async getAllTarjetas() {
        let res = await this.collection.find({}).toArray();
        return res;
    }

}