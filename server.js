// Create an object to store data coming from the client
projectData = {};

// Import Express, Body-Parser, and CORS libraries
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create an Express app
const app = express();

// Set up Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Serve the front-end files from the main directory
app.use(express.static('website'));

// Start the server on port 8000
const port = 8000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

// Create a GET route to retrieve data
app.get('/all', (req, res) => {
    res.send(projectData);
});

// Create a POST route to save data coming from the front-end
app.post('/add', (req, res) => {
    projectData = {
        date: req.body.date,
        temp: req.body.temp,
        feel: req.body.feel
    };
    res.send(projectData);
});
