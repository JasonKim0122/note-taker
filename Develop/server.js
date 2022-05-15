const fs = require('fs');
const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3001;

//Instantiate the server
const app = express();

//Parse incoming string or array data
app.use(express.urlencoded({ extended: true}));

//Parse incoming JSON data
app.use(express.json());
app.use(express.static('public'));


const savedNotes = require('./db/db.json');


//HTML routes
app.get('/api/notes', (req, res) => {
    res.json(savedNotes.slice(1));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});













//app listen
app.listen(PORT, () => {
    console.log(`API server is live on port ${PORT}`);
});