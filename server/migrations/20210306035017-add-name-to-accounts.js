'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     return queryInterface.addColumn("Accounts","first_name", {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg : "Firstname harus diisi"
        },
        notNull : {
          args: true,
          msg : "Firstname diisi"
        },
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.removeColumn("Accounts", null, {})
  }
};
