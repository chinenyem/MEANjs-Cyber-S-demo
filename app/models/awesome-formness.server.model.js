'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Awesome formness Schema
 */
var AwesomeFormnessSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Awesome formness name',
		trim: true
	},
	identify_poc:{
		type: String,
		default: '',
		trim: true

	},
	describe_poc:{
		type: String,
		default: '',
		trim: true
	},
	sudo_code:{
		type: String,
		default: '',
		trim: true
	},
	upload_doc: {
		type: String,
		default: '',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('AwesomeFormness', AwesomeFormnessSchema);