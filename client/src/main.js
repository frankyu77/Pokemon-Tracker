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
const badgeService = require('../../server/tables/badgeService');
const difficultyService = require('../../server/tables/diificultyService');
const enterableAreasService = require('../../server/tables/enterableAreasService');

const dbConnection = require('../../server/database/dbConnection');


async function test() {
    const dbManager = await new dbConnection();
    await dbManager.connect();
    //testing game
    //const appServiceGame = new gameService(dbManager);
    // await appServiceGame.insertGame(9, "Hard", "Ruby"); //works
    // await appServiceGame.removeGame(9); // works

    // testing pokemonInsert
    //const appService = new pokemonService(dbManager);
    //await appService.insertPokemon("Pikachu Test", "water", "fire", "s", "2008-11-11", 26); //works
    //await appService.removePokemon("Pikachu Test"); //works

    // testing peopleService
    // const appServicePeople = new peopleService(dbManager);
    //await appServicePeople.insertPeople(27, 8); //works
    // await appServicePeople.removePeople(27); // works

    // testing typeService
    const appTypeService = new typeService(dbManager);
    //await appTypeService.insertType("FireTest", "Test");
    //await appTypeService.removeType("FireTest");

    //testing trainerService
    const appTrainerService = new trainerService(dbManager);
    //await appTrainerService.insertTrainer(25, "Test","Pikachu");
    //await appTrainerService.removeTrainer(25);

    //testing role_catch
    const appRoleService = new roleService(dbManager);
    //await appRoleService.insertRole("Test", "WOOO");
    //await appRoleService.removeRole("Test");

    //testing gym_includes
    const appGymService = new gymService(dbManager);
    //await appGymService.insertGymService(99, "Hard", "test", 8);
    //await appGymService.removeGymService(99);

    //testing region_apartOF
    const appRegionService = new regionService(dbManager);
    //await appRegionService.insertRegion("testing", "test", 99, 8);
    //await appRegionService.removeRegion("testing");

    //testing quest_Assigned
    const appQuestService = new questService(dbManager);
    //await appQuestService.insertQuest(29, "Hard", 25,"2008-11-11");
    //await appQuestService.removeQuest(29);


    //testing gymMaster_owns
    const appGymMasterService = new gymMasterService(dbManager);
    //await appGymMasterService.insertGymMasterService(25, "Test", "Marsh Badge");
    //await appGymMasterService.removeGymMasterService(25);

    //testing items_has
    const appItemHas = new itemHasService(dbManager);
    //await appItemHas.insertItemHas(20, "test", 8, "test");
    //await appItemHas.removeItemHas(20);

    //testing leadsTo
    const appLeadsTo = new leadsToService(dbManager);
    //await appLeadsTo.insertLeadsTo("testing", 0);
    //await appLeadsTo.removeLeadsTo("testing", 0);

    //testing NPC_livesIn
    const appNPCLives = new NPC_livesInService(dbManager);
    //await appNPCLives.insertNPC(25, "TEST", "Test", "testing");
    //await appNPCLives.removeNPC(25);

    //testing badgeService
    const appBadge = new badgeService(dbManager);
    //await appBadge.insertBadge("TESTING", 0, 0);
    //await appBadge.removeBadge("TESTING");

    //testing difficultyService
    const appDifficultyService = new difficultyService(dbManager);
    //await appDifficultyService.insertDifficulty("TEST", "TEST");
    //await appDifficultyService.removeDifficulty("TEST");

    //testing enterableAreasService
    const appEnterableAreas = new enterableAreasService(dbManager);
    //await appEnterableAreas.insertEnterableArea(50, "idk");
    //await appEnterableAreas.removeEnterableArea(50);

    //testing Division




    //Group By all one

    //Having

    //Nested group by




    //testing updateRegion
    //const appServiceRegion = new regionService(dbManager); // works
    //await appServiceRegion.updateRegionGYM('city', 8, 100); //works




}
async function main() {
    console.log("main reached");
    await test();
}

main().catch(error => {
    console.error("An error occurred:", error);
});


