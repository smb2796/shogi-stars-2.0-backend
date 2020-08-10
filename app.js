const express = require('express');
const bodyParser = require('body-parser');
const HttpError = require('./models/http-error');

const userRoutes = require('./routes/user-routes');
const gameRoutes = require('./routes/game-routes');


const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  
    next();
});

app.use('/api/user', userRoutes);
app.use('/api/game', gameRoutes);

app.use((req, res, next) => {
    const error = new HttpError('Route does not exist.', 404);
    throw error;
});

app.use((error, req, res, next) => {
    if(res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || 'Error occured'});
});



app.listen(5000);