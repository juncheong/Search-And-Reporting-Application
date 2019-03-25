//node's start point is here

//require the http global module
const http = require('http');
const path = require('path');

//require third-party packages
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const mainRoutes = require('./routes/main')

//note: middleware orders do matter!
//another middleware by bodyParser. It calls next() once done
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(mainRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

//app.listen() automatically creates a server and sets it up to listen
//pass port 3000 for dev purposes but for deployment, would want to leave blank for default port 80
app.listen(process.env.PORT || 3000);