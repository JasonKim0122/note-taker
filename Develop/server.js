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