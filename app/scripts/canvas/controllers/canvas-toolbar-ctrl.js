'use strict';

module.exports = ng(function CanvasToolbarCtrl($scope,environmentSvc){
  this.environmentSvc = environmentSvc;

  this.load = function(demo) {
    this.environmentSvc.removeAll();
    this.loadCircle();
  };

  this.loadCircle = function() {
    this.environmentSvc.addElement('circle');
  };

  this.loadVoltron = function() {
    this.environmentSvc.lockScreen();
    //this.environmentSvc.removeAll();
    //this.environmentSvc.addElement("voltron");
    //noop
  };
});
