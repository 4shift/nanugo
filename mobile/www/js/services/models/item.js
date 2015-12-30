'use.strict'

angular.module('services.models.item',[])

.factory('ItemModel', [
  '$http',
  '$q',
  'Constants',
  function($http, $q, Constants){

    var _urlApi = Constants.API.baseUrl + '/items';

    var itemModel = function(info) {
      this.info = info || {objectId: null};
      this.url = _urlApi;
    };

    //get /api/items/:id
    itemModel.prototype.get = function(id) {
      var self = this;
      var deferred = $q.defer();

      var success = function(response, status, headers, config) {
        //update current info for this user model
        angular.extend(self.info, response.payload);
        deferred.resolve(response.payload);
      }

      var error = function(error, status, headers, config) {
        deferred.reject(error);
      }

      // since the data is cached maybe it'll be nice to reload new data after a x minutes.
      $http.get(this.url + '/' + id, {cache: true}).success(success).error(error);

      return deferred.promise;
    }

    // post /api/items
    itemModel.prototype.create = function() {
      var deferred = $q.defer();

      var success = function(response, status, headers, config) {
        deferred.resolve(response.payload);
      }

      var error = function(error, status, headers, config) {
        deferred.reject(error);
      }

      $http.item(this.url, {item : self.info}).success(success).error(error);

      return deferred.promise;
    }

    // put /api/items/:id
    itemModel.prototype.update = function() {
      var self = this;
      var deferred = $q.defer();

      var success = function(response, status, headers, config) {
        angular.extend(self.info,response.payload);
        return deferred.resolve(response.payload);
      }

      var error = function(error, status, headers, config) {
        return deferred.reject(error);
      }

      $http.put(this.url + '/' + self.info.objectId, {item : self.info}).success(success).error(error);

      return deferred.promise;
    }

  	return itemModel;
  }])
