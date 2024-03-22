const dbConnection = require('../database/dbConnection');

class pokemonService {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async insertPokemon(name, type1, type2, specialattack, caught_since, pid) {
        const sql = `INSERT INTO Pokemon_Caught (name, type1, type2, specialattack, caught_since, pid) 
                     VALUES (:1, :2, :3, :4, :5, :6)`;
        const bindings = [name, type1, type2, specialattack, caught_since, pid];
        try {
            const result = await this.db.executeQuery(sql, bindings);
            console.log(`Pokemon "${name}" inserted`);
            return result;
        } catch (err) {
            console.error('Error inserting pokemon:', err);
            return false;
        }
    }
}

module.exports = pokemonService;