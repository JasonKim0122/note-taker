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


//Function to create a new note and store it into an empty array
function newNote(body, notesArr) {
    const createNote = body;

    if (!Array.isArray(notesArr))
        notesArr = [];

    if (notesArr === 0)
        notesArr.push(0);

    body.id = notesArr[0];
    notesArr[0]++;

    notesArr.push(createNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArr, null, 1)
    );

    return createNote;
}

app.post('/api/notes', (req,res) => {
    const createNote = newNote(req.body, savedNotes);
    res.json(createNote);
});

//Delete function
function deleteSavedNote(id, notesArr) {
    for (let i = 0; i < notesArr.length; i++) {
        let savedNote = notesArr[i];

        if (savedNote.id == id) {
            notesArr.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, './db/db.json'),
                JSON.stringify(notesArr, null, 1)
            );

            break;
        }
    } 
};

app.delete('/api/notes/:id', (req, res) => {
    deleteSavedNote(req.params.id, savedNotes);
    res.json(true);
});

//app listen
app.listen(PORT, () => {
    console.log(`API server is live on port ${PORT}`);
});