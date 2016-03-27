return module.exports = function(app, db,io) {
app.post('/CAST_VOTE', function (req, res) {
	var polls = db.collection('polls')
	var pollId = req.body.pollId
	var optionIndex = req.body.optionIndex
	var email = req.body.email

	polls.find({id: pollId}).toArray(function(err,docs){
		if (err) throw err
		var poll = docs[0];
		// check whether user has voted on this poll
		// if hasn't, filter will return 0 matches
 		var matches = poll.options.filter(function(option) {
			// will only return true if email found
			if (option.emails.indexOf(email) !== -1 ) { 
				return true
			}
		})
		if (matches.length !== 0) {
			res.json({
				message: 'user_already_voted_on_this_poll'
			})
			return
		}

		// if hasn't voted yet, inclue email in the poll
		// this modifies options in place; would be better to assign to new object
		var options = poll.options
		options[optionIndex].emails.push(email)
		var updated_options = options

		// update the poll with the new voter email list
		polls.update({
			id: pollId
		}, {
			$set: {
				options: updated_options 
			}
		}, function(err) {
		if (err) throw err

		const obj = {
			pollId: pollId,
			optionIndex: optionIndex,
			email: email
		}
		io.sockets.emit('receive_vote', obj); 

		// send message that voting was successful
		res.json({
		message: 'poll_added_successfully'
		})
	})
})
})
}

