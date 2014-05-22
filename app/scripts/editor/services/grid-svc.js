(function(angular,d3) {
  'use strict';

  var mod = angular.module('gulpie.editor.services');

  function GridManager() {
    var svg, zoom, container;

    this.setup = function() {
      var zoomCallback = function() {
        container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
      };

      zoom = d3.behavior.zoom()
      .scaleExtent([1,10])
      .on('zoom',zoomCallback);

    };

    this.container = function(options) {

      this.setup(options);

      svg = d3.select(options.element).append('svg')
        .attr("width", options.width + options.margin.left + options.margin.right)
        .attr("height", options.height + options.margin.top + options.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + options.margin.left + "," + options.margin.right+ ")")
        .call(zoom);
    };

    this.drawAxis = function(options) {
      container = svg.append('g');

      var xcontainer = container.append('g');
      var ycontainer = container.append('g');

      xcontainer.attr('class','x axis')
      .selectAll('line')
      .data(d3.range(0,options.width,25))
      .enter()
      .append('line')
      .attr('x1', function(d) { return d; })
      .attr('y1', 0)
      .attr('x2', function(d) { return d; })
      .attr('y2', options.height);

      ycontainer.attr("class", "y axis")
      .selectAll("line")
      .data(d3.range(0, options.height, 25))
      .enter().append("line")
      .attr("x1", 0)
      .attr("y1", function(d) { return d; })
      .attr("x2", options.width)
      .attr("y2", function(d) { return d; });
    };

    this.drawGrid = function(element) {
      var margin = {top: -5, right: -5, bottom: -5, left: -5};
      var height = 500 - margin.top - margin.bottom;
      var width = parseInt(d3.select(element).style("width"),10) - margin.left - margin.right;

      var options = {
        element: element,
        margin: margin,
        height: height,
        width: width
      };

      var k = { x : 43, y : 67, label : "first" };

      this.setup(options);
      this.container(options);
      this.drawAxis(options);
      this.drawDiagrams(data);
    };
  }

  mod.service('gridSvc',[GridManager]);

})(window.angular,window.d3);
