'use strict';

angular.module('nodeNg', [
    'ui.router'
  ])

    .config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'views/home.html',
            controller: 'HomeCtrl'
        });
        
});
