(function(angular) {
  'use strict';

  var mod = angular.module('gulpie.editor.directives');

  mod.directive('vEditorMenu',function(){
    return {
      templateUrl: 'views/menu.html'
    };
  });

})(window.angular);
