'use strict';

// Awesome formnesses controller
angular.module('awesome-formnesses').controller('AwesomeFormnessesController', function($scope, $stateParams, $location, Upload, $log, $http, $rootScope, Authentication, AwesomeFormnesses) {
		$scope.authentication = Authentication;


			// //file upload
			//  Upload.upload({
   //              url: '/serverRouteUrl', //upload.php script, node.js route, etc..
   //              method: 'POST', //Post or Put
   //              headers: {'Content-Type': 'multipart/form-data'},
   //              //withCredentials: true,
   //              data: JsonObject, //from data to send along with the file
   //              file: blob, // or list of files ($files) for html5 only
   //              //fileName: 'photo' // to modify the name of the file(s)                
   //          }).success(function (response, status) {
   //                 //success 
   //              }
   //          ).error(function (err) {
   //                 //error
   //              }
   //          );

			$scope.$watch('files', function() {  
    			$scope.upload = Upload.upload($scope.files);
  			});

			//array of choices
            $scope.items = [{ choice:"Service 1"}, { choice:"Service 2"}, { choice: "Service 3"}, { choice:"Service 4"}];
	
			
			$scope.create = function() {
			// Create new Awesome formness object
			var awesomeFormness = new AwesomeFormnesses ({
				name: this.name,
				describe_poc:  this.describe_poc,
				identify_poc:  $scope.item.choice,
				sudo_code: this.sudo_code,
				upload_doc: this.upload_doc
			});
			// Redirect after save
			awesomeFormness.$save(function(response) {
				$location.path('awesome-formnesses/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Awesome formness
		$scope.remove = function(awesomeFormness) {
			if ( awesomeFormness ) { 
				awesomeFormness.$remove();

				for (var i in $scope.awesomeFormnesses) {
					if ($scope.awesomeFormnesses [i] === awesomeFormness) {
						$scope.awesomeFormnesses.splice(i, 1);
					}
				}
			} else {
				$scope.awesomeFormness.$remove(function() {
					$location.path('awesome-formnesses');
				});
			}
		};

		// Update existing Awesome formness
		$scope.update = function() {
			var awesomeFormness = $scope.awesomeFormness;

			awesomeFormness.$update(function() {
				$location.path('awesome-formnesses/' + awesomeFormness._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Awesome formnesses
		$scope.find = function() {
			$scope.awesomeFormnesses = AwesomeFormnesses.query();
		};

		// Find existing Awesome formness
		$scope.findOne = function() {
			$scope.awesomeFormness = AwesomeFormnesses.get({ 
				awesomeFormnessId: $stateParams.awesomeFormnessId
			});
		};
	}
);