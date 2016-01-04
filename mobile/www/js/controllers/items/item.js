'use strict';

angular.module('controllers.items.show', ['services.models.item'])

.controller('ItemCtrl', [
	'CtrlFilter',
	'ItemModel',
	'$ionicLoading',
	'$timeout',
	'$scope',
	'$state',
	'$stateParams',
	'Constants',
	function(CtrlFilter, ItemModel, $ionicLoading, $timeout, $scope, $state, $stateParams, Constants) {
		if (Constants.DEBUGMODE) {
			console.log("UserCtrl controller");
			console.log($stateParams);
		}

		// the data was preloaded in the CtrlFilter dependency
		// therefore we set profile to user.info after instantiating user
		var item = new ItemModel(CtrlFilter.params.model);

		$scope.item = item.info;

		if (Constants.DEBUGMODE) {
			console.log($scope.item);
		}

		$scope.$on("$destroy", function() {
  		if (Constants.DEBUGMODE) {
  			console.log('destroying UserCtrl');
  		}

  		item = null;
    });
}])
