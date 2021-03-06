const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const passport_fn = require('./module/passport_mongoose');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo')(session);





// Route configs
const index = require('./routes/index');
const users = require('./routes/users');
const admin = require('./routes/admin');
const info = require('./routes/info');
const download = require('./routes/download');
const url = require('./routes/url');
const view_f = require('./routes/view_f');
const batch = require('./routes/batch-admin');

const app = express();
// const io = require('socket.io').listen(server);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Configs
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(session({secret:'project-nyx',saveUninitialized: true,resave:true}));
// Due to cluster store sesion data on mongo db

var crypto = require("crypto");
var session_secret = crypto.randomBytes(16).toString('hex');
app.use(session({
    secret:session_secret,
    saveUninitialized: true,
    resave:true,
    store:new MongoStore({url:"mongodb://localhost:27017/project_nyx"}),
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use('/bower_components',express.static(path.join(__dirname, 'bower_components')));
app.use('/public',express.static(path.join(__dirname, 'public')));

// Routers
app.use('/', index);



app.use('/loginstatus',function (req,res) {
    if(req.isAuthenticated()){
        res.send('{"status": "success"}');
    }else{
        res.send('{"status": "fail"}');
    }

});

// Authentication middleware
app.use(function (req, res, next) {
    if(req.isAuthenticated()){return next();}
    req.flash('error'," Please sign-in !");
    res.redirect('/')
});

app.use(function(req,res,next){
   app.locals.currentUser = {
       'uname':req.session.passport.user.username,
       'role' :req.session.passport.user._id,
   };
   next();
});

app.use('/users', users);
app.use('/admin',admin);
app.use('/info',info);
app.use('/download',download);
app.use('/url',url);
app.use('/view_f', view_f);
app.use('/batch',batch);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
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


//socket
// io.on('connection', function(socket) {
//     console.log("userconnedted");
//     //socket.emit('announcements', { message: 'A new user has joined!' });
// });

module.exports = app;
