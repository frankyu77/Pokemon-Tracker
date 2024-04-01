class gymService{
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async insertGymService(gymNum, difficulty, type, gameID) {
        const sql = 'INSERT INTO GYM_INCLUDES VALUES(:1, :2, :3, :4)';
        const bindings = [gymNum, difficulty, type, gameID];
        try {
            const result = await this.db.executeQuery(sql, bindings);
            console.log(`GymService "${bindings}" inserted`);
            return result;
        } catch (err) {
            console.error('Error inserting GymService:', err);
            return false;
        }
    }

    async removeGymService(gymNum) {
        const sql = 'DELETE FROM GYM_INCLUDES WHERE GYM# = :1';
        const bindings = [gymNum];
        try {
            const result = await this.db.executeQuery(sql, bindings);
            console.log(`"${gymNum}" removed successfully.`);
            return result;
        } catch (err) {
            console.error('GymService removing:', err);
            return false;
        }
    }
}

module.exports = gymService;
