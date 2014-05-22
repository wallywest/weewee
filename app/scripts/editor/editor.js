(function(angular){
  'use strict';

  var controllers = angular.module('gulpie.editor.controllers',[]);
  var directives = angular.module('gulpie.editor.directives',[]);
  var services = angular.module('gulpie.editor.services',[]);

  angular.module('gulpie.editor',[
    controllers.name,
    directives.name,
    services.name
  ]);

}(window.angular));

