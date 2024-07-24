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

    /**
     * 
     * @param 
     * @returns Retorna un array con todos los elementos de la coleccion Actividades
     */

    async getAllTarjetas() {
        let res = await this.collection.find({}).toArray();
        return res;
    }

}