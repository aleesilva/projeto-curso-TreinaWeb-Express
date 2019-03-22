var login = require('../../config/auth').login;
module.exports = function(app){
    const Curso = app.models.curso
    var controller = {
        index: function(req,res){
            Curso.find({},[],{sort:{nome:1}}).exec()
            .then((cursos)=>{
                res.render('index',{cursos});
            })
            
        },
        newItem : function(req,res){
            var curso = new Curso(req.body);
            curso.save(function(err,curso){
                if(err){
                    res.status(500).end();
                    console.log(err)
                }else{
                    res.json(curso);
                }
            });
        },
        login : function(req,res){
            var name = req.body.name;
            var pass = req.body.password

            login(name,pass,function(result){
                if(result){
                    res.json(result);
                }else{
                    res.status(401).json({message:"erro de autenticaçao"})
                }
            })
        }
    }
    return controller;
}