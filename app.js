const express = require('express');
const bodyParser = require('body-parser');
const mongoFunctions = require('./db/mongoose');

const app = express();

app.use(bodyParser.json());

app.post('/items', mongoFunctions.createItem);

app.get('/items', mongoFunctions.getItems);

app.listen(4000);