const express = require('express');
const load = require('express-load');
const bodyParse = require('body-parser');

const auth = require('./auth').auth;

module.exports = function(){
    var app = express();
    app.set('view engine','ejs');
    app.set('views','./app/views')
    app.set('port',3000);
    app.use(express.static('./public'));
    // app.use(auth.initialize);
    app.use(bodyParse.json());
    load('models',{ cwd : 'app'} )
    .then('controllers')
    .then('routes')
    .into(app);
    return app;
}