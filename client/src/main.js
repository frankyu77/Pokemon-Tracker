const pokemonService = require('../../server/tables/pokemonService');
const gameService = require('../../server/tables/gameService');
const peopleService = require('../../server/tables/peopleService');
const typeService = require('../../server/tables/typeService');
const trainerService = require('../../server/tables/trainerService');
const roleService = require('../../server/tables/roleService');
const regionService = require('../../server/tables/regionService');
const questService = require('../../server/tables/questService');
const gymService = require('../../server/tables/gymService');
const gymMasterService = require('../../server/tables/gymMasterService');
const itemHasService = require('../../server/tables/itemHasService');
const leadsToService = require('../../server/tables/leadsToService');
const NPC_livesInService = require('../../server/tables/NPC_livesInService');
const dbConnection = require('../../server/database/dbConnection');

async function test() {
    const dbManager = await new dbConnection();
    await dbManager.connect();
    //testing game
    const appServiceGame = new gameService(dbManager);
    await appServiceGame.insertGame(9, "Hard", "Ruby"); //works
    await appServiceGame.removeGame(9); // works

    // testing pokemonInsert
    //const appService = new pokemonService(dbManager);
    //await appService.insertPokemon("Pikachu Test", "water", "fire", "s", "2008-11-11", 26); //works
    //await appService.removePokemon("Pikachu Test"); //works

    // testing peopleService
    // const appServicePeople = new peopleService(dbManager);
    //await appServicePeople.insertPeople(27, 8); //works
    // await appServicePeople.removePeople(27); // works

    // testing typeService



    //testing trainerService

    //testing role_catch

    //testing region_apartOF

    //testing quest_Assigned

    //testing gym_includes


    //testing gymMaster_owns

    //testing items_has

    //testing leadsTo

    //testing NPC_livesIn






}
async function main() {
    console.log("main reached");
    await test();
}

main().catch(error => {
    console.error("An error occurred:", error);
});


