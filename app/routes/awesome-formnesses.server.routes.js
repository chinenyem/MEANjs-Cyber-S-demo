'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var awesomeFormnesses = require('../../app/controllers/awesome-formnesses.server.controller');

	// Awesome formnesses Routes
	app.route('/awesome-formnesses')
		.get(awesomeFormnesses.list)
		.post(users.requiresLogin, awesomeFormnesses.create);

	app.route('/awesome-formnesses/:awesomeFormnessId')
		.get(awesomeFormnesses.read)
		.put(users.requiresLogin, awesomeFormnesses.hasAuthorization, awesomeFormnesses.update)
		.delete(users.requiresLogin, awesomeFormnesses.hasAuthorization, awesomeFormnesses.delete);

	// Finish by binding the Awesome formness middleware
	app.param('awesomeFormnessId', awesomeFormnesses.awesomeFormnessByID);

	//upload Configuration
	var upload  = require('../../app/controllers/upload.server.controller');
 
 
	app.route('/upload/:filename')
		.get(upload.read);
	
	
	app.route('/upload')
		.post(upload.create);



};
