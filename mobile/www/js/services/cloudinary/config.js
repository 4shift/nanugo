'use strict';

angular.module('services.cloudinary.config',[])

.service('CloudinaryConfig', [function() {

  var _API = {
    baseUrl: "https://api.cloudinary.com/v1_1/dctb9ebps/image/upload"
  }

  var _PRESET = {
    name: "yt2ueypl"
  }

  var constants = {
    API: _API,
    UPLOAD_PRESET: _PRESET
  };

  return constants;
}])
