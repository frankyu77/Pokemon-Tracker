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
            const result = await this.db.executeQuery(sql, bindings);
            console.log(`"${type}" removed successfully.`);
            return result;
        } catch (err) {
            console.error('Error removing type:', err);
            return false;
        }
    }
}

module.exports = typeService;
