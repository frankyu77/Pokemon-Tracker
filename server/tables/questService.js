class questService {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async insertQuest(questID, difficulty, pid, date) {
        const sql = 'INSERT INTO QUEST_ASSIGNED VALUES(:1, :2, :3, TO_DATE(:4, \'YYYY-MM-DD\'))';
        const bindings = [questID, difficulty, pid, date];
        try {
            await this.db.executeQuery(sql, bindings);
            console.log(`Quest "${bindings}" inserted`);
        } catch (err) {
            console.error('Error inserting quest:', err);
        }
    }

    async removeQuest(qId) {
        const sql = 'DELETE FROM QUEST_ASSIGNED WHERE QUESTID = :1';
        const bindings = [qId];
        try {
            await this.db.executeQuery(sql, bindings);
            console.log(`"${qId}" removed successfully.`);
        } catch (err) {
            console.error('Quest removing:', err);
        }
    }
}

module.exports = questService;