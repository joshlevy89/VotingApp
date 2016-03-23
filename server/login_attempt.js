return module.exports = function(app, db) {
app.post('/LOGIN_ATTEMPT', function (req, res) {
	var users = db.collection('users')
	var polls = db.collection('polls')
	var email = req.body.email
	var password = req.body.password
	users.find({email: email}).toArray(function(err,docs){
		if (err) throw err
			if (docs.length === 0) {
				res.json({
					message: 'no_such_email',
					pollsIds: null
				})
			}
			else if (docs[0].password === password) {
				polls.find({email: email}, { id: 1, _id:0 }).toArray(function(err,docs){
					var ids = docs.map(doc => doc.id)
					res.json({
						message: 'login_successful',
						pollIds: ids
					})
				})
			}
			else {
				res.json({
					message: 'email/password_mismatch',
					pollIds: null
				})
			}
		})
})
}
