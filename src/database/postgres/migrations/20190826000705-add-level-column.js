'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.addColumn('tb_users', 'level', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 4
    });

  },

  down: (queryInterface, Sequelize) => {
   
    return queryInterface.removeColumn('tb_users', 'level');

  }
};
