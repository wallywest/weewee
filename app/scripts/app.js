'use strict';

require('angular');
var router = require('angular-ui-router');

module.exports = angular.module('gulpie.app',[
  router,
  require('./canvas').name
])
  .config(require('./app-routes'))
  .controller('ApplicationCtrl',require('./app-ctrl'));

