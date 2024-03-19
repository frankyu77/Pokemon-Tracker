const express = require('express');
const appService = require('./appService');

const router = express.Router();
const serviceInstance = new appService('""');
router.post("/insert-pokemon-caught", async (req, res) =>){
    const {name, type1, type2, specialattack, caught_since, pid} = req.body;

    const insertResult = await appService.insertPokemon(name, type1, type2, specialattack, caught_since, pid);
}

module.exports = router;