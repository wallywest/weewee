'use strict';
require('angular');

module.exports = ng(function vDraggable(uuidSvc){
  var uuid = uuidSvc;

  var linkFn = function(scope,elem,attrs) {
    angular.element(elem).attr("draggable",true);

    var id = angular.element(elem).attr("id");
    if (!id) {
      id = uuid.generate();
      angular.element(elem).attr("id",id);
    }

    elem.bind("dragstart",function(e){
      e.dataTransfer.setData('id', id);
    });

    elem.bind("dragend",function(e){
      console.log("dragend");
    });

  };

  return {
    restrict: 'A',
    scope: {
      widget: '='
    },
    link: linkFn
  }
});

