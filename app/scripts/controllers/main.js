'use strict';

var launchstat = angular.module('launchStatApp');

launchstat.controller('MainCtrl', function ($scope, $firebase, firebaseUrl) {
  var launch = {};

  launch.fb = $firebase(new Firebase(firebaseUrl));
  $.backstretch("../images/bg3.jpg");

  //add a launch
  launch.addLaunch = function(){
    launch.fb.$add({
      title: launch.title,
      launchDate: launch.date,
      text: launch.text,
      afterCountdown: launch.afterCountdown
    });

    $(function(){
      var mainInner = $('#main .inner'),
        modal = $('#modal');
      modal.removeClass('modal-active').fadeOut(400, function(){
        mainInner.animate({ opacity: 1 }, 400);
      });
    });
  }

  $('#modal-open').on('click', function(e){
      var mainInner = $('#main .inner'),
        modal = $('#modal');

      mainInner.animate({ opacity: 0 }, 400, function(){
        $('html,body').scrollTop(0);
        modal.addClass('modal-active').fadeIn(400);
      });
      e.preventDefault();

      $('#modal-close').on('click', function(e) {
        modal.removeClass('modal-active').fadeOut(400, function(){
          mainInner.animate({ opacity: 1 }, 400);
        });
        e.preventDefault();
      });
    });

  $scope.launches = launch;
});
