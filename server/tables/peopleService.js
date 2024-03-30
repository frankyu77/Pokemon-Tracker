class peopleService {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async insertPeople(PID, GAMEID) {
        const sql = 'INSERT INTO PEOPLE_HAS VALUES(:1, :2)';
        const bindings = [PID, GAMEID];
        try {
            await this.db.executeQuery(sql, bindings);
            console.log(`People of "${bindings}" inserted`);
        } catch (err) {
            console.error('Error inserting people:', err);
        }
    }

    async removePeople(pID) {
        const sql = 'DELETE FROM PEOPLE_HAS WHERE PID = :1';
        const bindings = [pID];
        try {
            await this.db.executeQuery(sql, bindings);
            console.log(`People with ID "${pID}" removed successfully.`);
        } catch (err) {
            console.error('Error removing game:', err);
        }
    }
}

module.exports = peopleService;
