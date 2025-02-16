'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Bookings', 'noOfSeats', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1
    });
    await queryInterface.changeColumn('Bookings', 'bookingAmount', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Bookings', 'noOfSeats', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: null
    });
    await queryInterface.changeColumn('Bookings', 'bookingAmount', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: null
    });
  }
};