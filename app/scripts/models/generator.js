'use strict';

var _ = require('lodash');

var Generator = function Generator() {
}

_.extend(Generator.prototype,{
  circle: function() {
    return {
      x: 400,
      y: 400,
      radius: 25,
      padding: 10
    }
  }

});


module.exports = Generator;
