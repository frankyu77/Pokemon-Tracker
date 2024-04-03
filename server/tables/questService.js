class questService {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async insertQuest(questID, difficulty, pid, date) {
        const sql = 'INSERT INTO QUEST_ASSIGNED VALUES(:1, :2, :3, TO_DATE(:4, \'YYYY-MM-DD\'))';
        const bindings = [questID, difficulty, pid, date];
        try {
            const result = await this.db.executeQuery(sql, bindings);
            console.log(`Quest "${bindings}" inserted`);
            return result;
        } catch (err) {
            console.error('Error inserting quest:', err);
            return false;
        }
    }

    async removeQuest(qId) {
        const sql = 'DELETE FROM QUEST_ASSIGNED WHERE QUESTID = :1';
        const bindings = [qId];
        try {
            const result = await this.db.executeQuery(sql, bindings);
            console.log(`"${qId}" removed successfully.`);
            return result;
        } catch (err) {
            console.error('Quest removing:', err);
            return false;
        }
    }
}

module.exports = questService;
