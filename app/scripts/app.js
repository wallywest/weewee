(function(angular){
  'use strict';

  var app = angular.module('gulpie.app',[
    'ui.router',
    'gulpie.editor'
  ]);

  app.config(function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('/editor');
    $stateProvider
      .state('editor',{
        url:'/editor',
        templateUrl: 'views/editor.html'
      });
  });

  app.controller('ApplicationCtrl',function(){
  });

}(window.angular));
