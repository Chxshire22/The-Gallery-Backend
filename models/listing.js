"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Listing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.user, { as: "buyer", foreignKey: "buyerId" });
      this.belongsTo(models.user, { as: "seller", foreignKey: "sellerId" });
      this.hasOne(models.category, { foreignKey: "id" });
      this.hasMany(models.chatroom, { foreignKey: "listingId" });
      this.hasMany(models.review, { foreignKey: "listingId" });
      this.hasMany(models.like, { foreignKey: "listingId" });
      this.hasMany(models.order, { foreignKey: "listingId" });
      this.hasMany(models.listing_image, {
        foreignKey: "listingId",
        onDelete: "CASCADE",
      });
    }
  }
  Listing.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.INTEGER,
      sold: DataTypes.BOOLEAN,
      reserved: DataTypes.BOOLEAN,

      buyerId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      sellerId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: "category",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "listing",
      underscored: true,
    }
  );
  return Listing;
};
