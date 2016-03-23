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
//var cast_vote = require('./cast_vote')


app.use(cors()); // middleware that allows cross-platform requests
app.use(bodyParser.json());
const PORT = 2999;

// Connect to Mongo on start
mongo.connect(url, function(err,db) {
if (err) throw err
login_attempt(app, db)
try_add_poll(app,db,io)
create_user(app, db)
//cast_vote(app, db)

io.on('connection', function(socket) {
	var polls = db.collection('polls')
	polls.find({}).toArray(function(err,docs){
		if (err) throw err
		socket.emit('polls', docs);
	})
})

})

http.listen(PORT, function () {
	console.log('Backend server listening at http://localhost:' + PORT);
})


