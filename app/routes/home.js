const auth = require('../../config/auth').auth;

module.exports = function(app){
    var controllerHome = app.controllers.home;

    app.get('/',controllerHome.index);
    app.post('/',auth.authenticate,controllerHome.newItem);
    app.post('/login',controllerHome.login);

}