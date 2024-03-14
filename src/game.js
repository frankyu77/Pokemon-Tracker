class Game {
    constructor(databaseManager) {
        this.db = databaseManager;
    }

    async insertGame(gameID, difficulty, generation) {
        const sql = 'INSERT INTO Game VALUES(:1, :2, :3);';
        const bindings = [gameID, difficulty, generation];
        try {
            await this.db.executeQuery(sql, bindings);
            console.log(`Game of "${bindings}" inserted`);
        } catch (err) {
            console.error('Error inserting game:', err);
        }
    }

    async removeGame(gID) {
        const sql = 'DELETE FROM game WHERE gameID = :1';
        const bindings = [gID];
        try {
            await this.db.executeQuery(sql, bindings);
            console.log(`Game with ID "${gID}" removed successfully.`);
        } catch (err) {
            console.error('Error removing game:', err);
        }
    }
}

