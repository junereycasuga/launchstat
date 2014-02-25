'use strict';

angular.module('launchStatApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'firebase',
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/:id', {
        templateUrl: 'views/countdown.html',
        controller: 'CountdownCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .value('firebaseUrl', 'https://launchstat.firebaseio.com/');
