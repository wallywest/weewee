'use strict';

var angular = require('angular');

module.exports = angular.module('gulpie.canvas.directives',[
])
.directive('vCanvasGrid',require('./v-canvas-grid'))
.directive('vCanvasToolbar',require('./v-canvas-toolbar'));
