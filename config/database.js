const mongoose = require('mongoose');
module.exports = function(url){
    mongoose.connect(url,{
        useNewUrlParser: true
    });

    mongoose.connection.on('connected',function(){
        console.log('Mongoose conectado' + url);
    });

    mongoose.connection.on('disconnected',function(){
        console.log('Mongoose desconectado');
    });

    mongoose.connection.on('error',function(err){
        console.log('Mongoose Error connection',+err);
    });

    process.on('SIGINT',function(){
        mongoose.connection.close(function(){
            console.log('mongoose encerrado !');
            process.exit(0)
        });
    });
}
