const pokemonService = require('../../server/tables/pokemonService');
const gameService = require('../../server/tables/gameService');
const dbConnection = require('../../server/database/dbConnection');

async function test() {
    const dbManager = await new dbConnection();
    await dbManager.connect();
    //testing game
    const appServiceGame = new gameService(dbManager);
    await appServiceGame.insertGame(9, "Hard", "Ruby");
    //await appServiceGame.removeGame(2);
    // testing pokemonInsert
    //const appService = new pokemonService(dbManager);
    //await appService.insertPokemon("Pikachu Test", "type1", "type2", "s", null, "21");


}
async function main() {
    await test();
}

main().catch(error => {
    console.error("An error occurred:", error);
});


