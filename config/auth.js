var jwt = require('jsonwebtoken');
var passport = require("passport");
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

const mongoose = require('mongoose');
var jwtOptions = {
    
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'minhaChaveSecreta',
    passReqToCallback: true,

 }

module.exports = {
    get auth(){
        let User = mongoose.models.Usuario;

        var strategy = new JwtStrategy(jwtOptions,function(jwt_payload,next){
            User.findById(jwt_payload._id).exec()
            .then(user =>{
                    if(user){
                        next(null,user);
                    }else{
                        next(null,false);
                    }
            });
        });
        passport.use(strategy);
        return {
            initialize : function(){
                return passport.initialize();
            },
            get authenticate(){
                return passport.authenticate('jwt',{session:false});
            }
        }
    },

    login:function(name, pass,callback){
        var User = mongoose.models.Usuario;
        User.findOne({name,pass}).exec()
        .then(user =>{
            if(user){
                var payload = {_id : user._id};
                var token = jwt.sign(payload,jwtOptions.secreOrKey);
                callback({'message': 'ok',token});
            }else{
                callback(false);
            }
        })
    }
}