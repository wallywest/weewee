(function(angular,d3) {
  'use strict';

  var mod = angular.module('gulpie.editor.services');

  function GridManager() {
    this.drawGrid = function(element) {
    }
  }

  mod.service('gridSvc',[GridManager]);

})(window.angular,window.d3);
