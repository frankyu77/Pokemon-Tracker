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
        const sql = 'DELETE FROM REGION_APARTOF WHERE REGIONNAME = :1';
        const bindings = [regionName];
        try {
            await this.db.executeQuery(sql, bindings);
            console.log(`"${regionName}" removed successfully.`);
        } catch (err) {
            console.error('Error removing:', err);
        }
    }

    async updateRegionGYM(regionName, gameID, gymNum){
        const sql = 'UPDATE FROM REGION_APARTOF WHERE REGIONNAME = :1';
        const bindings = [regionName];
        try {
            await this.db.executeQuery(sql, bindings);
            console.log(`"${regionName}" updated successfully.`)
        } catch (err){
            console.error('Error updating:', err);
        }
    }

}

module.exports = regionService;