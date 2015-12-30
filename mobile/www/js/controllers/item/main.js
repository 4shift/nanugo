'use strict';

angular.module('controllers.item', [])

.controller('ItemCtrl', [
	'$ionicModal',
	'$ionicLoading',
	'$ionicPopup',
	'$timeout',
	'$scope',
	'$state',
	'$stateParams',
	'Constants',
	'AuthService',
	function($ionicModal, $ionicLoading, $ionicPopup, $timeout, $scope, $state, $stateParams, Constants, AuthService) {
		//show loading gif
		$ionicLoading.show({
			template: 'Loading  postings...'
		});

		if(Constants.DEBUGMODE){
			console.log("ItemCtrl controller");
			console.log($stateParams);
		}


		$scope.$on("$destroy", function() {
			if(Constants.DEBUGMODE){
				console.log('destroying ProfileCtrl');
			}
		});

		$ionicLoading.hide();
}])
