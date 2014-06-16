'use strict';

var _ = require('lodash');
var d3 = require('d3');

var Generator = function Generator() {
  this.generators = {
    "circle": this.circle,
    "voltron": this.voltron
  }
};

_.extend(Generator.prototype,{
  randomData: function(){
    var randomX = d3.random.normal(960/2,300);
    var randomY = d3.random.normal(500/2,300);

    return d3.range(10).map(function() {
      return[
        randomX(),
        randomY()
      ]
    });
  },
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
    var indexes = [1,5,6,2,3];
    var lions = ['black','red','blue','green','yellow']
    return _.map(this.randomData(),function(v,i) {
      var l = "X";
      var setLion = _.include(this.indexes,i);
      if(setLion) {
        l = this.lions[_.indexOf(this.indexes,i)];
      };
      return {
        x: v[0],
        y: v[1],
        radius: 25,
        label: l,
        type: "circle"
      }
    },{indexes: indexes, lions: lions});
  }
});


module.exports = Generator;
