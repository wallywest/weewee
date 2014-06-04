(function(window,d3){
  'use strict';

  //constructor
  var Grid = function Grid(options) {
    this.nodes = options.data;
    var self = this;
    this.element = options.element;
    this.locked = false;
    this.cx = this.element.clientWidth;
    this.cy = this.element.clientHeight;
    this.ticks = 50;
    this.radius = 50;

    this.size = {
      "width": this.cx,
      "height": this.cy
    };

    this.height = this.element.clientHeight;

    this.width = function() {
    };

    this.x = d3.scale.linear()
    .domain([1,100])
    .range([0,this.size.width]);


    this.y = d3.scale.linear()
    .domain([1,100])
    .range([0,this.size.height]);

    this.downx = Math.NaN;
    this.downy = Math.NaN;

    this.dragged = this.selected = null;

    this.vis = d3.select(this.element).append("svg")
    .append("g")
    .attr('transform',"translate(-5,-5)");

    this.container = this.vis.append("g")
    .attr("class","grid");

 /*   this.container.call(*/
      //d3.behavior.zoom()
      //.x(this.x)
      //.y(this.y)
      //.on('zoom',this.redraw())
    //);

    this.redraw();
  };

  Grid.prototype.redraw = function() {
    console.log("calling redraw");
    var self = this;

    var tx = function(d) {
      return "translate("+self.x(d)+",0)";
    };

    var ty = function(d) {
      return "translate(0,"+self.x(d)+")";
    };

    var stroke = function(d) {
      return d ? "#ccc":"#666";
    };

    //x-ticks
    var gx = self.container.selectAll("g.x")
    .data(self.x.ticks(self.ticks),String)
    .attr("transform",tx);

    var gxe = gx.enter().insert("g","a")
    .attr("class","x")
    .attr("transform",tx);

    gxe.append("line")
    .attr("stroke",stroke)
    .attr("y1",0)
    .attr("y2",self.element.clientHeight);

    gx.exit().remove();

    //y-ticks
    var gy = self.container.selectAll("g.y")
    .data(self.y.ticks(self.ticks),String)
    .attr("transform",ty);

    var gye = gy.enter().insert("g","a")
    .attr("class","y")
    .attr("transform",ty)
    .attr("background-fill","#FFEEB6");

    gye.append("line")
    .attr('stroke',stroke)
    .attr('x1',0)
    .attr('x2',self.size.width);

    gy.exit().remove();

    self.drawNodes();
  };

  Grid.prototype.lock = function(value,node,dragCallback) {
    if(value) {
      //lock
      d3.select(node).on('mousedown.drag', null);
    }else{
      //unlock
      node.call(dragCallback);
    }
  };

  Grid.prototype.drawNodes = function() {
    var toggleFlip = function(node) {
      var selectedNode = d3.select(node)
      //this remove all draggable events
      .style("pointer-events","none");
      selectedNode.select("text").remove();

      selectedNode.transition()
      .duration(750)
      .attr("transform", function(d){
        return "translate("+[d.x,d.y]+")scale(-1,1)";
      }).each("end",function(){
        d3.select(this)
        .style("pointer-events","all")
        .attr("transform",function(d){
          return "translate("+[d.x,d.y]+")scale(1)"
        })
        .append("text")
        .attr({
          "text-anchor":"middle",
          y:4
        })
        .text(function(d){
          return d.label;
        });
      });
    }

    var drag = d3.behavior.drag()
      .on("drag",function(d,i){
        var selection = d3.selectAll( '.selected');

        //deselected other selected element
        if( selection[0].indexOf(this) == -1){
          selection.classed("selected",false);
          selection = d3.select(this);
          selection.classed("selected",true);
        }

        selection.attr("transform",function(d,i){
          d.x += d3.event.dx;
          d.y += d3.event.dy;
          return "translate("+[d.x,d.y]+")"
        });

        d3.event.sourceEvent.stopPropagation();
        d3.event.sourceEvent.stopPropagation();
      });

    var clickCallback = function(d) {
      var flippable = true;
      if (d3.event.defaultPrevented) return;

      if(flippable) {
        toggleFlip(this);
      }
    };

    var mouseoutCallback = function(d){
      d3.select(this).classed( "hover", false);

    };

    var mouseoverCallback = function(d) {
      d3.select(this).classed( "hover", true);
    };

    var nodes = this.vis.selectAll("g.state").data(this.nodes);
    var node = nodes.enter().append("g")
    .attr("transform",function(d){
      return "translate("+[d.x,d.y]+")"
    })
    .attr("class","state");

    this.lock(false,node,drag);

    node.append("circle")
    .attr({
      "r": this.radius,
      "class": "inner"
    });

    node.on("click",clickCallback);
    node.on("mouseover",mouseoverCallback);
    node.on("mouseout",mouseoutCallback);
  }

  window.Grid = Grid;

})(window,window.d3);
