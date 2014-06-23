'use strict';
require('angular');

module.exports = ng(function vWidgetMenu($document,$timeout){
  return {
    restrict:'A',
    templateUrl: 'views/widget-menu.html'
  };
});

