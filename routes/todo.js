var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var urlencodedParser = bodyParser.urlencoded({extended: true});

let todolist = require("../todolist.js")
let myTodolist;


/* S'il n'y a pas de todolist dans la session,
on en crée une vide sous forme d'array avant la suite */
router.use(function (req, res, next) {
    if (typeof (myTodolist) == 'undefined') {
        myTodolist = [];
    }
    next();
})

    /* On affiche la todolist et le formulaire */
    .get('/', function (req, res) {
        console.log("function get");
        let params={};
        console.log(req.query.statut)
        if (req.query.statut!=undefined){
            let statut=req.query.statut.split(',');
            params.statut=statut;
        }
        if (req.query.tags!=undefined){
            let tags = req.query.tags.split(',');
            params.tags=tags;
        }
        todolist.getAll(params).then(todo=>{
            res.render('todolistv2.ejs', {todolist: todo});
        });

    })
    /* On affiche la todolist  */
    .get('/:id', function (req, res) {
        if (req.params.id != '') {
            todolist.get(req.params.id, myTodolist)
                .then(todo => {
                    res.send(todo);
                }).catch(e => {
                console.log("erreur ");
                res.render('todolistv2.ejs')
            });
        }
    })

    /* On ajoute un élément à la todolist */
    .post('/', urlencodedParser, function (req, res) {
        //myTodolist.push(todolist.add(JSON.stringify(req.body)));
        let r=todolist.add(JSON.stringify(req.body))
        console.log(r);
        res.send(r);
    })

    /* On affiche la todolist  */
    .put('/:id', function (req, res) {
        if (req.params.id != '') {
            console.log(req.body.value)
            todolist.update(req.params.id, myTodolist, JSON.stringify(req.body))
                .then(resu => {
                    console.log(JSON.stringify(resu));
                    res.send(resu)
                }).catch(e => {
                console.log(e);
                res.send(e)
            });
        }
    })

    /* Supprime un élément de la todolist */
    .delete('/:id', function (req, res) {
        if (req.params.id != '') {
            todolist.delete(req.params.id, myTodolist).then(re => {
                console.log(re);
                res.send(re)
            }).catch(e => {
                console.log(e);
                res.send(e)
            })
        }
    })

    /* On redirige vers la todolist si la page demandée n'est pas trouvée */
    .use(function (req, res, next) {
        res.redirect('/');
    })

module.exports = router;
/*
let myjson = '{"id":1,"title": "test","dateBegin": "20/03/2018","dateEnd": "11/04/2018","statut": "En cours","tags": "travail"}'
let mytache=todolist.add(myjson);
let myTodolist=[];
myTodolist.push(mytache)
todolist.get(mytache.id,myTodolist)
let myjsonUpd = '{"id":1,"title": "test1","dateBegin": "20/03/2018","dateEnd": "11/04/2018","statut": "En cours","tags": "travail"}'

todolist.update(mytache.id,myTodolist,myjsonUpd)
todolist.delete(mytache.id,myTodolist)
*/