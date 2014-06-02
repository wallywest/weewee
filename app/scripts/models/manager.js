(function(window,d3){
  'use strict';

  window.GridManager = function GridManager() {
    var options;

    this.data = [
      { x : 50, y : 100, label : "Batman", type: "circle"},
      { x : 50, y : 200, label : "Superman", type: "rectangle"},
      { x : 50, y : 300, label : "Flash", type: "bolt"}
    ];

    this.drawGrid = function(element) {
      var margin = {top: -5, right: -5, bottom: -5, left: -5};
      options = {
        element: element,
        margin: margin,
      };

      var grid = new Grid(options);
      grid.drawNodes(this.data);
    };
  };
})(window,window.d3);
