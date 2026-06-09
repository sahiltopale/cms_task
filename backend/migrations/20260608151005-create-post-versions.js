"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PostVersions", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },

      postId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Posts",
          key: "id",
        },
        onDelete: "CASCADE",
      },

      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      contentJson: {
        type: Sequelize.JSONB,
        allowNull: false,
      },

      authorId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("PostVersions");
  },
};
