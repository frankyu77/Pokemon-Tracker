const dbConnection = require('../database/dbConnection');

class difficultyService {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async insertDifficulty(difficulty, reward) {
        const sql = 'INSERT INTO DIFFICULTY_REWARD VALUES(:1, :2)';
        const bindings = [difficulty, reward];
        try {
            await this.db.executeQuery(sql, bindings);
            console.log(`Difficulty "${bindings}" inserted`);
        } catch (err) {
            console.error('Error inserting Difficulty:', err);
        }
    }

    async removeDifficulty(difficulty) {
        const sql = 'DELETE FROM DIFFICULTY_REWARD WHERE DIFFICULTY = :1';
        const bindings = [difficulty];
        try {
            await this.db.executeQuery(sql, bindings);
            console.log(`Difficulty "${difficulty}" removed successfully.`);
        } catch (err) {
            console.error('Error removing Difficulty:', err);
        }
    }
}

module.exports = difficultyService;