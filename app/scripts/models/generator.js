'use strict';

var _ = require('lodash');

var Generator = function Generator() {
  this.generators = {
    "circle": this.circle,
    "voltron": this.voltron
  }
}

_.extend(Generator.prototype,{
  builder: function(type) {
    return this.generators[type];
  },
  circle: function() {
    return {
      x: 400,
      y: 400,
      radius: 25,
      padding: 10
    }
  },
  voltron: function() {
  }
});


module.exports = Generator;
