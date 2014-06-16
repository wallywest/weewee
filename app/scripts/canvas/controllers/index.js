'use strict';

var angular = require('angular');

module.exports = angular.module('gulpie.canvas.controllers',[])
.controller('CanvasToolbarCtrl',require('./canvas-toolbar-ctrl'))
.controller('CanvasCtrl',require('./canvas-ctrl'));
