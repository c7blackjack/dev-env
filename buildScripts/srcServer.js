import express from 'express';
import path from 'path';
import open from'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';

/* eslint-disable no-console */

//Constant declarations for use below
const port = 3000;
const app = express();
const compiler = webpack(config);

//Adding webpack to app
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

//Sends initial start up page upon request
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../src/index.html'));
});

//Starts listening on port for req
app.listen(port, function(err) {
    if(err) {
        console.log(err);
    } else {
        open('http://localhost:' + port);
    }
})