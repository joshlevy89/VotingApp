var cors = require('cors')
var bodyParser = require('body-parser')
var mongo = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/VotingApp'
var express = require('express');
var app = express();
var http = require('http').Server(app)
var io = require('socket.io')(http)

var login_attempt = require('./login_attempt')
var try_add_poll = require('./try_add_poll')
var create_user = require('./create_user')
var cast_vote = require('./cast_vote')
var writein_vote = require('./writein_vote')
var try_delete_poll = require('./try_delete_poll')

app.use(cors()); // middleware that allows cross-platform requests
app.use(bodyParser.json());
var port = Number(process.env.PORT || 2999);

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

app.get('/test_route', function(req, res){
  res.status(200).json({ name: 'tobi' });
});

if (!module.parent) {
	http.listen(port, function () {
		console.log('Backend server listening at http://localhost:' + PORT);
	})
}

module.exports = http

