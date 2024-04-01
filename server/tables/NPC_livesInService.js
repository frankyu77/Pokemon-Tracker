class NPC_livesInService {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async insertNPC(pid, name, role, region) {
        const sql = 'INSERT INTO NPC_LIVESIN VALUES(:1, :2, :3, :4)';
        const bindings = [pid, name, role, region];
        try {
            const result = await this.db.executeQuery(sql, bindings);
            console.log(`NPC "${bindings}" inserted`);
            return result;
        } catch (err) {
            console.error('Error inserting NPC:', err);
            return false;
        }
    }

    async removeNPC(pID) {
        const sql = 'DELETE FROM NPC_LIVESIN WHERE PID = :1';
        const bindings = [pID];
        try {
            const result =  await this.db.executeQuery(sql, bindings);
            console.log(`"${pID}" removed successfully.`);
            return result;
        } catch (err) {
            console.error('NPC removing:', err);
            return false;
        }
    }
}

module.exports = NPC_livesInService;
