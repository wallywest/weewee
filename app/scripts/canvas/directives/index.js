'use strict';

var angular = require('angular');

module.exports = angular.module('gulpie.canvas.directives',[
])
.directive('vDraggable',require('./v-draggable'))
.directive('vDroppable',require('./v-droppable'))
.directive('vContextMenu',require('./v-context-menu'))
.directive('vCanvasGrid',require('./v-canvas-grid'))
.directive('vWidgetMenu',require('./v-widget-menu'))
.directive('vCanvasToolbar',require('./v-canvas-toolbar'));
