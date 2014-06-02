(function(angular) {
  'use strict';

  var mod = angular.module('gulpie.editor.directives');
  var svc;

  mod.directive('vEditorGrid',['gridSvc','$document',function(gridSvc,$document){
    svc = gridSvc;

    var linkFn = function(scope,elem){
      var e = elem[0];

      angular.element($document).ready(function () {
        svc.drawGrid(e);
      });
    };

    return {
      restrict:'EA',
      link: linkFn
    };

  }]);

}(window.angular));
