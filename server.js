// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');


// Cors for cross origin allowance
app.use(cors());
app.use(express.static('website'));
// Initialize the main project folder

// Setup Server
const port = 3000;
app.listen(port,listening);
function listening(req,res){
    console.log(`server is running on localhost:${port}`);
}

//server GET method to send data to the client
app.get('/getData',getData);
function getData(req,res){
    res.send(projectData);
}

//server POST method to save data on the servers
app.post('/saveData',saveData);
function saveData(req,res){
    projectData = {...req.body};
    res.end();
}