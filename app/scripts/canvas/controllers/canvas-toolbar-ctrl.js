'use strict';

module.exports = ng(function CanvasToolbarCtrl($scope,environmentSvc){
  this.environmentSvc = environmentSvc;

  this.loadCircle = function() {
    this.environmentSvc.removeAll();
    this.environmentSvc.addElement('circle');
  };

  this.loadVoltron = function() {
    this.environmentSvc.removeAll();
    this.environmentSvc.lockScreen();

    //this.environmentSvc.addElement("voltron");
    //noop
  };
});
