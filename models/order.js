"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      this.belongsTo(models.listing, { foreignKey: "listingId" });
      this.belongsTo(models.user, { foreignKey: "buyerId" });
    }
  }
  Order.init(
    {
      trackingUrl: DataTypes.STRING,
      sellerSent: DataTypes.BOOLEAN,
      buyerReceived: DataTypes.BOOLEAN,

      listingId: {
        type: DataTypes.INTEGER,
        references: {
          model: "listings",
          key: "id",
        },
      },
      buyerId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "order",
      underscored: true,
    }
  );
  return Order;
};
