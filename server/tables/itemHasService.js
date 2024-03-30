class itemHasService{
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async insertItemHas(itemNum, rarity, gameID, itemName) {
        const sql = 'INSERT INTO ITEMS_HAS VALUES(:1, :2, :3, :4)';
        const bindings = [itemNum, rarity, gameID, itemName];
        try {
            await this.db.executeQuery(sql, bindings);
            console.log(`ItemHas "${bindings}" inserted`);
        } catch (err) {
            console.error('Error inserting ItemHas:', err);
        }
    }

    async removeItemHas(itemNum) {
        const sql = 'DELETE FROM ITEMS_HAS WHERE ITEM# = :1';
        const bindings = [itemNum];
        try {
            await this.db.executeQuery(sql, bindings);
            console.log(`"${itemNum}" removed successfully.`);
        } catch (err) {
            console.error('ItemNum removing:', err);
        }
    }
}

module.exports = itemHasService;