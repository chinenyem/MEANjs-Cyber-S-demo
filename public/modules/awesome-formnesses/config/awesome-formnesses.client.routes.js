'use strict';

//Setting up route
angular.module('awesome-formnesses').config(['$stateProvider',
	function($stateProvider) {
		// Awesome formnesses state routing
		$stateProvider.
		state('form-team', {
			url: '/form-team',
			templateUrl: 'modules/awesome-formnesses/views/form-team.client.view.html'
		}).
		state('listAwesomeFormnesses', {
			url: '/awesome-formnesses',
			templateUrl: 'modules/awesome-formnesses/views/list-awesome-formnesses.client.view.html'
		}).
		state('createAwesomeFormness', {
			url: '/awesome-formnesses/create',
			templateUrl: 'modules/awesome-formnesses/views/create-awesome-formness.client.view.html'
		}).
		state('viewAwesomeFormness', {
			url: '/awesome-formnesses/:awesomeFormnessId',
			templateUrl: 'modules/awesome-formnesses/views/view-awesome-formness.client.view.html'
		}).
		state('editAwesomeFormness', {
			url: '/awesome-formnesses/:awesomeFormnessId/edit',
			templateUrl: 'modules/awesome-formnesses/views/edit-awesome-formness.client.view.html'
		});
	}
]);