'use strict';

// Configuring the Articles module
angular.module('awesome-formnesses').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Awesome formnesses', 'awesome-formnesses', 'dropdown', '/awesome-formnesses(/create)?');
		Menus.addSubMenuItem('topbar', 'awesome-formnesses', 'List Awesome formnesses', 'awesome-formnesses');
		Menus.addSubMenuItem('topbar', 'awesome-formnesses', 'New Awesome formness', 'awesome-formnesses/create');
	}
]);