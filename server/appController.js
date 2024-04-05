const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;
const dbConnection = require('./database/dbConnection');

const PokemonService = require('./tables/pokemonService');
const GameService = require('./tables/gameService');
const GymMasterService = require('./tables/gymMasterService');
const GymService = require('./tables/gymService');
const ItemHasService = require('./tables/itemHasService');
const LeadsToService = require('./tables/leadsToService');
const NPC_LivesInService = require('./tables/NPC_livesInService');
const PeopleService = require('./tables/peopleService');
const QuestService = require('./tables/questService');
const RegionService = require('./tables/regionService');
const RoleService = require('./tables/roleService');
const TrainerService = require('./tables/trainerService');
const TypeService = require('./tables/typeService');

app.use(cors());
app.use(express.json());

const db = new dbConnection();
const pokemonService = new PokemonService(db);
const gameService = new GameService(db);
const gymMasterService = new GymMasterService(db);
const gymService = new GymService(db);
const itemHasService = new ItemHasService(db);
const leadsToService = new LeadsToService(db);
const NPC_livesInService = new NPC_LivesInService(db);
const peopleService = new PeopleService(db);
const questService = new QuestService(db);
const regionService = new RegionService(db);
const roleService = new RoleService(db);
const trainerService = new TrainerService(db);
const typeService = new TypeService(db);


(async () => {
    try {
        await db.connect();
        console.log('Database connected successfully!');
    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1);
    }
})();

app.post('/select-start', async (req, res) => {
    const { tableName } = req.body;

    try {
        const query = `SELECT * FROM ${tableName}`;
        console.log(query);

        const selectionResult = await db.executeQueryResult(query);

        // console.log(pokemonCaughtData);
        console.log("selectionResult = " + selectionResult);

        res.json({ success: true, data: selectionResult });
    } catch (error) {
        console.error('Error updating Pokemon region gym:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});


app.post('/selection', async (req, res) => {
    const { orClause, andClause } = req.body;
    let whereClause = "";
    if (orClause === "" && andClause != "") {
        whereClause = "WHERE " + andClause;
    } else if (orClause != "" && andClause === "") {
        whereClause = "WHERE " + orClause;
    } else {
        whereClause = "WHERE (" + orClause + ")" + " OR " + "(" + andClause + ")";
    }


    try {
        const query = `SELECT * FROM pokemon_caught ${whereClause}`;
        console.log(query);

        const selectionResult = await db.executeQueryResult(query);

        // console.log(pokemonCaughtData);
        console.log(selectionResult);

        res.json({ success: true, data: selectionResult });
    } catch (error) {
        console.error('Error fetching Pokémon caught data:', error);
        res.status(500).json({ success: false, error: error.message, message: error.message });
    }

});


app.post('/updateRegion', async (req, res) => {
    const { gameID, gymNum, regionName } = req.body;

    try {
        const updateResult = await regionService.updateRegionGYM(regionName, gameID, gymNum);
        res.json({ success: true, data: updateResult });
    } catch (error) {
        console.error('Error updating Pokemon region gym:', error);
        res.status(500).json({ success: false, error: 'Error updating Pokemon region gym TEST:', message: error.message });
    }
});

app.post('/insert', async (req, res) => {
    try {
        const sql = `INSERT INTO ${req.body.tableName} (${Object.keys(req.body.input).join(', ')})
                             VALUES (${Object.values(req.body.input).join(', ')})`;

        const insertResult = await db.executeQuery(sql);

        if (insertResult) {
            await db.executeQuery('commit');
            res.json({ success: true });
        }
        // else {
        //     res.status(500).json({ success: false, error: er });
        // }
    } catch (err) {
        console.error('Error inserting: ', err);
        res.status(500).json({ success: false, message: err.message});
    }
});

app.post('/remove', async (req, res) => {
    try {
        const sql = `DELETE FROM ${req.body.tableName} WHERE ${req.body.primaryKey} = ${req.body.input}`

        const insertResult = await db.executeQuery(sql);

        if (insertResult) {
            await db.executeQuery('commit');
            res.json({ success: true });
        } else {
            res.status(500).json({ success: false });
        }
    } catch (err) {
        console.error('Error removing: ', err);
        res.status(500).json({ success: false });
    }
});



app.post('/join-pokemon-people', async (req, res) => {
    const { commonAttribute } = req.body;

    try {
        console.log("asdf");
        const query = `SELECT * FROM pokemon_caught pc, people_has ph WHERE pc.${commonAttribute} = ph.${commonAttribute}`;
        const joinResult = await db.executeQueryResult(query);
        res.json({ success: true, data: joinResult });
        console.log('after success');
    } catch (error) {
        console.error('Error fetching Pokémon caught data:', error);
        res.status(500).json({ success: false, error: error.message, message: error.message });
    }
});

// -------------------------------------------------------------------------------------------------------PokemonService

app.post('/remove-pokemon-caught', async (req, res) => {
    const { name } = req.body;

    try {
        const insertResult = await pokemonService.removePokemon(name);

        if (insertResult) {
            const result = await db.executeQuery('commit');
            console.log("committed: " + result);
            res.json({ success: true });
        } else {
            res.status(500).json({ success: false });
        }
    } catch (err) {
        console.error('Error removing Pokemon:', err);
        res.status(500).json({ success: false });
    }
});


app.post('/projection', async (req, res) => {
    try {
        // Fetch data from the database
        const selectedFields = req.body.fields;
        const sqlQuery = `SELECT ${selectedFields} FROM ${req.body.tableName}`;

        queryData = await db.executeQueryResult(sqlQuery);
        console.log(queryData);

        // Send the fetched data as a JSON response
        res.json({ success: true, data: queryData });
    } catch (error) {
        // Handle errors
        console.error(`Error fetching ${req.body.tableName} data:, error`);
        res.status(500).json({ success: false, error: error.message, message: error.message});
    }
});


// -------------------------------------------------------------------------------------------------------PokemonService

// -------------------------------------------------------------------------------------------------------GameService
app.post('/add-game', async (req, res) => {
    const { gameID, difficulty, generation } = req.body;

    try {
        const insertResult = await gameService.insertGame(gameID, difficulty, generation);

        if (insertResult) {
            const result = await db.executeQuery('commit');
            console.log("committed: " + result);
            res.json({ success: true });
        } else {
            res.status(500).json({ success: false });
        }
    } catch (err) {
        console.error('Error inserting Game:', err);
        res.status(500).json({ success: false });
    }
});

app.post('/remove-game', async (req, res) => {
    const { gameID } = req.body;

    try {
        const insertResult = await gameService.removeGame(gameID);

        if (insertResult) {
            const result = await db.executeQuery('commit');
            console.log("committed: " + result);
            res.json({ success: true });
        } else {
            res.status(500).json({ success: false });
        }
    } catch (err) {
        console.error('Error removing Game:', err);
        res.status(500).json({ success: false });
    }
});

app.post('/game-all-roles', async (req, res) => {
    try {
        queryData = await gameService.gameWithAllRoles();
        console.log(queryData);

        // Send the fetched data as a JSON response
        res.json({ success: true, data: queryData });
    } catch (error) {
        // Handle errors
        console.error(`Error fetching game with least regions data:, error`);
        res.status(500).json({ success: false, error: error.message });
    }
});
// -------------------------------------------------------------------------------------------------------GameService

// -----------------------------------------------------------------------------------------------------GymMasterService
app.post('/add-gym-master', async (req, res) => {
    const { pid, name, badge, owns_since } = req.body;

    try {
        const insertResult = await gymMasterService.insertGymMasterService(pid, name, badge, owns_since);

        if (insertResult) {
            const result = await db.executeQuery('commit');
            console.log("committed: " + result);
            res.json({ success: true });
        } else {
            res.status(500).json({ success: false });
        }
    } catch (err) {
        console.error('Error inserting gym master:', err);
        res.status(500).json({ success: false });
    }
});

app.post('/remove-gym-master', async (req, res) => {
    const { pid } = req.body;

    try {
        const insertResult = await gymMasterService.removeGymMasterService(pid);

        if (insertResult) {
            const result = await db.executeQuery('commit');
            console.log("committed: " + result);
            res.json({ success: true });
        } else {
            res.status(500).json({ success: false });
        }
    } catch (err) {
        console.error('Error removing gym master:', err);
        res.status(500).json({ success: false });
    }
});
// -----------------------------------------------------------------------------------------------------GymMasterService

// -----------------------------------------------------------------------------------------------------GymService
app.post('/add-gym', async (req, res) => {
    const { gymNum, difficulty, type, gameID } = req.body;

    try {
        const insertResult = await gymService.insertGymService(gymNum, difficulty, type, gameID);

        if (insertResult) {
            const result = await db.executeQuery('commit');
            console.log("committed: " + result);
            res.json({ success: true });
        } else {
            res.status(500).json({ success: false });
        }
    } catch (err) {
        console.error('Error inserting gym:', err);
        res.status(500).json({ success: false });
    }
});

app.post('/remove-gym', async (req, res) => {
    const { gymNum } = req.body;

    try {
        const insertResult = await gymService.removeGymService(gymNum);

        if (insertResult) {
            const result = await db.executeQuery('commit');
            console.log("committed: " + result);
            res.json({ success: true });
        } else {
            res.status(500).json({ success: false });
        }
    } catch (err) {
        console.error('Error removing gym:', err);
        res.status(500).json({ success: false });
    }
});
// -----------------------------------------------------------------------------------------------------GymService

// -----------------------------------------------------------------------------------------------------ItemHasService
app.post('/add-item-has', async (req, res) => {
    const { itemNum, rarity, gameID, itemName } = req.body;

    try {
        const insertResult = await itemHasService.insertItemHas(itemNum, rarity, gameID, itemName);

        if (insertResult) {
            const result = await db.executeQuery('commit');
            console.log("committed: " + result);
            res.json({ success: true });
        } else {
            res.status(500).json({ success: false });
        }
    } catch (err) {
        console.error('Error inserting item:', err);
        res.status(500).json({ success: false });
    }
});

app.post('/remove-item-has', async (req, res) => {
    const { itemNum } = req.body;

    try {
        const insertResult = await itemHasService.removeItemHas(itemNum);

        if (insertResult) {
            const result = await db.executeQuery('commit');
            console.log("committed: " + result);
            res.json({ success: true });
        } else {
            res.status(500).json({ success: false });
        }
    } catch (err) {
        console.error('Error removing item:', err);
        res.status(500).json({ success: false });
    }
});
// -----------------------------------------------------------------------------------------------------ItemHasService

// -----------------------------------------------------------------------------------------------------LeadsToService
app.post('/add-leads-to', async (req, res) => {
    const { regionName, area } = req.body;

    try {
        const insertResult = await leadsToService.insertLeadsTo(regionName, area);

        if (insertResult) {
            const result = await db.executeQuery('commit');
            console.log("committed: " + result);
            res.json({ success: true });
        } else {
            res.status(500).json({ success: false });
        }
    } catch (err) {
        console.error('Error inserting leads to path:', err);
        res.status(500).json({ success: false });
    }
});

app.post('/remove-leads-to', async (req, res) => {
    const { regionName, area } = req.body;

    try {
        const insertResult = await leadsToService.insertLeadsTo(regionName, area);

        if (insertResult) {
            const result = await db.executeQuery('commit');
            console.log("committed: " + result);
            res.json({ success: true });
        } else {
            res.status(500).json({ success: false });
        }
    } catch (err) {
        console.error('Error removing leads to path:', err);
        res.status(500).json({ success: false });
    }
});
// -----------------------------------------------------------------------------------------------------LeadsToService

// --------------------------------------------------------------------------------------------------NPC_LIVESINSERVICE
app.post('/add-NPC-LivesIn', async (req, res) => {
    const { pid, name, role, region } = req.body;

    try {
        const insertResult = await NPC_livesInService.insertNPC(pid, name, role, region);

        if (insertResult) {
            const result = await db.executeQuery('commit');
            console.log("committed: " + result);
            res.json({ success: true });
        } else {
            res.status(500).json({ success: false });
        }
    } catch (err) {
        console.error('Error adding NPC:', err);
        res.status(500).json({ success: false });
    }
});

app.post('/remove-NPC-LivesIn', async (req, res) => {
    const { pid } = req.body;

    try {
        const insertResult = await NPC_livesInService.removeNPC(pid);

        if (insertResult) {
            const result = await db.executeQuery('commit');
            console.log("committed: " + result);
            res.json({ success: true });
        } else {
            res.status(500).json({ success: false });
        }
    } catch (err) {
        console.error('Error removing NPC:', err);
        res.status(500).json({ success: false });
    }
});
// --------------------------------------------------------------------------------------------------NPC_LIVESINSERVICE

// --------------------------------------------------------------------------------------------------PeopleService
app.post('/add-people', async (req, res) => {
    const { PID, GAMEID } = req.body;

    try {
        const insertResult = await peopleService.insertPeople(PID, GAMEID);

        if (insertResult) {
            const result = await db.executeQuery('commit');
            console.log("committed: " + result);
            res.json({ success: true });
        } else {
            res.status(500).json({ success: false });
        }
    } catch (err) {
        console.error('Error adding people:', err);
        res.status(500).json({ success: false });
    }
});

app.post('/remove-people', async (req, res) => {
    const { PID } = req.body;

    try {
        const insertResult = await peopleService.removePeople(PID);

        if (insertResult) {
            const result = await db.executeQuery('commit');
            console.log("committed: " + result);
            res.json({ success: true });
        } else {
            res.status(500).json({ success: false });
        }
    } catch (err) {
        console.error('Error removing people:', err);
        res.status(500).json({ success: false });
    }
});
// --------------------------------------------------------------------------------------------------PeopleService

// --------------------------------------------------------------------------------------------------QuestService
app.post('/add-quest', async (req, res) => {
    const { questID, difficulty, pid, date } = req.body;

    try {
        const insertResult = await questService.insertQuest(questID, difficulty, pid, date);

        if (insertResult) {
            const result = await db.executeQuery('commit');
            console.log("committed: " + result);
            res.json({ success: true });
        } else {
            res.status(500).json({ success: false });
        }
    } catch (err) {
        console.error('Error adding quest:', err);
        res.status(500).json({ success: false });
    }
});

app.post('/remove-quest', async (req, res) => {
    const { questID } = req.body;

    try {
        const insertResult = await questService.removeQuest(questID);

        if (insertResult) {
            const result = await db.executeQuery('commit');
            console.log("committed: " + result);
            res.json({ success: true });
        } else {
            res.status(500).json({ success: false });
        }
    } catch (err) {
        console.error('Error removing quest:', err);
        res.status(500).json({ success: false });
    }
});
// --------------------------------------------------------------------------------------------------QuestService

// --------------------------------------------------------------------------------------------------RegionService
app.post('/add-region', async (req, res) => {
    const { regionName, Type, gymNum, GameId } = req.body;

    try {
        const insertResult = await regionService.insertRegion(regionName, Type, gymNum, GameId);

        if (insertResult) {
            const result = await db.executeQuery('commit');
            console.log("committed: " + result);
            res.json({ success: true });
        } else {
            res.status(500).json({ success: false });
        }
    } catch (err) {
        console.error('Error adding region:', err);
        res.status(500).json({ success: false });
    }
});

app.post('/remove-region', async (req, res) => {
    const { regionName } = req.body;

    try {
        const insertResult = await regionService.removeRegion(regionName);

        if (insertResult) {
            const result = await db.executeQuery('commit');
            console.log("committed: " + result);
            res.json({ success: true });
        } else {
            res.status(500).json({ success: false });
        }
    } catch (err) {
        console.error('Error removing region:', err);
        res.status(500).json({ success: false });
    }
});

app.post('/average-region-count', async (req, res) => {
    try {
        queryData = await regionService.averageNumberOfRegionInAGame();
        console.log(queryData);

        // Send the fetched data as a JSON response
        res.json({ success: true, data: queryData });
    } catch (error) {
        // Handle errors
        console.error(`Error fetching average region count data:, error`);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/game-least-regions', async (req, res) => {
    try {
        queryData = await regionService.gameWithLeastRegions();
        console.log(queryData);

        // Send the fetched data as a JSON response
        res.json({ success: true, data: queryData });
    } catch (error) {
        // Handle errors
        console.error(`Error fetching game with least regions data:, error`);
        res.status(500).json({ success: false, error: error.message });
    }
});
// --------------------------------------------------------------------------------------------------RegionService

// --------------------------------------------------------------------------------------------------RoleService
app.post('/add-role', async (req, res) => {
    const { role, catchPhrase } = req.body;

    try {
        const insertResult = await roleService.insertRole(role, catchPhrase);

        if (insertResult) {
            const result = await db.executeQuery('commit');
            console.log("committed: " + result);
            res.json({ success: true });
        } else {
            res.status(500).json({ success: false });
        }
    } catch (err) {
        console.error('Error adding role:', err);
        res.status(500).json({ success: false });
    }
});

app.post('/remove-role', async (req, res) => {
    const { role } = req.body;

    try {
        const insertResult = await roleService.removeRole(role);

        if (insertResult) {
            const result = await db.executeQuery('commit');
            console.log("committed: " + result);
            res.json({ success: true });
        } else {
            res.status(500).json({ success: false });
        }
    } catch (err) {
        console.error('Error removing role:', err);
        res.status(500).json({ success: false });
    }
});
// --------------------------------------------------------------------------------------------------RoleService

// --------------------------------------------------------------------------------------------------TrainerService
app.post('/add-trainer', async (req, res) => {
    const { pid, name, favourite } = req.body;

    try {
        const insertResult = await trainerService.insertTrainer(pid, name, favourite);

        if (insertResult) {
            const result = await db.executeQuery('commit');
            console.log("committed: " + result);
            res.json({ success: true });
        } else {
            res.status(500).json({ success: false });
        }
    } catch (err) {
        console.error('Error adding trainer:', err);
        res.status(500).json({ success: false });
    }
});

app.post('/remove-trainer', async (req, res) => {
    const { pid } = req.body;

    try {
        const insertResult = await trainerService.removeTrainer(pid);

        if (insertResult) {
            const result = await db.executeQuery('commit');
            console.log("committed: " + result);
            res.json({ success: true });
        } else {
            res.status(500).json({ success: false });
        }
    } catch (err) {
        console.error('Error removing trainer:', err);
        res.status(500).json({ success: false });
    }
});
// --------------------------------------------------------------------------------------------------TrainerService

// --------------------------------------------------------------------------------------------------TypeService
app.post('/add-type', async (req, res) => {
    const { type, weakness } = req.body;

    try {
        const insertResult = await typeService.insertType(type, weakness);

        if (insertResult) {
            const result = await db.executeQuery('commit');
            console.log("committed: " + result);
            res.json({ success: true });
        } else {
            res.status(500).json({ success: false });
        }
    } catch (err) {
        console.error('Error adding type:', err);
        res.status(500).json({ success: false });
    }
});

app.post('/remove-type', async (req, res) => {
    const { type } = req.body;

    try {
        const insertResult = await typeService.removeType(type);

        if (insertResult) {
            const result = await db.executeQuery('commit');
            console.log("committed: " + result);
            res.json({ success: true });
        } else {
            res.status(500).json({ success: false });
        }
    } catch (err) {
        console.error('Error adding type:', err);
        res.status(500).json({ success: false });
    }
});

app.post('/type-most-popular', async (req, res) => {
    try {
        queryData = await typeService.mostPopularType();
        console.log(queryData);

        // Send the fetched data as a JSON response
        res.json({ success: true, data: queryData });
    } catch (error) {
        // Handle errors
        console.error(`Error fetching game with least regions data:, error`);
        res.status(500).json({ success: false, error: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// module.exports = router;
