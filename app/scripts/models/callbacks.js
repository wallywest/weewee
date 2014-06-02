/*this.container = function(options) {*/
//[>var zoomCallback = function() {<]
////console.log("zooming");
////container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
////};

////zoom = d3.behavior.zoom()
////.scaleExtent([1,10])
//[>.on('zoom',zoomCallback);<]
//};

//this.dragCallback = function(){
//function move(d,i){
//var selection = d3.select(this);
//console.log(this);
//console.log(selection);
//selection.attr('transform',function(d,i){
//d.x = Math.max(radius, Math.min(options.width - radius, d3.event.x));
//d.y = Math.max(radius, Math.min(options.height - radius, d3.event.y));
//return "translate(" + [ d.x,d.y ] + ")";
//});
//}

//return d3.behavior.drag()
//.origin(function(d) { return d; })
//.on("dragstart",function(){
////we need this to make sure backgorund g elements are not draggable
//d3.event.sourceEvent.stopPropagation();
//console.log('Start Dragging Circle');
//})
//.on("drag",move)
//.on("dragend",function(){
//d3.event.sourceEvent.stopPropagation();
//console.log('End Dragging Circle');
//});
//};


