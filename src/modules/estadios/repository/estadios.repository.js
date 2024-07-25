import { Connect } from "../../../config/db.js"; 

export class EstadiosRepository extends Connect {
    static instance;
    constructor() {
        if (typeof EstadiosRepository.instance === 'object') {
            return EstadiosRepository.instance;
        }
        super();
        this.collection = this.db.collection('estadios');
        EstadiosRepository.instance = this;
        return this;
    }

    /**
     * 
     * @param 
     * @returns Retorna un array con todos los elementos de la coleccion Entradas
     */
    
    async getAllEstadios() {
        let res = await this.collection.find({}, { projection: { nombre: 1, _id: 0} }).toArray();
        return res;
    }
}