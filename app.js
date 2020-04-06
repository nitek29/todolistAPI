var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('cookie-session'); // Charge le middleware de sessions
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var urlencodedParser = bodyParser.urlencoded({extended: true});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var todoRouter = require('./routes/todo');

let options = {
  swaggerDefinition: {
    info: {
      description: 'This is a sample server',
      title: 'Todolist',
      version: '1.0.0',
    },
    host: 'localhost:3000',
    basePath: '/api',
    produces: [
      "application/json",
      "application/xml"
    ],
    schemes: ['http']

  },
  basedir: __dirname, //app absolute path
  files: ['./routes/*.js'] //Path to the API handle folder
};


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
//app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* On utilise les sessions */
app.use(session({secret: 'todolistSecureCookie'}))

const expressSwagger = require('express-swagger-generator')(app);
expressSwagger(options)
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/todo', todoRouter);

//app.listen(8080);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
