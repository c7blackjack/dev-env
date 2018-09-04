//This file is not transpiled, must use CommonJS and ES5

//Register babel to transpile before our tests run.
require('babel-register')();

//Disable Webpack features that Mocha doesnt understand
require.extensions['.css'] = function(){};