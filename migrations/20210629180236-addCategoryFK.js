'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("products", "categoryid", {
      type: Sequelize.INTEGER,
    })

    await queryInterface.addConstraint("products", {
      fields: ["categoryid"],
      type: "foreign key",
      name: "category_fk",
      references: {
        table: "categories",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("products", "category_fk");
    await queryInterface.removeColumn("products", "categoryid") 
  }
};
