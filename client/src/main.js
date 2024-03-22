const pokemonService = require('../../server/tables/pokemonService');
const dbConnection = require('../../server/database/dbConnection');

async function test() {
    const dbManager = await new dbConnection();
    await dbManager.connect();
    const appService = new pokemonService(dbManager);
    await appService.insertPokemon("Pikachu Test", "type1", "type2", "s", null, "21");
}
async function main() {
    await test();
}

main().catch(error => {
    console.error("An error occurred:", error);
});


