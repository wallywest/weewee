(function(window,d3){
  'use strict';

  window.Grid = function Grid(options) {
    var nodes = [];
    var radius = 50;
    var svg;

    var drawAxis = function(options) {
      var container = svg.append('g');

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

    svg = d3.select(options.element).append('svg');
    svg.append("g")
    .attr("transform", "translate(" + options.margin.left + "," + options.margin.right+ ")");

    options.height = parseInt(d3.select(options.element).style("height"),10) - options.margin.top - options.margin.bottom;
    options.width = parseInt(d3.select(options.element).style("width"),10) - options.margin.left - options.margin.right;

    drawAxis(options);

    this.drawCircles = function() {
      var circle = svg.selectAll("circle")
      .data([32, 57, 293], String);

      circle.enter().append("circle")
      .attr("cy", 90)
      .attr("cx", String)
      .attr("r", Math.sqrt);

      circle.exit().remove();
    };

    this.drawNodes = function(data){
      this.drawCircles();
      /*var svgNodes = svg.selectAll('node').data(data);*/

      //var svgNode = svgNodes.enter()
      //.append("g")
      //.attr({
        //'transform': function(d){
          //return "translate("+ [d.x,d.y] + ")";
        //},
        //'class': 'state'
      //});

      //svgNode.append("text")
        //.attr({
          //'text-anchor':'middle'
        //})
        //.text(function(d){
          //return d.label;
        /*});*/

      //.call(this.dragCallback());

      //gState.append("circle")
      //.attr({
        //r: radius,
        //class: 'inner'
      //});

      //gState.append( "text")
      //.attr({
        //'text-anchor'   : 'middle',
        //y               : 4
      //})
      //.text( function( d) {
        //return d.label;
      //});

      //gState.append( "title")
      //.text( function( d) {
        //return d.label;
      /*});*/
    };
  };

})(window,window.d3);
