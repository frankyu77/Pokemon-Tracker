class roleService {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async insertRole(role, catchPhrase) {
        const sql = 'INSERT INTO ROLE_CATCHPHRASE VALUES(:1, :2)';
        const bindings = [role, catchPhrase];
        try {
            await this.db.executeQuery(sql, bindings);
            console.log(`Role "${bindings}" inserted`);
        } catch (err) {
            console.error('Error inserting role:', err);
        }
    }

    async removeRole(role) {
        const sql = 'DELETE FROM ROLE_CATCHPHRASE WHERE ROLE = :1';
        const bindings = [role];
        try {
            await this.db.executeQuery(sql, bindings);
            console.log(`"${role}" removed successfully.`);
        } catch (err) {
            console.error('Error removing type:', err);
        }
    }
}

module.exports = roleService;
