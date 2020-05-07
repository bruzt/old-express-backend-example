'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.renameColumn('tb_users', 'username', 'name');

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.renameColumn('tb_users', 'name', 'username');

  }
};
