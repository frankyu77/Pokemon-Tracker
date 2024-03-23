const pokemonService = require('../../server/tables/pokemonService');
const dbConnection = require('../../server/database/dbConnection');

async function test() {
    console.log("1");
    const dbManager = await new dbConnection();
    console.log("2");
    await dbManager.connect();
    console.log("3");
    const appService = new pokemonService(dbManager);
    await appService.insertPokemon("Pikachu Test", "type1", "type2", "s", null, "21");
}
async function main() {
    console.log("main reached");
    await test();
}

main().catch(error => {
    console.error("An error occurred:", error);
});


