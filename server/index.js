const express = require('express');
const app = express();
const PORT = process.env.PORT || 5001; // Set the port to either the environment variable PORT or 5000

// Define your routes or middleware here
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
