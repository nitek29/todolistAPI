let todolist = require("../todolist.js");
const moment = require("moment")
class TodosController {
    /* On affiche la todolist et le formulaire */
    getAllTodos(req, res) {
        console.log("function get");
        let params = {};
        if (req.query.statut != undefined) {
            let statut = req.query.statut.split(',');
            params.statut = statut;
        }
        if (req.query.tags != undefined) {
            let tags = req.query.tags.split(',');
            params.tags = tags;
        }
        if (req.query.dateBegin != undefined) {
            let dateB = req.query.dateBegin;
            params.dateBegin = dateB;
        }
        if (req.query.dateEnd != undefined) {
            let dateE = req.query.dateEnd;
            params.dateEnd = dateE;
        }
        todolist.getAll(params).then(todo => {
            //res.render('todolist.ejs', {todolist: todo});
            return res.status(200).send(
                {
                    success: 'true',
                    message: 'todos retrieved successfully',
                    todolist: todo
                }
            )
        }).catch(e => {
            res.status(400).send({
                error: "error"
            })
        });

    }

    /* On affiche la todolist  */
    getTodo(req, res) {
        if (req.params.id != '') {
            todolist.get(req.params.id)
                .then(todo => {
                    return res.status(200).send(
                        {
                            success: 'true',
                            message: 'todo retrieved successfully',
                            todolist: todo
                        }
                    )
                }).catch(e => {
                console.log("erreur ");
                return res.status(404).send(
                    {
                        success: 'false',
                        message: 'todo does not exist',
                    });
            });
        }
    }

    /* On ajoute un élément à la todolist */
    addTodo(req, res) {
        console.log("Controller::addTodo ")
        console.log(req.body);
        if (!req.body.title) {
            console.log("erreur title");
            return res.status(400).send({
                success: 'false',
                message: 'title is required'
            });
        } else if (!req.body.dateBegin || !moment(req.body.dateBegin, "YYYY-MM-DD", true).isValid()) {
            console.log("erreur dateB");
            return res.status(400).send({
                success: 'false',
                message: 'date begin is required YYYY-MM-DD'
            });
        } else if (!req.body.dateEnd || !moment(req.body.dateEnd, "YYYY-MM-DD", true).isValid()) {
            console.log("erreur dateE");
            return res.status(400).send({
                success: 'false',
                message: 'date end is required YYYY-MM-DD'
            });
        } else if (!req.body.statut) {
            console.log("erreur statut");
            return res.status(400).send({
                success: 'false',
                message: 'statut is required'
            });
        } else if (!req.body.tags) {
            console.log("erreur tags");
            return res.status(400).send({
                success: 'false',
                message: 'tags is required'
            });
        }
        //myTodolist.push(todolist.add(JSON.stringify(req.body)));
        let todo = todolist.add(JSON.stringify(req.body));
        return res.status(201).send({
            success: 'true',
            message: 'todo added successfully',
            todo
        })

    }

    /* On affiche la todolist  */
    updateTodo(req, res) {
        if (req.params.id != '') {

            if (!req.body.title) {
                return res.status(400).send({
                    success: 'false',
                    message: 'title is required'
                });
            } else if (!req.body.dateBegin && moment(req.body.dateBegin, "YYYY-MM-DD", true).isValid()) {
                return res.status(400).send({
                    success: 'false',
                    message: 'date begin is required  YYYY-MM-DD'
                });
            } else if (!req.body.dateEnd && moment(req.body.dateEnd, "YYYY-MM-DD", true).isValid()) {
                return res.status(400).send({
                    success: 'false',
                    message: 'date end is required  YYYY-MM-DD'
                });
            } else if (!req.body.statut) {
                return res.status(400).send({
                    success: 'false',
                    message: 'statut is required'
                });
            } else if (!req.body.tags) {
                return res.status(400).send({
                    success: 'false',
                    message: 'tags is required'
                });
            }
            todolist.update(req.params.id, JSON.stringify(req.body))
                .then(todo => {
                    return res.status(201).send({
                        success: 'true',
                        message: 'todo added successfully',
                        todo
                    });
                }).catch(e => {
                return res.status(404).send({
                    success: 'false',
                    message: 'todo not found',
                });
            });

        }

    }

    /* Supprime un élément de la todolist */
    deleteTodo(req, res) {
        if (req.params.id != '') {
            todolist.delete(req.params.id).then(re => {
                return res.status(200).send({
                    success: 'true',
                    message: 'Todo deleted successfuly',
                });
            }).catch(e => {
                return res.status(404).send({
                    success: 'false',
                    message: 'todo not found',
                });
            })
        }
    }

    /*validate(){
        const {body} = require('express-validator/check');
        return [
            body('title', "Title doesn't exist").exists(),
            body('dateBegin','Invalid date. Format is 01/01/2020').exists().matches("/^\d{2}\/\d{2}-\/\d{4}$/"),
            body('dateEnd','Invalid date. Format is 01/01/2020').exists().matches("/^\d{2}\/\d{2}\/\d{4}$/"),
            body('statut', "Title doesn't exist").exists(),
            body('tags', "Title doesn't exist").exists()
        ]
    }*/
}

const todosController = new TodosController();
module.exports = todosController;

