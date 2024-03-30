class leadsToService {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async insertLeadsTo(regionName, area) {
        const sql = 'INSERT INTO LEADSTO VALUES(:1, :2)';
        const bindings = [regionName, area];
        try {
            await this.db.executeQuery(sql, bindings);
            console.log(`LeadsTo "${bindings}" inserted`);
        } catch (err) {
            console.error('Error inserting LeadsTo:', err);
        }
    }

    async removeLeadsTo(regionName, area ) {
        const sql = 'DELETE FROM LEADSTO WHERE REGIONNAME = :1 AND AREA# = :2';
        const bindings = [regionName, area];
        try {
            await this.db.executeQuery(sql, bindings);
            console.log(`"${regionName}" with "${area}" removed successfully.`);
        } catch (err) {
            console.error('LeadsTo removing:', err);
        }
    }
}

module.exports = leadsToService;