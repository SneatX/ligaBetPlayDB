import { Connect } from "../../../config/db.js"; 

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
        let res = await this.collection.find({},{projection: {nombre:1,_id:0}}).toArray();
        return res;
    }
    async aggregateJugador(object) {
        let res = await this.collection.insertOne(object)
        return res
    }

    async deleteJugador(filter) {
        let res = await this.collection.deleteOne(filter);
        return res;
    }
    
    async updateJugador(filter, update) {
        let res = await this.collection.updateOne(filter, { $set: update });
        return res;
    }

}