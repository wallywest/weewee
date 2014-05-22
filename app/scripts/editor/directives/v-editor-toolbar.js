(function(angular) {
  'use strict';

  var mod = angular.module('gulpie.editor.directives');

  mod.directive('vEditorToolbar',function(){
    return {
      templateUrl: 'views/toolbar.html'
    };
  });

})(window.angular);
