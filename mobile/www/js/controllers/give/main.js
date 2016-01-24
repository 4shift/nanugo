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
	'ItemModel',
	'CloudinaryUploadService',
  function($cordovaCamera, $ionicActionSheet, $ionicModal, $ionicLoading, $ionicPopup, $timeout, $scope, $state, $stateParams, CameraService, Constants, ItemModel, CloudinaryUploadService) {
		//show loading gif
		$ionicLoading.show({
			template: '카메라 불러오는 중...'
		});

		$scope.images = [];
		$scope.uploaded_images = [];
		$scope.item = {
			"title": "",
			"description": "",
			"location": "",
			"condition": "",
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
			"fulfillments": [
				{
					"text": "택배배송",
					"checked": false
				},
				{
					"text": "직접수령",
					"checked": false
				}
			],
			"uploaded_images": []
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
		$scope.conditions = {
			"신품": "brand",
			"거의신품": "almost",
			"중고": "used",
			"고장/깨짐": "broken"
		}

		$scope.categoryChanged = function() {
			if (Constants.DEBUGMODE) {
				console.log($scope.item.department)
			}

			angular.forEach($scope.categories, function(value, key) {
				if (key === $scope.item.department) {
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
			$ionicLoading.show({
				template: '이미지 업로드 중...'
			});

			var result = true;

			angular.forEach($scope.images, function(image) {
				CloudinaryUploadService.uploadImage(image).then(
					function(result) {
						$scope.item.uploaded_images.push(result);
					},
					function(err) {
						result = false;
					}
				)
			});

			$ionicLoading.hide();

			return result;
		}

		$scope.submit = function() {
			if ($scope.uploadImages) {

				$ionicLoading.show({
					template: '사용자 데이터 업로드 중...'
				});

				if (Constants.DEBUGMODE) {
					console.log($scope.item);
				}

				var itemModel = new ItemModel($scope.item);
				itemModel.create().then(
					function(result) {
						console.log('success');
					},
					function(err) {
						console.log('error');
					}
				);

				$ionicLoading.hide();
			} else {
				// 이미지 파일 업로드에 문제가 있어서 데이터를 저장하지 못함
				// Started POST "/v1/items" for 127.0.0.1 at 2016-01-14 11:06:00 +0900
				// Value for params[:item][:uploaded_images] was set to nil, because it was one of [], [null] or [null, null, ...]. Go to http://guides.rubyonrails.org/security.html#unsafe-query-generation for more information.
				// Processing by V1::ItemsController#create as JSON
				//   Parameters: {"item"=>{"title"=>"asdfasdfasd", "description"=>"fasdfasdfadf", "location"=>{"address_components"=>[{"long_name"=>"판교로", "short_name"=>"판교로", "types"=>["sublocality_level_4", "sublocality", "political"]}, {"long_name"=>"분당구", "short_name"=>"분당구", "types"=>["sublocality_level_1", "sublocality", "political"]}, {"long_name"=>"성남시", "short_name"=>"성남시", "types"=>["locality", "political"]}, {"long_name"=>"경기도", "short_name"=>"경기도", "types"=>["administrative_area_level_1", "political"]}, {"long_name"=>"대한민국", "short_name"=>"KR", "types"=>["country", "political"]}], "formatted_address"=>"대한민국 경기도 성남시 분당구 판교로", "geometry"=>{"bounds"=>{"south"=>37.3877838, "west"=>127.08486370000003, "north"=>37.4068202, "east"=>127.15962830000001}, "location"=>{"lat"=>37.3985507, "lng"=>127.1068146}, "location_type"=>"APPROXIMATE", "viewport"=>{"south"=>37.3877838, "west"=>127.08486370000003, "north"=>37.4068202, "east"=>127.15962830000001}}, "place_id"=>"ChIJx4FIk_6nfDUR-8hqVjIv2zA", "types"=>["sublocality_level_4", "sublocality", "political"]}, "condition"=>"brand", "price"=>10, "department"=>"Women", "subcategory"=>"Clothing", "size_type"=>"", "first_image"=>"", "second_image"=>"", "third_image"=>"", "fourth_image"=>"", "latitude"=>"", "longitude"=>"", "fulfillments"=>[{"text"=>"택배배송", "checked"=>true}, {"text"=>"직접수령", "checked"=>false}], "uploaded_images"=>nil}}
				// Unpermitted parameters: description, location, fulfillments, uploaded_images
				// Unpermitted parameters: description, location, fulfillments, uploaded_images
				//    (0.1ms)  BEGIN
				//   SQL (2.2ms)  INSERT INTO "items" ("title", "department", "subcategory", "size_type", "price", "first_image", "second_image", "third_image", "fourth_image", "created_at", "updated_at") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING "id"  [["title", "asdfasdfasd"], ["department", "Women"], ["subcategory", "Clothing"], ["size_type", ""], ["price", 10], ["first_image", ""], ["second_image", ""], ["third_image", ""], ["fourth_image", ""], ["created_at", "2016-01-14 02:06:00.638698"], ["updated_at", "2016-01-14 02:06:00.638698"]]
				//    (0.4ms)  COMMIT
				// Completed 200 OK in 24ms (Views: 1.1ms | ActiveRecord: 2.7ms)
			}
		}

		$scope.$on("$destroy", function() {
			if(Constants.DEBUGMODE){
				console.log('destroying ProfileCtrl');
			}
		});

		$ionicLoading.hide();
	}])
