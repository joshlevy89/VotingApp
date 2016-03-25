return module.exports = function(app, db,io) {
app.post('/TRY_DELETE_POLL', function (req, res) {
	var polls = db.collection('polls')
	var pollId = req.body.pollId
	var email = req.body.email

	// find the poll
	var poll = polls.find({'id': pollId}).toArray(function(err,docs) {
	// make sure that the user created this poll
	if (docs[0].email !== email) {
		res.json({
			message: 'user_did_not_create_this_poll'
		})
		return
	}

	// if user did make the poll, delete it
	polls.remove({'id': pollId})

	// emit id of successful deletion to all clients
	const obj = {
		pollId: pollId
	}
	io.sockets.emit('delete_poll', obj); 

	res.json({
	message: 'poll_deleted_successfully'
	})

	})
	})
}

