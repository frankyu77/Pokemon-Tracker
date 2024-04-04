const dbConnection = require('../database/dbConnection');
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
        const sql = 'DELETE FROM REGION_APARTOF WHERE REGIONNAME = :1';
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

    async updateRegionGYM(regionName, gameID, gymNum){
        const sql = 'UPDATE REGION_APARTOF SET GAMEID = :1, GYM# = :2 WHERE REGIONNAME = :3';
        const bindings = [gameID, gymNum, regionName];
        try {
            await this.db.executeQuery(sql, bindings);
            console.log(`"${regionName}" updated successfully.`)
        } catch (err){
            console.error('Error updating:', err);
        }
    }

    async gameWithLeastRegions(){
        // group By, having, Nested aggregation with Group by
        const sql = 'SELECT GAMEID FROM REGION_APARTOF GROUP BY GAMEID HAVING COUNT(*) = (SELECT MIN(COUNT(*)) FROM REGION_APARTOF a GROUP BY GAMEID)';
        const bindings = [];
        try {
            data = await this.db.executeQuery(sql, bindings);
            console.log(`Game with least number of regions}`);
            return data;
        } catch (err){
            console.error('Error getting game with least # of regions', err);
            return null;
        }
    }

    // groupBy
    async LeastNumberOfRegionsInAGame(){
        const sql = 'SELECT MIN(COUNT(*)) FROM REGION_APARTOF a GROUP BY GAMEID';
        const bindings = [];
        try {
            await this.db.executeQuery(sql, bindings);
            console.log(`Game with least number of regions}`);
        } catch (err){
            console.error('Error getting game with least # of regions', err);
        }
    }

    async averageNumberOfRegionInAGame(){
        const sql = 'SELECT AVG(count) FROM (SELECT g.GAMEID, count(*) AS count FROM GAME g, REGION_APARTOF r WHERE g.GAMEID = r.GAMEID GROUP BY g.GAMEID)';
        const bindings = [];
        try {
            data = await this.db.executeQuery(sql, bindings);
            console.log(`Average number of regions per game success}`);
            return data;
        } catch (err){
            console.error('Error loading avg number of regions per game', err);
            return null;
        }
    }
}

module.exports = regionService;
