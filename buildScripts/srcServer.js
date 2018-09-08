import express from 'express';
import path from 'path';
import open from'open';
/* eslint-disable no-console */

//Constant declarations for use below
const port = 3000;
const app = express();

//Sends initial start up page upon request
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.get('/users', function(req, res) {
    //Replace hardcode with actual database
    res.json([
        {"id": 1,"firstName":"Travis","lastName":"Barker","email":"travisbarker@misc.com"},
        {"id": 2,"firstName":"John","lastName":"Smith","email":"johnsmith@misc.com"},
        {"id": 3,"firstName":"Steve","lastName":"Nash","email":"stevenash@misc.com"},
        {"id": 4,"firstName":"Barbara","lastName":"Sorento","email":"barbarasorento@misc.com"}

    ]);
});

//Starts listening on port for req
app.listen(port, function(err) {
    if(err) {
        console.log(err);
    } else {
        open('http://localhost:' + port);
    }
})