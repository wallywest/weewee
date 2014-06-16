'use strict';

var d3 = require('d3');
var _ = require('lodash');
var $ = require('jquery');

//constructor
var Topology = function Topology(element) {
  var self = this;
  this.container = element;
  this.locked = false;
  this.ticks = 50;
  this.radius = 50;
  //will recompute when we add canvas
  this.width = 640;
  this.height = 480;
  this.initialize.apply(this, arguments);
};

_.extend(Topology.prototype,{
  initialize: function() {
    this.options = {
      minZoom: 0.25,
      maxZoom: 2
    }
  },

  render: function() {
    var svg,
    vis,
    width = this.width,
    height = this.height;

    //setup d3 scales and zooming
    this.computeScales();
    this.buildCanvas();
    this.resize();
  },

  buildCanvas: function() {
    var canvas = d3.select(this.container);
    var base = canvas.append('div').classed('topology-canvas',true);
    var svg = base.append('svg:svg')
    .attr('width',this.width)
    .attr('height',this.height)

    this.svg = svg;
    this.zoomPlane = svg.append('rect')
    .attr('class','zoom-plane')
    .style('fill','none')
    .attr('width',this.width)
    .attr('height',this.height)
    .attr('pointer-events','all')
    .call(this.zoom)
    .on('dbclick.zoom',null);

    var vis = svg.append('svg:g');

    this.vis = vis;
  },

  computeScales: function() {
    var self = this;
    var width = this.width;
    var height = this.height;

    if(!this.xScale) {
      this.xScale = d3.scale.linear();
      this.yScale = d3.scale.linear();
      this.zoom = d3.behavior.zoom();
    };

    this.xScale
    .domain([-width/2,width/2])
    .range([0,width])
    .clamp(true)
    .nice();

    this.yScale
    .domain([-height/2,height/2])
    .range([height,0])
    .clamp(true)
    .nice();

    this.zoom
    .x(this.xScale)
    .y(this.yScale)
    .scaleExtent([this.options.minZoom,this.options.maxZoom])
    .on('zoom',function(evt){
      self.zoomHandler(d3.event);
    });
  },

  lock: function() {
    this.locked = true;
    this.zoom.on("zoom",null);
  },

  unlock: function() {
    this.locked = false;
    this.zoom.on("zoom",self.zoomHandler(d3.event));
  },

  //adjusting canvas based on events
  resize: function() {
    var dimensions = this.getEffectiveViewPortSize();
    this.setDimensions(dimensions);
  },

  setDimensions: function(dimensions) {
    var gridCanvas = $('.topology-canvas');
    gridCanvas.css("margin-top",dimensions.yoffset);
    this.svg.attr('width', dimensions.width);
    this.svg.attr('height', dimensions.height);
    this.vis.attr('width', dimensions.width);
    this.vis.attr('height', dimensions.height);
    this.zoomPlane.attr('height',dimensions.height);
    this.zoomPlane.attr('width',dimensions.width);
  },

  getEffectiveViewPortSize: function() {
    var containerHeight,
    toolbar;
    var result = {};

    containerHeight = $(window).height();
    toolbar = $('#editor-toolbar');

    result.height = containerHeight - toolbar.height();
    result.width = Math.floor(parseFloat(
      toolbar.width()
    ));
    result.yoffset = toolbar.height();
    console.log(result);

    return result;
  },

  zoomHandler: function(event) {
    this.rescale(event);
  },

  rescale: function(evt) {
    var canvas = $('.topology-canvas');
    
    this.vis
    .attr('transform','translate('+evt.translate+')'+' scale('+evt.scale+')');

    if(canvas) {
      var bgPosition = evt.translate[0] + 'px ' + evt.translate[1] + 'px';
      canvas.css('backgroundPosition',bgPosition);
    };
  },

  drawElement: function(element) {
    var data = element;
    if (!_.isArray(element)) {
      data = [element];
    }
    //only draw circle for now
    var circles = this.vis.selectAll('node')
    .data(data)
    .enter()
    .append('circle')
    .attr('class','node')
    .attr('cx', function (d) { return d.x; })
    .attr('cy', function (d) { return d.y; })
    .attr('r', function (d) { return d.radius; })
    .style('fill','white');
  },

  clear: function() {
    this.vis.selectAll('node').remove();
  }

})

module.exports = Topology;
