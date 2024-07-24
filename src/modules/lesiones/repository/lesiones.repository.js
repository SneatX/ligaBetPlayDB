import { Connect } from "../../../config/db.js"; 

export class LesionesRepository extends Connect {
    static instance;
    constructor() {
        if (typeof LesionesRepository.instance === 'object') {
            return LesionesRepository.instance;
        }
        super();
        this.collection = this.db.collection('lesiones');
        LesionesRepository.instance = this;
        return this;
    }
    /**
     * 
     * @returns Retorna un array con todos los elementos de la coleccion Lesiones
     */

    async getAllLesiones() {
        let res = await this.collection.find({}).toArray();
        return res;
    }

}