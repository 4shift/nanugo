'use strict';

angular.module('controllers.give', ['ngCordova.plugins.camera'])

.controller('GiveCtrl', [
	'$cordovaCamera',
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
  function($cordovaCamera, $ionicActionSheet, $ionicModal, $ionicLoading, $ionicPopup, $timeout, $scope, $state, $stateParams, Constants, AuthService) {
		//show loading gif
		$ionicLoading.show({
	    	template: 'Loading Camera...'
	   	});

		$scope.updateLoading = function(msg,cb){
			$ionicLoading.show({
		    	template: msg
		   	});

			$timeout(function() {
				$ionicLoading.hide();
				if(typeof cb === 'function'){
					cb();
				}
			}, 2000);
		}

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
