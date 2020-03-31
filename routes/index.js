var express = require('express');
var router = express.Router();
const http = require('http')
let rest =require('../getJson.js');

/* GET home page. */
router.get('/', function (req, res, next) {
   /* let data;
    const options = {
        hostname: 'localhost',//3000
        port: 3000,
        path: '/api/todo',
        method: 'GET'
    }
    const r = http.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`);
        res.setEncoding('utf8');
        res.on('data', d => {
            data += d;
        });
        res.on("end", () => {
            data = JSON.parse(data.slice(9)).todolist
          next(data)
        })
    }).
    r.on('error', error => {
        console.error(error)
    })
    r.end(data =>{
      res.render('todolist.ejs', {todolist: data});
    })
  console.log(next)*/
  rest.getJSON({
    hostname: 'localhost',//3000
    port: 3000,
    path: '/api/todo',
    method: 'GET'
  }).then(({status, data}) => {
    console.log(data.todolist)
    res.render('todolist.ejs',{todolist:data.todolist});
  }, (error) => {
    next(error);
  });

});

module.exports = router;
