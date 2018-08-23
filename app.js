
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let swig = require('swig');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let mongoose = require('mongoose');
let blogUser = require("./models/user")




let adminRouter = require('./routes/admin');
let indexRouter = require('./routes/index');
let apiRouter = require('./routes/api');


let app = express();

// view engine setup
app.engine("html", swig.renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

swig.setDefaults({ cache: false });


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {
  req.userInfo={};

  if(req.cookies.userInfo){
    req.userInfo=req.cookies.userInfo;
  }
  next()
})




app.use('/admin', adminRouter);
app.use('/api', apiRouter);
app.use('/', indexRouter);


mongoose.connect("mongodb://127.0.0.1:27017/newBlog", { useNewUrlParser: true })



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
