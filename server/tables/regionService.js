class regionService {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async insertRegion(regionName, Type, gymNum, GameId) {
        const sql = 'INSERT INTO REGION_APARTOF VALUES(:1, :2, :3, :4)';
        const bindings = [regionName, Type, gymNum, GameId];
        try {
            await this.db.executeQuery(sql, bindings);
            console.log(`Region "${bindings}" inserted`);
        } catch (err) {
            console.error('Error inserting region:', err);
        }
    }

    async removeRegion(regionName) {
        const sql = 'DELETE FROM REGION_APARTOF WHERE TYPE = :1';
        const bindings = [regionName];
        try {
            await this.db.executeQuery(sql, bindings);
            console.log(`"${regionName}" removed successfully.`);
        } catch (err) {
            console.error('Error removing:', err);
        }
    }
}

module.exports = regionService;