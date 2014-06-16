'use strict';

var angular = require('angular');

module.exports = angular.module('gulpie.canvas',[
  require('./controllers').name,
  require('./services').name,
  require('./directives').name
]);
