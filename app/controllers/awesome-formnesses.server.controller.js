'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	AwesomeFormness = mongoose.model('AwesomeFormness'),
	_ = require('lodash');

/**
 * Create a Awesome formness
 */
exports.create = function(req, res) {
	var awesomeFormness = new AwesomeFormness(req.body);
	awesomeFormness.user = req.user;

	awesomeFormness.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(awesomeFormness);
		}
	});
};

/**
 * Show the current Awesome formness
 */
exports.read = function(req, res) {
	res.jsonp(req.awesomeFormness);
};

/**
 * Update a Awesome formness
 */
exports.update = function(req, res) {
	var awesomeFormness = req.awesomeFormness ;

	awesomeFormness = _.extend(awesomeFormness , req.body);

	awesomeFormness.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(awesomeFormness);
		}
	});
};

/**
 * Delete an Awesome formness
 */
exports.delete = function(req, res) {
	var awesomeFormness = req.awesomeFormness ;

	awesomeFormness.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(awesomeFormness);
		}
	});
};

/**
 * List of Awesome formnesses
 */
exports.list = function(req, res) { 
	AwesomeFormness.find().sort('-created').populate('user', 'displayName').exec(function(err, awesomeFormnesses) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(awesomeFormnesses);
		}
	});
};

/**
 * Awesome formness middleware
 */
exports.awesomeFormnessByID = function(req, res, next, id) { 
	AwesomeFormness.findById(id).populate('user', 'displayName').exec(function(err, awesomeFormness) {
		if (err) return next(err);
		if (! awesomeFormness) return next(new Error('Failed to load Awesome formness ' + id));
		req.awesomeFormness = awesomeFormness ;
		next();
	});
};

/**
 * Awesome formness authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.awesomeFormness.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
