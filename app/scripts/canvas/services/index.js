'use strict';

var angular = require('angular');
var environment = require('../../models/environment');
var generator = require('../../models/generator');

module.exports = angular.module('gulpie.canvas.services',[
])
.service('environmentSvc',[environment])
.service('generatorSvc',[generator]);
