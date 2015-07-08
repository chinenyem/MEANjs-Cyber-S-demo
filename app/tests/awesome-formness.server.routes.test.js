'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	AwesomeFormness = mongoose.model('AwesomeFormness'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, awesomeFormness;

/**
 * Awesome formness routes tests
 */
describe('Awesome formness CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Awesome formness
		user.save(function() {
			awesomeFormness = {
				name: 'Awesome formness Name'
			};

			done();
		});
	});

	it('should be able to save Awesome formness instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Awesome formness
				agent.post('/awesome-formnesses')
					.send(awesomeFormness)
					.expect(200)
					.end(function(awesomeFormnessSaveErr, awesomeFormnessSaveRes) {
						// Handle Awesome formness save error
						if (awesomeFormnessSaveErr) done(awesomeFormnessSaveErr);

						// Get a list of Awesome formnesses
						agent.get('/awesome-formnesses')
							.end(function(awesomeFormnessesGetErr, awesomeFormnessesGetRes) {
								// Handle Awesome formness save error
								if (awesomeFormnessesGetErr) done(awesomeFormnessesGetErr);

								// Get Awesome formnesses list
								var awesomeFormnesses = awesomeFormnessesGetRes.body;

								// Set assertions
								(awesomeFormnesses[0].user._id).should.equal(userId);
								(awesomeFormnesses[0].name).should.match('Awesome formness Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Awesome formness instance if not logged in', function(done) {
		agent.post('/awesome-formnesses')
			.send(awesomeFormness)
			.expect(401)
			.end(function(awesomeFormnessSaveErr, awesomeFormnessSaveRes) {
				// Call the assertion callback
				done(awesomeFormnessSaveErr);
			});
	});

	it('should not be able to save Awesome formness instance if no name is provided', function(done) {
		// Invalidate name field
		awesomeFormness.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Awesome formness
				agent.post('/awesome-formnesses')
					.send(awesomeFormness)
					.expect(400)
					.end(function(awesomeFormnessSaveErr, awesomeFormnessSaveRes) {
						// Set message assertion
						(awesomeFormnessSaveRes.body.message).should.match('Please fill Awesome formness name');
						
						// Handle Awesome formness save error
						done(awesomeFormnessSaveErr);
					});
			});
	});

	it('should be able to update Awesome formness instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Awesome formness
				agent.post('/awesome-formnesses')
					.send(awesomeFormness)
					.expect(200)
					.end(function(awesomeFormnessSaveErr, awesomeFormnessSaveRes) {
						// Handle Awesome formness save error
						if (awesomeFormnessSaveErr) done(awesomeFormnessSaveErr);

						// Update Awesome formness name
						awesomeFormness.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Awesome formness
						agent.put('/awesome-formnesses/' + awesomeFormnessSaveRes.body._id)
							.send(awesomeFormness)
							.expect(200)
							.end(function(awesomeFormnessUpdateErr, awesomeFormnessUpdateRes) {
								// Handle Awesome formness update error
								if (awesomeFormnessUpdateErr) done(awesomeFormnessUpdateErr);

								// Set assertions
								(awesomeFormnessUpdateRes.body._id).should.equal(awesomeFormnessSaveRes.body._id);
								(awesomeFormnessUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Awesome formnesses if not signed in', function(done) {
		// Create new Awesome formness model instance
		var awesomeFormnessObj = new AwesomeFormness(awesomeFormness);

		// Save the Awesome formness
		awesomeFormnessObj.save(function() {
			// Request Awesome formnesses
			request(app).get('/awesome-formnesses')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Awesome formness if not signed in', function(done) {
		// Create new Awesome formness model instance
		var awesomeFormnessObj = new AwesomeFormness(awesomeFormness);

		// Save the Awesome formness
		awesomeFormnessObj.save(function() {
			request(app).get('/awesome-formnesses/' + awesomeFormnessObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', awesomeFormness.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Awesome formness instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Awesome formness
				agent.post('/awesome-formnesses')
					.send(awesomeFormness)
					.expect(200)
					.end(function(awesomeFormnessSaveErr, awesomeFormnessSaveRes) {
						// Handle Awesome formness save error
						if (awesomeFormnessSaveErr) done(awesomeFormnessSaveErr);

						// Delete existing Awesome formness
						agent.delete('/awesome-formnesses/' + awesomeFormnessSaveRes.body._id)
							.send(awesomeFormness)
							.expect(200)
							.end(function(awesomeFormnessDeleteErr, awesomeFormnessDeleteRes) {
								// Handle Awesome formness error error
								if (awesomeFormnessDeleteErr) done(awesomeFormnessDeleteErr);

								// Set assertions
								(awesomeFormnessDeleteRes.body._id).should.equal(awesomeFormnessSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Awesome formness instance if not signed in', function(done) {
		// Set Awesome formness user 
		awesomeFormness.user = user;

		// Create new Awesome formness model instance
		var awesomeFormnessObj = new AwesomeFormness(awesomeFormness);

		// Save the Awesome formness
		awesomeFormnessObj.save(function() {
			// Try deleting Awesome formness
			request(app).delete('/awesome-formnesses/' + awesomeFormnessObj._id)
			.expect(401)
			.end(function(awesomeFormnessDeleteErr, awesomeFormnessDeleteRes) {
				// Set message assertion
				(awesomeFormnessDeleteRes.body.message).should.match('User is not logged in');

				// Handle Awesome formness error error
				done(awesomeFormnessDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		AwesomeFormness.remove().exec();
		done();
	});
});