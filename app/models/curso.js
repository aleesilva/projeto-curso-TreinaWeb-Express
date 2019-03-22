const mongoose = require('mongoose');


module.exports = function(){
    const schema =  mongoose.Schema({
        nome:{
            type:String,
            required: true,
            index : {
                unique:true
            }
        },
        categoria:{
            type:String,
            required: true
        }
    })
    return mongoose.model('curso',schema,'cursos');
}
