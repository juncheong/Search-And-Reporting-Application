//node's start point is here

//require the http global module
const http = require('http');
const path = require('path');

//require third-party packages
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const mainRoutes = require('./routes/main');
const searchRoutes = require('./routes/search');
const apiRoutes = require('./routes/api');
const errorController = require('./controllers/error');

if (process.env.NODE_ENV !== 'development')
    process.env.NODE_ENV = 'production';
    
console.log("NODE_ENV: " + process.env.NODE_ENV);

//note: middleware orders do matter!
//another middleware by bodyParser. It calls next() once done
//app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); // application/json

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

//used to resolve CORS errors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(mainRoutes);
app.use(searchRoutes);
app.use('/api', apiRoutes);

app.use(errorController.get404);

//app.listen() automatically creates a server and sets it up to listen
//pass port 3000 for dev purposes but for deployment, would want to leave blank for default port 80
app.listen(process.env.PORT || 3000);