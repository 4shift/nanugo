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
		$scope.uploaded_images = [];
		$scope.shared_item = {
			"title": "",
			"description": "",
			"location": "",
			"condition": "0",
			"price": 10,
			"department": "",
			"subcategory": "",
			"size_type": "",
			"first_image": "",
			"second_image": "",
			"third_image": "",
			"fourth_image": "",
			"latitude": "",
			"longitude": "",
			"delivers": []
		}

		$scope.categories = {
			"Women": [ "Clothing", "Accessories", "Shoes", "Jewelry", "Bags & Wallets", "Juniors' Clothing", "Other" ],
      "Men": [ "Clothing", "Accessories", "Shoes", "Jewelry", "Bags & Wallets", "Other" ],
      "Kids": [ "Girls' Clothing", "Boys' Clothing", "Girls' Accessories", "Boys' Accessories", "Girls' Shoes", "Boys' Shoes", "Activities & Toys", "Movies", "Books", "Video Games", "Other" ],
      "Baby": [ "Clothing & Accessories", "Strollers & Carriers", "Activities & Toys", "Bathing & Grooming", "Health & Safety", "Nursery", "Other" ],
      "Home": [ "Kitchen & Dining", "Bedding & Bath", "Appliances", "Furniture & Décor", "Luggage", "Pet Supplies", "Storage & Organization", "Lawn & Garden", "Patio", "Other" ],
      "Health & Beauty": [ "Bath & Body", "Personal Care", "Diet & Nutrition", "Cosmetics", "Fragrances", "Hair Care", "Other" ],
      "Sports & Outdoor": [ "Camping & Outdoor", "Exercise & Fitness", "Cycling", "Sports Equipment", "Coolers & Water Bottles", "Other" ],
      "Electronics & Games": [ "Audio & iPods", "Phones & Accessories", "Photo & Video Cameras", "Computers & Tablets", "TV & Home Theater", "Board Games", "Video Games", "Software", "Other" ],
      "Hobbies & DIY": [ "Arts & Crafts", "DIY & Kits", "Collectibles", "Sewing & Knitting", "Other" ],
      "Movies & Music": [ "Movies & TV", "CDs & Vinyl", "Musical Instruments", "Other" ],
      "Books": [ "Fiction", "Nonfiction", "Cookbooks", "Textbooks", "Other" ],
      "Unisex": [ "Clothing", "Accessories", "Shoes", "Jewelry", "Bags & Wallets", "Other" ],
      "Tools": [ "Power & Hand Tools", "Hardware", "Automotive", "Garden Tools", "Other" ]
    };

		$scope.subcategories = [];
		$scope.delivers = [
			{
				"text": "택배배송",
				"checked": false
			},
			{
				"text": "직접수령",
				"checked": false
			}
		];

		$scope.categoryChanged = function() {
			if (Constants.DEBUGMODE) {
				console.log($scope.shared_item.department)
			}

			angular.forEach($scope.categories, function(value, key) {
				if (key === $scope.shared_item.department) {
					$scope.subcategories = value;
				}
			});
		};

		$scope.takePicture = function() {
			var options = {
				quality : 100,
				// destinationType : Camera.DestinationType.DATA_URL,
				sourceType : Camera.PictureSourceType.CAMERA,
				allowEdit : true,
				// encodingType: Camera.EncodingType.JPEG,
				targetWidth: 640,
				targetHeight: 640,
				// popoverOptions: CameraPopoverOptions,
				saveToPhotoAlbum: false
			};

			CameraService.getPicture(options).then(function(imageData) {
				$scope.images.push(imageData);
			}, function(err) {
				console.log(err);
			});
		};

		$scope.getPicture = function() {

			var options = {
				quality : 100,
				// destinationType : Camera.DestinationType.DATA_URL,
				sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
				allowEdit : true,
				// encodingType: Camera.EncodingType.JPEG,
				targetWidth: 640,
				targetHeight: 640,
				// popoverOptions: CameraPopoverOptions,
				saveToPhotoAlbum: false
			};

			CameraService.getPicture(options).then(function(imageData) {
				$scope.images.push(imageData);
			}, function(err) {
				console.log(err);
			});
		};

		$scope.uploadImages = function() {

			angular.forEach($scope.images, function(image) {
				CloudinaryUploadService.uploadImage(image).then(
					function(result) {
						$scope.uploaded_images.push(result);
					},
					function(err) {
						alert('file upload failed');
					}
				)
			});

			alert('file upload complted');
		}

		$scope.submit = function() {
			console.log($scope.shared_item);
		}

		$scope.$on("$destroy", function() {
			if(Constants.DEBUGMODE){
				console.log('destroying ProfileCtrl');
			}
		});

		$ionicLoading.hide();
	}])
