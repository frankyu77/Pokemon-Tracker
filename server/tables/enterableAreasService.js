const dbConnection = require('../database/dbConnection');

class enterableAreasService {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async insertEnterableArea(areaNum, type) {
        const sql = 'INSERT INTO ENTERABLEAREAS VALUES(:1, :2)';
        const bindings = [areaNum, type];
        try {
            await this.db.executeQuery(sql, bindings);
            console.log(`Enterable Area "${bindings}" inserted`);
        } catch (err) {
            console.error('Error inserting Enterable Area:', err);
        }
    }

    async removeEnterableArea(areaNum) {
        const sql = 'DELETE FROM ENTERABLEAREAS WHERE AREA# = :1';
        const bindings = [areaNum];
        try {
            await this.db.executeQuery(sql, bindings);
            console.log(`Enterable Area "${areaNum}" removed successfully.`);
        } catch (err) {
            console.error('Error removing Enterable Area:', err);
        }
    }
}

module.exports = enterableAreasService;