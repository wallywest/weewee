(function(window,d3){
  'use strict';

  window.GridManager = function GridManager() {
    var options;

    this.data = [
      { x : 400, y : 400, label : "Batman", type: "circle"}
    ];

    var randomX = d3.random.normal(960/2,300);
    var randomY = d3.random.normal(500/2,300);

    this.randomData = d3.range(10).map(function(){
      return[
        randomX(),
        randomY()
      ]
    });

    this.voltronElements = function() {
      var indexes = [1,5,6,2,3];
      var lions = ["black","red","blue","green","yellow"]

      return _.map(this.randomData,function(v,i){
        var l = "X";

        var setLion = _.include(this.indexes,i);

        if(setLion){
          l = this.lions[_.indexOf(this.indexes,i)];
        };

        return {
          x: v[0],
          y: v[1],
          label: l,
          type: "circle"
        }
      },{indexes:indexes,lions:lions});
    };

    this.randomCircles = function() {
      var d = _.map(this.randomData,function(v,i){
        return {
          x: v[0],
          y: v[1],
          label: 'jernz',
          type: "circle"
        }
      });

      return d;
    }

    this.drawGrid = function(element) {
      this.voltronElements();
      var margin = {top: -5, right: -5, bottom: -5, left: -5};
      var options = {
        element: element,
        margin: margin,
        data: this.data
      };

      var grid = new Grid(options);
    };
  };
})(window,window.d3);
