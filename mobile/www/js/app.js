// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('NanuGO', [
  'ionic',
  'controllers.main',
  'controllers.auth',
  'controllers.profile',
  'controllers.users.profile',
  'controllers.items',
  'controllers.items.show',
  'controllers.give',
  'services.common.constants',
  'services.common.auth',
  'services.cloudinary.config',
  'services.cloudinary.upload',
  'directives.common.main',
  'ion-google-place',
  'components.http-auth-interceptor',
  'ngCordova.plugins.network'
])

.run(function($ionicPlatform, AuthService, Constants, $state, $rootScope, $http, $cordovaNetwork, $ionicLoading) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    if (Constants.DEBUGMODE) {
      var networkType = $cordovaNetwork.getNetwork();
      console.log("Network used on this machine : " + networkType);
    }

    if (!$cordovaNetwork.isOnline()) {
      if (Constants.DEBUGMODE) {
        console.log("NO NETWORK FOUND");
        $rootScope.$broadcast('event:app-networkRequired');
      }
    } else {
      if (Constants.DEBUGMODE) {
        console.log("NETWORK FOUND");
      }
    }
  });

  AuthService.init();

  $rootScope.$on("event:auth-loginRequired", function() {
    AuthService.resetCookie();
    $state.go("app.auth");
  });

  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
    $ionicLoading.show({
      template: "Loading..."
    });

    if (toState.authenticate && !AuthService.isLoggedIn()) {
      event.preventDefault();
      $state.go("app.start");
    }
  });

  $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams) {
    $ionicLoading.hide();
  });
})

.config(function($ionicConfigProvider) {
  $ionicConfigProvider.tabs.position("bottom");
  $ionicConfigProvider.tabs.style("standard");
  $ionicConfigProvider.navBar.alignTitle('center')

  if (!ionic.Platform.isIOS())
    $ionicConfigProvider.scrolling.jsScrolling(true);
})

.config(function($compileProvider){
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

  // loging function
  var _onEnter = [
    'Constants',
    '$state',
    '$stateParams',
    function(C, $state, $stateParams) {
      if (C.DEBUGMODE){
        console.log("Entering state : " + $state.current.name);
        console.log({
          currentState : $state.current,
          url : $state.current.url,
          route : $state.current.name,
          params : $stateParams
        })
      }
    }];

  var _onExit = [
    'Constants',
    '$state',
    function(C, $state) {
      if (C.DEBUGMODE) {
        console.log("Exiting state : " + $state.current.name);
      }
  }];

  var _ctrlFilter = function(options) {
    var opts = angular.extend({
      dependencies: ['Constants','$state','$stateParams'],
      type: 'data',
      data: {}
    }, options);

    opts.dependencies.push(function(C, $state, $stateParams, $q, Model) {
      var deferred = $q.defer();

      if (opts.type === 'data') {
        var model = new Model();
        model.get($stateParams.id).then(function(response) {
          if (C.DEBUGMODE) {
            console.log("success fetching model's data");
          }

          return deferred.resolve({
            type: 'data',
            params: {
              model: model.info
            }
          });

        }, function(error) {
          if (C.DEBUGMODE) {
            console.log("error fetching model's data");
          }

          return deferred.reject();
        });

      } else {
        // otherwise we're merely passing in the data
        return deferred.resolve({
          type: 'data',
          params : {
            id: $stateParams.id
          }
        });
      }

      return deferred.promise;
    });

    return opts.dependencies;
  }

  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/app.html",
    controller: 'AppCtrl'
  })

  .state('tabs', {
    url: "/tabs",
    abstract: true,
    templateUrl: "templates/tabs.html",
    controller: "AppCtrl"
  })

  // starting page
  .state('app.start', {
    url: "/start",
    views: {
      'content@app': {
        controller: 'AppCtrl',
        templateUrl: "templates/index.html"
      }
    },
    authenticate: false,
    onEnter: _onEnter,
    onExit: _onExit
  })

  // authentication page
  .state('app.auth', {
    url: "/auth",
    views: {
      'content@app': {
        controller: 'AuthCtrl',
        templateUrl: "templates/auth/index.html"
      }
    },
    authenticate: false,
    onEnter: _onEnter,
    onExit: _onExit
  })

  // login page
  .state('app.auth.signin', {
    url: "/signin",
    views: {
      'content@app': {
        controller: 'AuthCtrl',
        templateUrl: "templates/auth/signin.html"
      }
    },
    authenticate: false,
    onEnter: _onEnter,
    onExit: _onExit
  })

  // logged user's profile page
  .state('app.profile', {
    url: "/profile",
    views: {
      'content@app': {
        controller: 'ProfileCtrl',
        templateUrl: "templates/profile/index.html"
      }
    },
    authenticate: true,
    onEnter: _onEnter,
    onExit : _onExit
  })

  // postings
  .state('tabs.postings', {
    url: "/postings",
    views: {
      item: {
        controller: 'ItemsCtrl',
        templateUrl: "templates/item/index.html"
      }
    },
    authenticate: false,
    onEnter: _onEnter,
    onExit : _onExit
  })

  // postings
  .state('tabs.give', {
    url: "/give",
    views: {
      give: {
        controller: 'GiveCtrl',
        templateUrl: "templates/give/index.html"
      }
    },
    authenticate: true,
    onEnter: _onEnter,
    onExit : _onExit
  })

  // item
  .state('tabs.item', {
    url: "/items/:id",
    views: {
      item: {
        controller: 'ItemCtrl',
        templateUrl: "templates/item/show.html"
      }
    },
    authenticate: false,
    resolve : {
      CtrlFilter: _ctrlFilter({
        dependencies : ['Constants', '$state', '$stateParams', '$q', 'ItemModel'],
        type : 'data'
      })
    },
    onEnter: _onEnter,
    onExit : _onExit
  })

  // signup page
  .state('app.auth.signup', {
    url: "/signup",
    views: {
      'content@app': {
        controller: 'AuthCtrl',
        templateUrl: "templates/auth/signup.html"
      }
    },
    authenticate: false,
    onEnter: _onEnter,
    onExit : _onExit
  });

  $urlRouterProvider.otherwise('/app/start');
});
