return module.exports = function(app, db) {
app.post('/CREATE_USER', function (req, res) {
	console.log('hello')
	var users = db.collection('users')
	var email = req.body.email
	var password = req.body.password
	users.find({email: email}).toArray(function(err,docs){
		if (err) throw err
			// if email exists, don't insert document
		if (docs.length !== 0) {
			res.json('email_already_exists')
		}
		// if doesn't exist, insert it!
		else {
			users.insert({
				email: email,
				password: password
			})
			res.json('new_user_successfully_created')
		}
	})
})
}