"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("orders", "buyer_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    });
    await queryInterface.addColumn("orders", "buyer_received",{
      type: Sequelize.BOOLEAN,
      defaultValue: false
    })
    await queryInterface.addColumn("orders", "seller_sent",{
      type: Sequelize.BOOLEAN,
      defaultValue: false
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("orders","buyer_id")
    await queryInterface.removeColumn("orders", "buyer_received")
    await queryInterface.removeColumn("orders", "seller_sent")
  },
};
