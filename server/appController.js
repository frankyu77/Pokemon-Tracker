const express = require('express');
const cors = require('cors');
const appService = require('./appservice');

const router = express.Router();
const serviceInstance = new appService('""');

router.use(cors({ origin: 'http://localhost:3000' }));
router.post('/insert-pokemon-caught', async (req, res) => {
    const {name, type1, type2, specialattack, caught_since, pid} = req.body;

    const insertResult = await appService.insertPokemon(name, type1, type2, specialattack, caught_since, pid);

    if (insertResult) {
        res.json({success:true});
    } else  {
        res.status(500).json({succes:false});
    }
});

module.exports = router;
