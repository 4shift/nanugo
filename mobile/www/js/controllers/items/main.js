'use strict';

angular.module('controllers.items', ['services.models.collection', 'services.models.item'])

.controller('ItemsCtrl', [
	'ModelCollection',
	'ItemModel',
	'$ionicLoading',
	'$timeout',
	'$scope',
	'$state',
	'$stateParams',
	'Constants',
	'AuthService',
	function(ModelCollection, ItemModel, $ionicLoading, $timeout, $scope, $state, $stateParams, Constants, AuthService) {
		if(Constants.DEBUGMODE){
			console.log("ItemsCtrl controller");
			console.log($stateParams);
		}

	  // set a modelCollection with the userModel type
	  // this way the collection.get call will query api/users
		var modelCollection = new ModelCollection({
			model: ItemModel,
			busy: false,
			latestTop: true
		});

	  // binding the collection to the modelCollection.items array
	  // after fetching the items the collection will be updated
	  $scope.collection = modelCollection.items;

	  // loading items from the server
	  $scope.loadItems = function(params){
	  	return modelCollection.get(params);
	  }

	  // TODO not functional right now
	  $scope.loadPreviousItems = function(params){
	  	var _params = angular.extend(params,{
	  		prev: true
	  	})

	  	return modelCollection.get(params);
	  }

	  $ionicLoading.show({
		    template: 'Loading postings...'
		});

	  //loading and setting the collection
	  $scope.loadItems().then(function(response){
	    // close the loading overlay
	  	$ionicLoading.hide();
	  }, function(error){
	  	if(Constants.DEBUGMODE){
	  		console.log("ItemsCtrl couldn't fetch collection items");
	  	}

	    // close the loading overlay
	    $ionicLoading.hide();
	  });

	  $scope.$on("$destroy", function() {
	    // garbage collection destroy this object
	  	if(Constants.DEBUGMODE){
	  		console.log('destroying ItemsCtrl');
	  	}

	  	modelCollection = null;
	  });
}])
