var express = require('express');
var router = express.Router();
const http = require('http')
let rest = require('../helpers/getJson.js');

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log(req.originalUrl.substring(1))
    rest.getJSON({
        hostname: 'localhost',//3000
        port: 3000,
        path: '/api/todo' + req.originalUrl.substring(1),
        method: 'GET',
    }).then(({status, data}) => {
        console.log(data.todolist)
        res.render('todolist.ejs', {todolist: data.todolist});
    }, (error) => {
        next(error);
    });

});
router.post('/', function (req, res, next) {
    let data = JSON.stringify(req.body)
    let options = {
        hostname: 'localhost',//3000
        port: 3000,
        path: '/api/todo',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }
    const r = http.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)

        res.on('data', d => {
            process.stdout.write(d)
        })
    })

    r.on('error', error => {
        console.error(error)
    })

    r.write(data)
    r.end()
    res.redirect('/')
});
module.exports = router;
