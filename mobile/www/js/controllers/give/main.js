'use strict';

angular.module('controllers.give', ['services.common.camera'])

.controller('GiveCtrl', [
	'Camera',
	'$ionicActionSheet',
	'$ionicModal',
	'$ionicLoading',
	'$ionicPopup',
	'$timeout',
	'$scope',
	'$state',
	'$stateParams',
	'Constants',
	'AuthService',
  function(Camera, $ionicActionSheet, $ionicModal, $ionicLoading, $ionicPopup, $timeout, $scope, $state, $stateParams, Constants, AuthService) {
		//show loading gif
		$ionicLoading.show({
	    	template: 'Loading Camera...'
	   	});

		$scope.pictures = [
			"http://placehold.it/100x100",
			"http://placehold.it/100x100",
			"http://placehold.it/100x100",
			"http://placehold.it/100x100"
		];

		$scope.takePicture = function(index) {
			 var options = {
					quality : 75,
					targetWidth: 200,
					targetHeight: 200,
					sourceType: 1
			 };

			 Camera.getPicture(options).then(function(imageData) {
					$scope.picture = imageData;
			 }, function(err) {
					console.log(err);
			 });
		};

		$scope.getPicture = function(index) {

      var options = {
         quality : 75,
         targetWidth: 200,
         targetHeight: 200,
         sourceType: 0
      };

      Camera.getPicture(options).then(function(imageData) {
         $scope.picture = imageData;;
      }, function(err) {
         console.log(err);
      });
   };

		$scope.updateUser = function(){
			if(Constants.DEBUGMODE){
				console.log("Update user : "+$scope.updateData);
			}

			$ionicLoading.show({
		    	template: 'Updating profile...'
		   	});

		    var success = function(response){
		    	$ionicLoading.hide();

		    	$scope.updateLoading('Update successful',function(){
		    		AuthService.updateUser($scope.user, {set: true});
		    		$scope.closeEdit(true);
		    	});
			}

			var error = function(error){
				$scope.updateLoading('Update Error, please try again '+error.message);
			}
			/*
				if image changed create a new image then destroy the other one
				then update the user's info
			*/
			AuthService.currentUser.update().then(success,error);
		}

		$scope.$on("$destroy", function() {
	  		if(Constants.DEBUGMODE){
	  			console.log('destroying ProfileCtrl');
	  		}


	    });

		$ionicLoading.hide();
}])
