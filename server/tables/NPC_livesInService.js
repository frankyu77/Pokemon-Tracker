class NPC_livesInService {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async insertNPC(pid, name, role, region) {
        const sql = 'INSERT INTO NPC_LIVESIN VALUES(:1, :2, :3, :4)';
        const bindings = [pid, name, role, region];
        try {
            await this.db.executeQuery(sql, bindings);
            console.log(`NPC "${bindings}" inserted`);
        } catch (err) {
            console.error('Error inserting NPC:', err);
        }
    }

    async removeNPC(pID) {
        const sql = 'DELETE FROM NPC_LIVESIN WHERE PID = :1';
        const bindings = [pID];
        try {
            await this.db.executeQuery(sql, bindings);
            console.log(`"${pID}" removed successfully.`);
        } catch (err) {
            console.error('NPC removing:', err);
        }
    }
}

module.exports = NPC_livesInService;