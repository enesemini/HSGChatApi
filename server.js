var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;

app.set('port', port);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var chatHistory = [
    {
        author: "Enes Emini",
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
    chatHistory.push({message: req.body.message, author: req.body.author, date: req.body.date});
    //res.send(chatHistory);
    res.json({message: 'Nachricht ist erstellt'});
});

app.listen(app.get('port'), function(){
    console.log('HSG Chat API is running...');
});