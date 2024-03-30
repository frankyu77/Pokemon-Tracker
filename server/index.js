const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// Define your routes or middleware here
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
