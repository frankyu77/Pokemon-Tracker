class regionService {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async insertRegion(regionName, Type, gymNum, GameId) {
        const sql = 'INSERT INTO REGION_APARTOF VALUES(:1, :2, :3, :4)';
        const bindings = [regionName, Type, gymNum, GameId];
        try {
            const result = await this.db.executeQuery(sql, bindings);
            console.log(`Region "${bindings}" inserted`);
            return result;
        } catch (err) {
            console.error('Error inserting region:', err);
            return false;
        }
    }

    async removeRegion(regionName) {
        const sql = 'DELETE FROM REGION_APARTOF WHERE TYPE = :1';
        const bindings = [regionName];
        try {
            const result = await this.db.executeQuery(sql, bindings);
            console.log(`"${regionName}" removed successfully.`);
            return result;
        } catch (err) {
            console.error('Error removing:', err);
            return false;
        }
    }
}

module.exports = regionService;
