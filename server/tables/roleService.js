class roleService {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async insertRole(role, catchPhrase) {
        const sql = 'INSERT INTO ROLE_CATCHPHRASE VALUES(:1, :2)';
        const bindings = [role, catchPhrase];
        try {
            const result = await this.db.executeQuery(sql, bindings);
            console.log(`Role "${bindings}" inserted`);
            return result;
        } catch (err) {
            console.error('Error inserting role:', err);
            return false;
        }
    }

    async removeRole(role) {
        const sql = 'DELETE FROM ROLE_CATCHPHRASE WHERE ROLE = :1';
        const bindings = [role];
        try {
            const result = await this.db.executeQuery(sql, bindings);
            console.log(`"${pid}" removed successfully.`);
            return result;
        } catch (err) {
            console.error('Error removing type:', err);
            return false;
        }
    }
}

module.exports = roleService;
