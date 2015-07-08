'use strict';

(function() {
	// Awesome formnesses Controller Spec
	describe('Awesome formnesses Controller Tests', function() {
		// Initialize global variables
		var AwesomeFormnessesController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Awesome formnesses controller.
			AwesomeFormnessesController = $controller('AwesomeFormnessesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Awesome formness object fetched from XHR', inject(function(AwesomeFormnesses) {
			// Create sample Awesome formness using the Awesome formnesses service
			var sampleAwesomeFormness = new AwesomeFormnesses({
				name: 'New Awesome formness'
			});

			// Create a sample Awesome formnesses array that includes the new Awesome formness
			var sampleAwesomeFormnesses = [sampleAwesomeFormness];

			// Set GET response
			$httpBackend.expectGET('awesome-formnesses').respond(sampleAwesomeFormnesses);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.awesomeFormnesses).toEqualData(sampleAwesomeFormnesses);
		}));

		it('$scope.findOne() should create an array with one Awesome formness object fetched from XHR using a awesomeFormnessId URL parameter', inject(function(AwesomeFormnesses) {
			// Define a sample Awesome formness object
			var sampleAwesomeFormness = new AwesomeFormnesses({
				name: 'New Awesome formness'
			});

			// Set the URL parameter
			$stateParams.awesomeFormnessId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/awesome-formnesses\/([0-9a-fA-F]{24})$/).respond(sampleAwesomeFormness);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.awesomeFormness).toEqualData(sampleAwesomeFormness);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(AwesomeFormnesses) {
			// Create a sample Awesome formness object
			var sampleAwesomeFormnessPostData = new AwesomeFormnesses({
				name: 'New Awesome formness'
			});

			// Create a sample Awesome formness response
			var sampleAwesomeFormnessResponse = new AwesomeFormnesses({
				_id: '525cf20451979dea2c000001',
				name: 'New Awesome formness'
			});

			// Fixture mock form input values
			scope.name = 'New Awesome formness';

			// Set POST response
			$httpBackend.expectPOST('awesome-formnesses', sampleAwesomeFormnessPostData).respond(sampleAwesomeFormnessResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Awesome formness was created
			expect($location.path()).toBe('/awesome-formnesses/' + sampleAwesomeFormnessResponse._id);
		}));

		it('$scope.update() should update a valid Awesome formness', inject(function(AwesomeFormnesses) {
			// Define a sample Awesome formness put data
			var sampleAwesomeFormnessPutData = new AwesomeFormnesses({
				_id: '525cf20451979dea2c000001',
				name: 'New Awesome formness'
			});

			// Mock Awesome formness in scope
			scope.awesomeFormness = sampleAwesomeFormnessPutData;

			// Set PUT response
			$httpBackend.expectPUT(/awesome-formnesses\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/awesome-formnesses/' + sampleAwesomeFormnessPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid awesomeFormnessId and remove the Awesome formness from the scope', inject(function(AwesomeFormnesses) {
			// Create new Awesome formness object
			var sampleAwesomeFormness = new AwesomeFormnesses({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Awesome formnesses array and include the Awesome formness
			scope.awesomeFormnesses = [sampleAwesomeFormness];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/awesome-formnesses\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleAwesomeFormness);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.awesomeFormnesses.length).toBe(0);
		}));
	});
}());