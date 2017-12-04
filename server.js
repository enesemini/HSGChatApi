var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;

app.set('port', port);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var chatHistory = [];

app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'DELETE');

    res.setHeader('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept');

    next();
});

app.get('/', function(req, res, next){
    res.json({message: 'Hallo API Benutzer...'});
});

app.get('/history', function(req, res, next){
    res.send(chatHistory);
});

app.post('/history', function(req, res, next){
    var date = new Date();

    console.log(req.body);
    chatHistory.push({message: req.body.message, nickname: req.body.nickname, date: date});
    res.send(chatHistory);

    res.json({message: 'Nachricht ist erstellt'});
});

app.listen(app.get('port'), function(){
    console.log('HSG Chat API is running...');
});