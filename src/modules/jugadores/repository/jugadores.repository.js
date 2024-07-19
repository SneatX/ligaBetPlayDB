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
        let res = await this.collection.find({}).toArray();
        return res;
    }

}