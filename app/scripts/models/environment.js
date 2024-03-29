'use strict'

require('angular');
var _ = require('lodash');
var Generator = require('./generator.js');
var Topology = require('./components/topology.js');

var Environment = function Environment() {
  this.elements = [];
  this.margin = {top: -5, right: -5, bottom: -5, left: -5};
}

_.extend(Environment.prototype,{
  render: function(element) {
    var topology = this.topology;
    this.node = element;
    this.generator = new Generator();
    topology = this.createTopology();
    topology.render();
  },

  createTopology: function() {
    var container = this.node,
    topo = this.topo;
    if (!topo) {
      topo = new Topology(this.node);
      this.topo = topo;
    }

    return topo;
  },

  addElement: function(type) {
    var fn = this.generator.builder(type);
    var elements = fn.call(this.generator);
    this.elements.push(elements);
    this.topo.drawElement(elements);
  },

  removeAll: function() {
    this.topo.clear();
  },

  lockScreen: function() {
    this.topo.lock();
  },

  unlockScreen: function() {
    this.topo.unlock();
  },

  drawWidget: function(position,widget) {
    console.log('drawingWidget');
    this.topo.drawWidget(position,widget);
  }

});

module.exports = Environment;
