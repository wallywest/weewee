'use strict';
require('angular');

module.exports = ng(function vDroppable(uuidSvc,environmentSvc){
  var linkFn = function (scope,elem,attrs) {
    var id = angular.element(elem).attr("id");

    if (!id) {
      id = uuidSvc.generate();
      angular.element(elem).attr("id", id);
    }

    elem.bind("dragover",function(e) {
      console.log("dragover");
      if(e.preventDefault) {
        e.preventDefault();
      }
    });

    elem.bind("dragenter",function(e) {
      console.log("dragenter");
      angular.element(e.target).addClass('lvl-over');
    });

    elem.bind("dragleave",function(e) {
      console.log("dragleave");
      angular.element(e.target).removeClass('lvl-over');
    });

    elem.bind("drop",function(e) {
      console.log("dropped");

      if(e.preventDefault) {
        e.preventDefault();
      };

      if(e.stopPropogation){
        e.stopPropogation();
      };

      var data = e.dataTransfer.getData("id");
      var widget = JSON.parse(e.dataTransfer.getData('widget'));
      var dest = document.getElementById(id);
      var src = document.getElementById(data);

      console.log(e);
      console.log(widget);
      console.log(data);
      console.log(dest);
      console.log(src);

      var position = {x: e.x, y: e.y};
      environmentSvc.drawWidget(position,widget);

    });
  };

  return {
    restrict: 'A',
    link: linkFn
  }
});

