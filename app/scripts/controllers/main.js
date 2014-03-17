'use strict';

var launchstat = angular.module('launchStatApp');

launchstat.controller('MainCtrl', function ($scope, $firebase, firebaseUrl) {
  var launch = {};

  $('.site-header, .content').hide();

 function init() {
    var speed = 250,
      easing = mina.easeinout;

    [].slice.call ( document.querySelectorAll( '#grid > div > a' ) ).forEach( function( el ) {
      var s = Snap( el.querySelector( 'svg' ) ), path = s.select( 'path' ),
        pathConfig = {
          from : path.attr( 'd' ),
          to : el.getAttribute( 'data-path-hover' )
        };

      el.addEventListener( 'mouseenter', function() {
        path.animate( { 'path' : pathConfig.to }, speed, easing );
      } );

      el.addEventListener( 'mouseleave', function() {
        path.animate( { 'path' : pathConfig.from }, speed, easing );
        $('#grid > div > a > figure > figcaption > h2').css();
      } );
    } );
  }
 
  launch.fb = $firebase(new Firebase(firebaseUrl));
  launch.fb.$on('loaded', function(){
    init();
    $.backstretch("images/bg3.jpg", {fade: 'normal'});
    $('.site-header').addClass('animated fadeInDown');
      
    $('.site-header').show();
    $('.site-header').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
      $('.content').addClass('animated fadeIn');
      $('.content').show();
    });
  });

  //add a launch
  launch.addLaunch = function(){
    if((typeof launch.title != 'undefined') || (typeof launch.date != 'undefined') || (typeof launch.afterCountdown != 'undefined')){
      var add = launch.fb.$add({
        title: launch.title,
        launchDate: launch.date,
        text: launch.text,
        afterCountdown: launch.afterCountdown,
        backgroundImage: launch.image
      });

      $(function(){
        var mainInner = $('#main .inner'),
            modal = $('#modal');
        modal.removeClass('modal-active').fadeOut(400, function(){
          mainInner.animate({ opacity: 1 }, 400);
        });
      });
    }
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
