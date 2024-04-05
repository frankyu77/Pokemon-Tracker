const dbConnection = require('../database/dbConnection');

class pokemonService {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async removePokemon(Name) {
        const sql = 'DELETE FROM POKEMON_CAUGHT WHERE Name = :1';
        const bindings = [Name];
        try {
            const result = await this.db.executeQuery(sql, bindings);
            console.log(`Pokemon named "${Name}" removed successfully.`);
            return result;
        } catch (err) {
            console.error('Error removing game:', err);
            return false;
        }
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
