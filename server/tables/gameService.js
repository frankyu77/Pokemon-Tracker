const dbConnection = require('../database/dbConnection');
class gameService {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async insertGame(gameID, difficulty, generation) {
        const sql = 'INSERT INTO GAME VALUES(:1, :2, :3)';
        const sql1 = 'SELECT * FROM GAME'
        const bindings = [gameID, difficulty, generation];
        try {
            const result = await this.db.executeQuery(sql, bindings);
            console.log(`Game of "${bindings}" inserted`);
            return result;
        } catch (err) {
            console.error('Error inserting game:', err);
            return false;
        }
    }

    async removeGame(gID) {
        const sql = 'DELETE FROM game WHERE gameID = :1';
        const bindings = [gID];
        try {
            const result = await this.db.executeQuery(sql, bindings);
            console.log(`Game with ID "${gID}" removed successfully.`);
            return result;
        } catch (err) {
            console.error('Error removing game:', err);
            return false;
        }
    }
}

module.exports = gameService;

