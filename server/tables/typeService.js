class typeService {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async insertType(type, weakness) {
        const sql = 'INSERT INTO TYPE_WEAKNESS VALUES(:1, :2)';
        const bindings = [type, weakness];
        try {
            await this.db.executeQuery(sql, bindings);
            console.log(`Type "${bindings}" inserted`);
        } catch (err) {
            console.error('Error inserting type:', err);
        }
    }

    async removeType(type) {
        const sql = 'DELETE FROM TYPE_WEAKNESS WHERE TYPE = :1';
        const bindings = [type];
        try {
            await this.db.executeQuery(sql, bindings);
            console.log(`"${type}" removed successfully.`);
        } catch (err) {
            console.error('Error removing type:', err);
        }
    }
}

module.exports = typeService;
