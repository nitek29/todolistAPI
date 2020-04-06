var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var urlencodedParser = bodyParser.urlencoded({extended: true});
let TodoController= require("../todolistControllers/todo");
let todolist = require("../todolist.js")


/**
 * This function comment is parsed by doctrine
 * @route GET /todo
 * @group todo - Operations about todo
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.get('/', TodoController.getAllTodos);
/**
 * This function comment is parsed by doctrine
 * @route GET /todo/{id}
 * @group todo - Operations about todo
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.get('/:id', TodoController.getTodo);
/**
 * This function comment is parsed by doctrine
 * @route POST /todo
 * @group todo - Operations about todo
 * @param {string} title.query.required - title - eg: homeworks
 * @param {string} dateBegin.query.required - 01/01/2020.
 * @param {string} dateEnd.query.required - 12/12/2020.
 * @param {string} statut.query.required - Non précisée.
 * @param {string} tags.query.required - School.
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.post('/', TodoController.addTodo);
/**
 * This function comment is parsed by doctrine
 * @route PUT /todo/{id}
 * @group todo - Operations about todo
 * @param {string} title.query.required - title - eg: homeworks
 * @param {string} dateBegin.query.required - 01/01/2020.
 * @param {string} dateEnd.query.required - 12/12/2020.
 * @param {string} statut.query.required - Non précisée.
 * @param {string} tags.query.required - School.
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.put('/:id', TodoController.updateTodo);
/**
 * This function comment is parsed by doctrine
 * @route DELETE /todo/{id}
 * @group todo - Operations about todo
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.delete('/:id', TodoController.deleteTodo);

module.exports = router;
