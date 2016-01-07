'use strict';

angular.module('controllers.give', ['services.common.camera', 'ngCordova'])

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
	'CameraService',
	'Constants',
	'AuthService',
	'CloudinaryUploadService',
  function($cordovaCamera, $ionicActionSheet, $ionicModal, $ionicLoading, $ionicPopup, $timeout, $scope, $state, $stateParams, CameraService, Constants, AuthService, CloudinaryUploadService) {
		//show loading gif
		$ionicLoading.show({
			template: 'Loading Camera...'
		});

		$scope.images = [];
		$scope.lastImage = "";

		$scope.takePicture = function() {
			var options = {
				quality : 100,
				// destinationType : Camera.DestinationType.DATA_URL,
				sourceType : Camera.PictureSourceType.CAMERA,
				// allowEdit : true,
				// encodingType: Camera.EncodingType.JPEG,
				targetWidth: 640,
				targetHeight: 640,
				// popoverOptions: CameraPopoverOptions,
				saveToPhotoAlbum: false
			};

			CameraService.getPicture(options).then(function(imageData) {
				if (Constants.DEBUGMODE) {
					console.log("camera data: " + angular.toJson(imageData));
				}

				// $scope.images.push("data:image/jpeg;base64," + imageData);
				$scope.images.push(imageData);
				$scope.lastImage = imageData;
			}, function(err) {
				console.log(err);
			});
		};

		$scope.getPicture = function() {

			var options = {
				quality : 100,
				// destinationType : Camera.DestinationType.DATA_URL,
				sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
				// allowEdit : true,
				// encodingType: Camera.EncodingType.JPEG,
				targetWidth: 640,
				targetHeight: 640,
				// popoverOptions: CameraPopoverOptions,
				saveToPhotoAlbum: false
			};

			CameraService.getPicture(options).then(function(imageData) {
				$scope.images.push(imageData);
				$scope.lastImage = imageData;
			}, function(err) {
				console.log(err);
			});
		};

		$scope.uploadImages = function() {

			angular.forEach($scope.images, function(image) {
				CloudinaryUploadService.uploadImage(image).then(
					function(result) {
						alert(result);
					},
					function(err) {
						alert('file upload failed');
					}
				)
			});

			alert('file upload complted');
		}

		$scope.$on("$destroy", function() {
			if(Constants.DEBUGMODE){
				console.log('destroying ProfileCtrl');
			}


		});

		$ionicLoading.hide();
	}])
