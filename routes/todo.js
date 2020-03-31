var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var urlencodedParser = bodyParser.urlencoded({extended: true});
let TodoController= require("../todolistControllers/todo");
let todolist = require("../todolist.js")



router.get('/', TodoController.getAllTodos);
router.get('/:id', TodoController.getTodo);
router.post('/', TodoController.addTodo);
router.put('/:id', TodoController.updateTodo);
router.delete('/:id', TodoController.deleteTodo);

module.exports = router;
