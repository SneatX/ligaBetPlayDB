import { Connect } from "../../../config/db.js"; 
import { ObjectId } from "mongodb";

export class JugadoresRepository extends Connect {
    static instance;
    constructor() {
        if (typeof JugadoresRepository.instance === 'object') {
            return JugadoresRepository.instance;
        }
        super();
        this.collection = this.db.collection('jugadores');
        JugadoresRepository.instance = this;
        return this;
    }

    async getAllJugadores() {
        let res = await this.collection.find({}).toArray();
        return res;
    }

    async getJugadorById(id){
        let objectId = new ObjectId(id)
        let [res] = await this.collection.find({_id: objectId}).toArray();
        return res
    }

}