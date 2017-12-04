var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;

app.set('port', port);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var chatHistory = [
    posts: [
        {
            'date': 'Mon Dec 04 2017 12:31:12 GMT+0100 (CET)',
            'author': 'Enes Emini',
            'message': 'Test Message 1 retrieved from API'
        },
        {
            'date': 'Mon Dec 04 2017 12:31:12 GMT+0100 (CET)',
            'author': 'Flavian',
            'message': 'Test Message 2 retrieved from API'
        }
    ]
];

app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'DELETE');

    res.setHeader('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept');

    next();
});

app.get('/', function(req, res, next){
    res.json({message: 'Hallo API Benutzer...'});
});

app.get('/posts', function(req, res, next){
    res.send(chatHistory);
});

app.post('/posts', function(req, res, next){
    var date = new Date();
    console.log(req.body);
    chatHistory.push({message: req.body.message, nickname: req.body.nickname, date: date});
    res.send(chatHistory);

    res.json({message: 'Nachricht ist erstellt'});
});

app.listen(app.get('port'), function(){
    console.log('HSG Chat API is running...');
});