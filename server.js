var mongo = require('mongodb').MongoClient

var express = require('express');
var app = express();
var http = require('http').Server(app)
var io = require('socket.io')(http)
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer();
var path = require('path');
var publicPath = path.resolve(__dirname, 'public');


var login_attempt = require('./server/login_attempt')
var try_add_poll = require('./server/try_add_poll')
var create_user = require('./server/create_user')
var cast_vote = require('./server/cast_vote')
var writein_vote = require('./server/writein_vote')
var try_delete_poll = require('./server/try_delete_poll')
var isProduction = process.env.NODE_ENV === 'production';


var cors = require('cors');
var bodyParser = require('body-parser');
app.use(express.static(publicPath));
app.use(cors()); // middleware that allows cross-platform requests
app.use(bodyParser.json());
var port = Number(process.env.PORT || 3000);

if (isProduction) {
  var url = '  mongodb://joshlevy89:Born=1989@ds025449.mlab.com:25449/heroku_7ch8kj4k';
}
else {
  var url = 'mongodb://localhost:27017/VotingApp';
}
// Connect to Mongo on start
mongo.connect(url, function(err,db) {
if (err) throw err
login_attempt(app, db)
try_add_poll(app,db,io)
try_delete_poll(app,db,io)
create_user(app, db)
cast_vote(app, db,io)
writein_vote(app,db,io)

io.on('connection', function(socket) {
	var polls = db.collection('polls')
	polls.find({}).toArray(function(err,docs){
		if (err) throw err
		socket.emit('polls', docs);
	})
})
})

// We only want to run the workflow when not in production
if (!isProduction) {
  // Any requests to localhost:3000/build is proxied
  // to webpack-server
  app.all('/build/*', function (req, res) {
    proxy.web(req, res, {
        target: 'http://localhost:8080'
    });
  });
}

http.listen(port, function () {
	console.log('Backend server listening at http://localhost:' + port);
})

