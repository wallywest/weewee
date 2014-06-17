'use strict';

module.exports = ng(function CanvasToolbarCtrl($scope,environmentSvc){
  this.environmentSvc = environmentSvc;
  this.locked = false;

  this.loadCircle = function() {
    this.environmentSvc.removeAll();
    this.environmentSvc.addElement('circle');
  };

  this.loadVoltron = function() {
    this.environmentSvc.removeAll();
    //this.environmentSvc.lockScreen();
    this.environmentSvc.addElement("voltron");
    this.environmentSvc.topo.bindFlip('.node');
  };

  this.toggleLock = function() {
    var lock = !this.locked;
    this.locked = lock;
    if(this.locked) {
      this.environmentSvc.lockScreen();
    }else{
      this.environmentSvc.unlockScreen();
    };
  };

  this.resetGrid = function() {
    this.environmentSvc.removeAll();
  };
});
