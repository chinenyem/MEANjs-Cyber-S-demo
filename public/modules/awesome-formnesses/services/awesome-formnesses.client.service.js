'use strict';

//Awesome formnesses service used to communicate Awesome formnesses REST endpoints
angular.module('awesome-formnesses').factory('AwesomeFormnesses', ['$resource',
	function($resource) {
		return $resource('awesome-formnesses/:awesomeFormnessId', { awesomeFormnessId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);