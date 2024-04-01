class itemHasService{
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async insertItemHas(itemNum, rarity, gameID, itemName) {
        const sql = 'INSERT INTO ITEMS_HAS VALUES(:1, :2, :3, :4)';
        const bindings = [itemNum, rarity, gameID, itemName];
        try {
            const result = await this.db.executeQuery(sql, bindings);
            console.log(`ItemHas "${bindings}" inserted`);
            return result;
        } catch (err) {
            console.error('Error inserting ItemHas:', err);
            return false;
        }
    }

    async removeItemHas(itemNum) {
        const sql = 'DELETE FROM ITEMS_HAS WHERE ITEM# = :1';
        const bindings = [itemNum];
        try {
            const result = await this.db.executeQuery(sql, bindings);
            console.log(`"${itemNum}" removed successfully.`);
            return result;
        } catch (err) {
            console.error('ItemNum removing:', err);
            return false;
        }
    }
}

module.exports = itemHasService;
