const dbConnection = require('../database/dbConnection');

class pokemonService {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async countPokemon(){
        const sql = 'SELECT COUNT(*) FROM POKEMON_CAUGHT'

        try {
            const result = await this.db.executeQuery(sql, bindings);
            console.log(`Pokemon count worked`);
            return result;
        } catch (err) {
            console.error('Error inserting pokemon:', err);
            return false;
        }
    }


}

module.exports = pokemonService;
