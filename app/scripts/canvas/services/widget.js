'use strict';

module.exports = ng(function widgetSvc(){
  this.starwars = [
      {
        name: 'x-wing',
        icon: 'x-wing.svg'
      },
      {
        name: 'falcon',
        icon: 'falcon.svg'
      },
      {
        name: 'tie-fighter',
        icon: 'tie-fighter.svg'
      },
      {
        name: 'akbar',
        icon: 'admiral_akbar.svg'
      },
      {
        name: 'boba fett',
        icon: 'bounty_hunter.svg'
      },
      {
        name: 'darth vader',
        icon: 'darth_vader.svg'
      },
      {
        name: 'leia',
        icon: 'leia.svg'
      },
      {
        name: 'yoda',
        icon: 'yoda.svg'
      },
      {
        name: 'sith',
        icon: 'light_saber.svg'
      },
      {
        name: 'jedi',
        icon: 'light_saber_green.svg'
      },
      {
        name: "death star",
        icon: "death_star.svg"
      }
    ];

  this.$get = function(){
    return this.starwars;
  }
});
