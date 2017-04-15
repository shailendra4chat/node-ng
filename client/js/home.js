'use strict';

angular.module('nodeNg')
.config(function($httpProvider){
	 delete $httpProvider.defaults.headers.common['X-Requested-With'];
})
.controller('HomeCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.msg = "welcome to the world of Node/angular"
	
}]);