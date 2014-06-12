'use strict';
require('angular');

module.exports = ng(function vCanvasGrid(environmentSvc,$document,$timeout){
  var environment;
  environment = environmentSvc;

  var linkFn = function(scope,elem){
    var e = elem[0];

    angular.element($document).ready(function(){
      environment.render(e);
    });
  };

  return {
    restrict:'EA',
    link: linkFn
  };
});
