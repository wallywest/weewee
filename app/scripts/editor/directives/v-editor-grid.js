(function(angular) {
  'use strict';

  var mod = angular.module('gulpie.editor.directives');
  var svc

  mod.directive('vEditorGrid',['gridSvc',function(gridSvc){
    svc = gridSvc

    var linkFn = function(scope,elem){
      var e = elem[0];
      svc.drawGrid(e);
    };

    return {
      restrict:'EA',
      link: linkFn
    };

  }]);

}(window.angular));
