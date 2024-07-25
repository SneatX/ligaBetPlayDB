import { Connect } from "../../../config/db.js"; 

export class PartidosRepository extends Connect {
    static instance;
    constructor() {
        if (typeof PartidosRepository.instance === 'object') {
            return PartidosRepository.instance;
        }
        super();
        this.collection = this.db.collection('partidos');
        PartidosRepository.instance = this;
        return this;
    }

    /**
     * 
     * @param 
     * @returns Retorna un array con todos los elementos de la coleccion Entradas
     */

    async getAllPartidos() {
        let res = await this.collection.find({},{projection:{_id:1}}).toArray();
        return res;
    }

}