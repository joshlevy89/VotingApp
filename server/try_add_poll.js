return module.exports = function(app, db,io) {
app.post('/TRY_ADD_POLL', function (req, res) {
	var polls = db.collection('polls')
	var id = req.body.id
	var pollName = req.body.pollName
	var email = req.body.email
	var options = req.body.options

	// find the max id in polls
	var maxDoc = polls.find().sort({id: -1}).limit(1).toArray(function(err,docs){
		if (err) throw err

		var maxId = 0; // if no docs
		if (docs.length !== 0) {
			maxId = docs[0].id
		}
		var curId = maxId + 1;

		polls.insert({
			id: curId,
			pollName: pollName,
			email: email,
			options: options
		}, function(err,data) {
		if (err) throw err

		// Emit new poll to all clients
		const obj = {
			poll: data.ops[0]
		}
		io.sockets.emit('add_poll', obj); 

		res.json({
		message: 'poll_added_successfully'
		})
	})
	})
})
}

