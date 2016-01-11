'use strict';

angular.module('directives.common.main', [])

.directive('hideTabs', [
  '$rootScope',
  function($rootScope) {
    return {
      restrict: 'A',
      link: function(scope, element, attributes) {
        scope.$watch(attributes.hideTabs, function(value){
          $rootScope.hideTabs = value;
        });

        scope.$on('$destroy', function() {
          $rootScope.hideTabs = false;
        });
      }
    };
}]);
