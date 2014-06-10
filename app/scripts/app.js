'use strict';

require('angular');

var router = require('angular-ui-router');
var app = angular.module('gulpie.app',[
  router,
  require('./canvas').name
]);

app.config(require('./app-routes'));
app.controller('ApplicationCtrl',require('./app-ctrl'));

module.exports = app;

