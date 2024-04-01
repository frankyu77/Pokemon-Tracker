class trainerService {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async insertTrainer(pid, name, favourite) {
        const sql = 'INSERT INTO TRAINER VALUES(:1, :2, :3)';
        const bindings = [pid, name, favourite];
        try {
            const result = await this.db.executeQuery(sql, bindings);
            console.log(`Type "${bindings}" inserted`);
            return result;
        } catch (err) {
            console.error('Error inserting trainer:', err);
            return false;
        }
    }

    async removeTrainer(pid) {
        const sql = 'DELETE FROM TRAINER WHERE PID = :1';
        const bindings = [pid];
        try {
            const result = await this.db.executeQuery(sql, bindings);
            console.log(`"${pid}" removed successfully.`);
            return result;
        } catch (err) {
            console.error('Error removing type:', err);
            return false;
        }
    }
}

module.exports = trainerService;
