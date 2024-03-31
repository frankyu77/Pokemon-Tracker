class trainerService {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async insertTrainer(pid, name, favourite) {
        const sql = 'INSERT INTO TRAINER VALUES(:1, :2, :3)';
        const bindings = [pid, name, favourite];
        try {
            await this.db.executeQuery(sql, bindings);
            console.log(`Type "${bindings}" inserted`);
        } catch (err) {
            console.error('Error inserting trainer:', err);
        }
    }

    async removeTrainer(pid) {
        const sql = 'DELETE FROM TRAINER WHERE PID = :1';
        const bindings = [pid];
        try {
            await this.db.executeQuery(sql, bindings);
            console.log(`"${pid}" removed successfully.`);
        } catch (err) {
            console.error('Error removing type:', err);
        }
    }
}

module.exports = trainerService;
