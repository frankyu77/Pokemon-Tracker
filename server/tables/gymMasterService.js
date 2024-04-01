class gymMasterService{
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async insertGymMasterService(pid, name, badge, owns_since) {
        const sql = 'INSERT INTO GYMMASTER_OWNS VALUES(:1, :2, :3, :4)';
        const bindings = [pid, name, badge, owns_since];
        try {
            const result = await this.db.executeQuery(sql, bindings);
            console.log(`GymMaster "${bindings}" inserted`);
            return result;
        } catch (err) {
            console.error('Error inserting GymMaster:', err);
            return false;
        }
    }

    async removeGymMasterService(pid) {
        const sql = 'DELETE FROM GYMMASTER_OWNS WHERE PID = :1';
        const bindings = [pid];
        try {
            const result = await this.db.executeQuery(sql, bindings);
            console.log(`"${pid}" removed successfully.`);
            return result;
        } catch (err) {
            console.error('GymMaster removing:', err);
            return false;
        }
    }
}

module.exports = gymMasterService;
