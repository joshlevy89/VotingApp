return module.exports = function(app, db,io) {
app.post('/WRITEIN_VOTE', function (req, res) {
	var polls = db.collection('polls')
	var pollId = req.body.pollId
	var writeinVote = req.body.writeinVote
	var email = req.body.email

	polls.find({id: pollId}).toArray(function(err,docs){
		if (err) throw err
		var poll = docs[0];
		// check whether user has voted on this poll
		// if hasn't, filter will return 0 matches
		if (email !== null) {// this is kind of stupid but fulfills the user story
							// ie only check if user has voted if the email is not null
							// this allows unauthenticated users to vote (but, has the 
							// unfortunate effect that they can vote unlimited # of times)
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
		}

		// check whether this poll contains this option already
		var optionMatches = poll.options.filter(function(option) {
			if (option.optionName === writeinVote) {
				return true
			}
		})
		if (optionMatches.length !== 0) {
			res.json({
				message: 'writein_option_already_exists'
			})
			return
		}

		// if hasn't voted yet and the option does not yet exist in the poll
		// add the option -- modifies options in place (maybe should do Object.assign)
		var new_option = {
			optionName: writeinVote,
			emails: [email]
		}
		poll.options.push(new_option)
		var updated_options = poll.options

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
			writeinVote: writeinVote,
			email: email
		}
		io.sockets.emit('receive_writein_vote', obj); 

		// send message that voting was successful
		// res.json({
		// message: 'poll_added_successfully'
		// })
	})
})
})
}

