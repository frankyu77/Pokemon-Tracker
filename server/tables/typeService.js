class typeService {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async insertType(type, weakness) {
        const sql = 'INSERT INTO TYPE_WEAKNESS VALUES(:1, :2)';
        const bindings = [type, weakness];
        try {
            const result = await this.db.executeQuery(sql, bindings);
            console.log(`Type "${bindings}" inserted`);
            return result;
        } catch (err) {
            console.error('Error inserting type:', err);
            return false;
        }
    }

    async removeType(type) {
        const sql = 'DELETE FROM TYPE_WEAKNESS WHERE TYPE = :1';
        const bindings = [type];
        try {
            const result = await this.db.executeQuery(sql,bindings)
            console.log(`"${type}" removed successfully.`);
            return result;
        } catch (err) {
            console.error('Error removing type:', err);
            return false;
        }
    }

    async mostPopularType(){
        const sql = 'SELECT t.TYPE FROM TYPE_WEAKNESS t, POKEMON_CAUGHT p WHERE p.TYPE1 = t.TYPE or p.TYPE2 = t.TYPE GROUP BY TYPE HAVING COUNT(*) = (SELECT MAX(count) FROM (SELECT count(*) AS count FROM TYPE_WEAKNESS t1, POKEMON_CAUGHT p1 WHERE p1.TYPE1 = t1.TYPE or p1.TYPE2 = t1.TYPE GROUP BY TYPE))';
        try {
            const result = await this.db.executeQueryResult(sql);
            console.log(`Most popular type`);
            return result;
        } catch (err) {
            console.error('Failed to get most popular type', err);
            return false;
        }
    }
}

module.exports = typeService;
