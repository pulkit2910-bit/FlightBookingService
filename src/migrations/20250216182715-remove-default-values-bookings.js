'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Bookings', 'bookingAmount', {
      type: Sequelize.INTEGER
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Bookings', 'bookingAmount', {
      type: Sequelize.INTEGER
    });
  }
};