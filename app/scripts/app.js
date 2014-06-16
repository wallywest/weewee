'use strict';
require('angular');
require('bootstrap-dropdown');

var app = angular.module('gulpie.app',[
  require('angular-ui-router'),
  require('./canvas').name
]);

app.config(require('./app-routes'));
app.controller('ApplicationCtrl',function(){
});

module.exports = app;
