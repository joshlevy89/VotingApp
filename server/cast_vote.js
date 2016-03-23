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
		var matches = poll.options.filter(option=>{
			// will only return true if email found
			if (option.emails.indexOf(email) !== -1 ) { 
				return true
			}
		})
		if (matches.length !== 0) {
			res.json({
				message: 'user_already_voted_on_this_poll'
			})
		}

		// if hasn't voted yet, inclue email in the poll
		console.log(optionIndex)
		console.log(poll.options[optionIndex])
		var updated_options = poll.options[optionIndex].emails.push(email)
		console.log(updated_options)

		updated_options = Object.assign({},poll,{
			options[optionIndex].emails: options[optionIndex].emails.push(email) // INVALID
		})
		console.log(updated_options)

		// update the poll with the new voter email list
		polls.update({
			id: pollId
		}, {
			$set: {
				options: updated_options 
			}
		}, function(err) {
		if (err) throw err

		// send message that voting was successful
		res.json({
			message: 'user_successfully_voted'
		})
		}
	)
})
})
}

