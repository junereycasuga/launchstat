'use strict';

var launchstat = angular.module('launchStatApp');

launchstat.controller('CountdownCtrl', function ($scope, $firebase, firebaseUrl, $routeParams) {
  var data = $firebase(new Firebase(firebaseUrl + $routeParams.id));
  data.$on('loaded', function(){
    $scope.launch = data;
    $.backstretch("../images/bg2.jpg");
    (function($) {
      function Countdown(options) {
        this.$timer = $(options.$timer);
        this.$date = $(options.$date);
        this.date = options.date;
        this.initialize();
      }

      Countdown.prototype = {
        initialize: function(){
          this.update();

        },
        
        update: function(){
          var self = this,
              val = this.getTimeLeft();
          
          this.$timer.html(val);
          this.$date.html(this.getDateString());
          
          setTimeout($.proxy(this.update, this), 1000);
        },

        getMoment: function(){
          return moment(this.date);
        },

        getDateString: function(){
          return this.getMoment().calendar();
        },

        getTimeLeft: function(){
          var diff = this.getMoment().diff();

          if(diff > 0) return "" + sToDuration(diff / 1000);
          else return data.afterCountdown;
        }
      };

      $(function(){
        var date = Date.parse(data.launchDate);
        if (date) {
          $("[role~='countdown_page']").removeClass('hide');
          new Countdown({
            $timer: $("[role~='timer_value']"),
            $date: $("[role~='timer_date']"),
            date: date
          });
        } else {
          $(".message").removeClass('hide');
          $(".message").html($("#samples").html());
        }
      });

      function sToDuration(n){
        var units = [
          {
            secs: 86400,
            name: ["day", "days"]
          },
          {
            secs: 3600,
            name: ["hour", "hours"]
          },
          {
            secs: 60,
            name: ["minute", "minutes"]
          },
          {
            secs: 1,
            name: ["second", "seconds"]
          }
        ];

        var remaining = n,
            result = [];

        for(var i=0; i < units.length; i++){
          var unit = units[i];

          if(remaining >= unit.secs){
            var number = parseInt(remaining / unit.secs, 10);
            remaining -= number * unit.secs;

            if(number === 1){
              result.push("<span class='countdown_section'><span class='countdown_amount'>" + number + "</span> " + unit.name[0] + "</span>");
            } else {
              result.push("<span class='countdown_section'><span class='countdown_amount'>" + number + "</span> " + unit.name[1] + "</span>");
            }
          }
        }

        return result.join("");
      }

      window.sToDuration = sToDuration;
    })(jQuery);
  });
});


