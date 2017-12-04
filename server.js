var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var port = process.env.PORT || 3000;
var io = require('socket.io')(http);

app.set('port', port);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var chatHistory = [
    {
        author: "Enes Emini",
        userId: "Enes",
        message: "Test Message retrieved from API",
        date: new Date()
    }
];

app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    next();
});

app.get('/', function(req, res, next){
    res.json({message: 'Hallo API Benutzer...'});
});

app.get('/posts', function(req, res, next){
    res.send(chatHistory);
});

app.post('/posts', function(req, res, next){
    console.log(req.body);
    chatHistory.push({message: req.body.message, author: req.body.author, date: req.body.date, userId: req.body.userId});
    //res.send(chatHistory);
    res.json({message: 'API: Nachricht wurde erfolgreich erstellt.'});
});

app.listen(app.get('port'), function(){
    console.log('HSG Chat API is running...');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});