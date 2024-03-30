const express = require('express');
const cors = require('cors');
const app = express();
const appService = require('./appservice');
const PORT = process.env.PORT || 3001;
const dbConnection = require('./database/dbConnection');

app.use(cors());
app.use(express.json());

const db = new dbConnection();

(async () => {
    try {
        await db.connect();
        console.log('Database connected successfully!');
    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1);
    }
})();

app.post('/insert-pokemon-caught', async (req, res) => {
    const {name, type1, type2, specialattack, caught_since, pid} = req.body;

    try {
        const insertResult = await appService.insertPokemon(name, type1, type2, specialattack, caught_since, pid, db);

        if (insertResult) {
            await db.executeQuery('commit');
            res.json({success: true});
        } else {
            res.status(500).json({success: false});
        }
    } catch (err) {
        console.error('Error inserting Pokemon:', err);
        res.status(500).json({ success: false });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// module.exports = router;
