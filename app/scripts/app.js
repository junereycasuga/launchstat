'use strict';

angular.module('launchStatApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'firebase',
])
  .config(function ($routeProvider) {
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
  .value('firebaseUrl', 'https://launchstat.firebaseio.com/')
  .filter('searchfilter', function() {
    return function(input, term) {
        var regex = new RegExp(term || '', 'i');
        var obj = {};
        angular.forEach(input, function(v, i){
            if(regex.test(v + '')){
                obj[i]=v;
            }
        });
        return obj;
    };
  });
