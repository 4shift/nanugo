'use strict';

angular.module('services.cloudinary.upload', ['services.cloudinary.config', 'ngCordova'])

.factory('CloudinaryUploadService', [
  '$q',
  '$ionicLoading',
  '$cordovaFileTransfer',
  'CloudinaryConfig',
  'Constants',
  function($q, $ionicLoading, $cordovaFileTransfer, CloudinaryConfig, Constants) {
    return {
      uploadImage: function(imageURI) {
        var q = $q.defer();
        var fileSize;
        var percentage;

        if (Constants.DEBUGMODE) {
          console.log("Cloudinary baseUrl: " + CloudinaryConfig.API.baseUrl);
        }

        // Find out how big the original file is
        window.resolveLocalFileSystemURL(imageURI, function(fileEntry) {
          fileEntry.file(function(fileObj) {
            fileSize = fileObj.size;
            $ionicLoading.show({template : 'Uploading Picture : ' + 0 + '%'});

            uploadFile();
          });
        });

        function uploadFile() {

          var uploadOptions = {
            params: { 'upload_preset': CloudinaryConfig.UPLOAD_PRESET.name}
          };

          $cordovaFileTransfer.upload(CloudinaryConfig.API.baseUrl, imageURI, uploadOptions).then(function(result) {
            console.log('success callback');
              $ionicLoading.show({template : 'Upload Completed', duration: 1000});
              // Result has a "response" property that is escaped
              // FYI: The result will also have URLs for any new images generated with
              // eager transformations
              var response = JSON.parse(decodeURIComponent(result.response));
              q.resolve(response);
            }, function(err) {
              console.log('error callback');
              $ionicLoading.show({template : 'Upload Failed', duration: 3000});
              
              q.reject(err);
            }, function(progress) {
              console.log('progress callback');
              percentage = Math.floor(progress.loaded / fileSize * 100);
              $ionicLoading.show({template : 'Uploading Picture : ' + percentage + '%'});
            });
        }

        return q.promise;
      }
    }
}]);
