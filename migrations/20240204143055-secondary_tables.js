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
    await queryInterface.createTable("listings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      description: {
        type: Sequelize.STRING,
      },

      seller_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },

      buyer_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },

      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "categories",
          key: "id",
        },
      },

      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      sold: {
        type: Sequelize.BOOLEAN,
      },

      reserved: {
        type: Sequelize.BOOLEAN,
      },

      created_at: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },

      updated_at: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    });

    await queryInterface.createTable("orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      listing_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "listings",
          key: "id",
        },
      },

      tracking_url: {
        type: Sequelize.STRING,
      },

      created_at: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },

      updated_at: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    });

    await queryInterface.createTable("chatrooms", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      listing_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "listings",
          key: "id",
        },
      },

      potential_buyer_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
    });

    await queryInterface.createTable("chatroom_messages", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      chatroom_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "chatrooms",
          key: "id",
        },
      },

      comment: {
        type: Sequelize.STRING,
      },

      sender: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },

      created_at: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },

      updated_at: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    });

    await queryInterface.createTable("chat_images", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      url: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      chatroom_messages_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "chatroom_messages",
          key: "id",
        },
      },

      created_at: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },

      updated_at: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    });

    await queryInterface.createTable("listing_images", {
      listing_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "listings",
          key: "id",
        },
      },

      url: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      description: {
        type: Sequelize.STRING,
      },

      created_at: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },

      updated_at: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("orders");
    await queryInterface.dropTable("chat_images");
    await queryInterface.dropTable("listing_images");
    await queryInterface.dropTable("listings");
    await queryInterface.dropTable("chatroom_messages");
    await queryInterface.dropTable("chatroom");
  },
};
