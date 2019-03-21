//node's start point is here

//require the http global module
const http = require('http');

//require third-party packages
const express = require('express');

const app = express();
app.use((req, res, next) => {
    //This is a middleware
    //next(); allows the request to continue to the next middleware which can be defined
    //in another app.use

    //res.send();
});

const server = http.createServer(app);

//pass port 3000 for dev purposes but for deployment, would want to leave blank for default port 80
server.listen(3000);