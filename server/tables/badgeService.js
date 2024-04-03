const dbConnection = require('../database/dbConnection');
class badgeService {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async insertBadge(BADGE, GYMNUM, GAMEID) {
        const sql = 'INSERT INTO BADGE_GYM VALUES(:1, :2, :3)';
        // const sql1 = 'SELECT * FROM GAME'
        const bindings = [BADGE, GYMNUM, GAMEID];
        try {
            await this.db.executeQuery(sql, bindings);
            console.log(`Badge "${bindings}" inserted`);
        } catch (err) {
            console.error('Error inserting Badge:', err);
        }
    }

    async removeBadge(badge) {
        const sql = 'DELETE FROM BADGE_GYM WHERE BADGE = :1';
        const bindings = [badge];
        try {
            await this.db.executeQuery(sql, bindings);
            console.log(`Badge "${badge}" removed successfully.`);
        } catch (err) {
            console.error('Error removing badge:', err);
        }
    }
}

module.exports = badgeService;