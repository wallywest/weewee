'use strict'
module.exports = ng(function($stateProvider,$urlRouterProvider) {
  $urlRouterProvider.otherwise('/editor');
  $stateProvider
  .state('editor',{
    url:'/editor',
    templateUrl: 'views/editor.html'
  });
});
