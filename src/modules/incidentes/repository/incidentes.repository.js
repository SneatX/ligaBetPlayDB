import { Connect } from "../../../config/db.js"; 

export class IncidentesRepository extends Connect {
    static instance;
    constructor() {
        if (typeof IncidentesRepository.instance === 'object') {
            return IncidentesRepository.instance;
        }
        super();
        this.collection = this.db.collection('incidentes');
        IncidentesRepository.instance = this;
        return this;
    }

    async getAllIncidentes() {
        let res = await this.collection.find({}).toArray();
        return res;
    }

}