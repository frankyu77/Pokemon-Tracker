class appService {
    constructor(databaseManager) {
        this.db = databaseManager;
    }

    async insertPokemon(name, type1, type2, specialattack, caught_since, pid) {
        const sql = 'INSERT INTO Pokemon_Caught VALUES(:1, :2, :3, :4, :5, :6);';
        const bindings = [name, type, type2, specialattack, caught_since, pid];
        try {
            await this.db.executeQuery(sql, bindings);
            console.log(`Pokemon "${name}" inserted`);
        } catch (err) {
            console.error('Error inserting pokemon:', err);
        }
    }

    async removePokemon(gID) {
        const sql = 'DELETE FROM pokemon WHERE gameID = :1';
        const bindings = [gID];
        try {
            await this.db.executeQuery(sql, bindings);
            console.log(`Game with ID "${gID}" removed successfully.`);
        } catch (err) {
            console.error('Error removing game:', err);
        }
    }

    module.exports = appService;
}

