const pokemonService = require('../../server/tables/pokemonService');
const gameService = require('../../server/tables/gameService');
const peopleService = require('../../server/tables/peopleService');
const dbConnection = require('../../server/database/dbConnection');

async function test() {
    const dbManager = await new dbConnection();
    await dbManager.connect();
    //testing game
    // const appServiceGame = new gameService(dbManager);
    //await appServiceGame.insertGame(9, "Hard", "Ruby"); //works
    // await appServiceGame.removeGame(9); // works

    // testing pokemonInsert
    //const appService = new pokemonService(dbManager);
    //await appService.insertPokemon("Pikachu Test", "type1", "type2", "s", null, "21");

    // testing peopleService
    // const appServicePeople = new peopleService(dbManager);
    //await appServicePeople.insertPeople(27, 8); //works
    // await appServicePeople.removePeople(27); // works



}
async function main() {
    await test();
}

main().catch(error => {
    console.error("An error occurred:", error);
});


