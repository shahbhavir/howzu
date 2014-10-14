var express = require('express'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    http = require('http'),
    path = require('path'),
    io = require('socket.io'),
    mongoose = require('mongoose'),
    app = express(),
    db,
    userRoutes,
    socketIO;

/* DB connection */
mongoose.connect('mongodb://localhost:27017/quizz');
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('db connected');
});

/*Express App config*/
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

http = http.Server(app);
io = io(http);

/*Routes for our application*/
indexRoutes = require('./routes/index')(app);
userRoutes = require('./routes/users')(app);

/*Socket IO connection for our application*/
socketIO = require('./socketIO')(app, io);

http.listen(3000, function(){
  console.log('listening on *:3000');
});