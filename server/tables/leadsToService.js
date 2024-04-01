class leadsToService {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async insertLeadsTo(regionName, area) {
        const sql = 'INSERT INTO LEADSTO VALUES(:1, :2)';
        const bindings = [regionName, area];
        try {
            const result = await this.db.executeQuery(sql, bindings);
            console.log(`LeadsTo "${bindings}" inserted`);
            return result;
        } catch (err) {
            console.error('Error inserting LeadsTo:', err);
            return false;
        }
    }

    async removeLeadsTo(regionName, area ) {
        const sql = 'DELETE FROM LEADSTO WHERE REGIONNAME = :1 AND AREA# = :2';
        const bindings = [regionName, area];
        try {
            const result =  await this.db.executeQuery(sql, bindings);
            console.log(`"${regionName}" with "${area}" removed successfully.`);
            return result;
        } catch (err) {
            console.error('LeadsTo removing:', err);
            return false;
        }
    }
}

module.exports = leadsToService;
