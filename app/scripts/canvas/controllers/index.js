'use strict';

var angular = require('angular');

module.exports = angular.module('gulpie.canvas.controllers',[
])
.controller('CanvasCtrl',require('./canvas-ctrl'))
.controller('CanvasToolbarCtrl',require('./canvas-toolbar-ctrl'));
