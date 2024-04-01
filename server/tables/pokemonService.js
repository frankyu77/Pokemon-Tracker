const dbConnection = require('../database/dbConnection');

class pokemonService {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async insertPokemon(name, type1, type2, specialattack, caught_since, pid) {
        console.log(type1);
        const sql = `INSERT INTO Pokemon_Caught (name, type1, type2, specialattack, caught_since, pid)
                     VALUES (:1, :2, :3, :4, TO_DATE(:5, 'DD-MM-YYYY'), :6)`;
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
}

module.exports = pokemonService;
