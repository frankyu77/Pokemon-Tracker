// const express = require('express');
// const app = express();
// const PORT = process.env.PORT || 3001; // Set the port to either the environment variable PORT or 5000
//
// // Define your routes or middleware here
// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });
//
// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: 'http://localhost:3000' }));

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
