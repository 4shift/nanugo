'use.strict'

angular.module('services.common.constants',[])

.service('Constants',[function(){

  var _API = {
    baseUrl: "http://0.0.0.0:3000/v1"
  }

  var _img = {
    avatar : "img/avatar.png",
    profile_bg : "img/bg_new.png"
  }

  var _timeouts = {
    collection: {
      user : 0
    }
  }

  var constants = {
    DEBUGMODE : true,
    SHOWBROADCAST_EVENTS : true,
    API: _API,
    IMG: _img,
    timeouts: _timeouts
  };

  return constants;
}])
