class OrderController {
  constructor(model, listingModel, userModel, listingImageModel) {
    this.model = model;
    this.listingModel = listingModel;
    this.userModel = userModel;
    this.listingImageModel = listingImageModel;
  }

  // CREATE ORDER
  createOne = async (req, res) => {
    const { listingId, buyerId } = req.body;
    try {
      const result = await this.model.create({
        listingId,
        buyerId,
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  getOne = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await this.model.findByPk(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json(error);
    }
  };

  getAllSale = async (req, res) => {
    const { userId } = req.params;
    try {
      const getUserSales = await this.model.findAll({
        order: [["updatedAt", "DESC"]],

        include: [
          {
            model: this.listingModel,
            where: {
              sellerId: userId,
            },
            include: [
              { model: this.listingImageModel, attributes: ["url"], limit: 1 },
            ],
          },
          {
            model: this.userModel,
            attributes: ["username", "profilePicture", "address", "id"],
          },
        ],
      });
      res.status(200).json(getUserSales);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  getAllPurchase = async (req, res) => {
    const { userId } = req.params;
    try {
      const getUserPurchases = await this.model.findAll({
        order: [["updatedAt", "DESC"]],

        where: {
          buyerId: userId,
        },
        include: [
          {
            model: this.listingModel,
            include: [
              {
                model: this.userModel,
                as: "seller",
                attributes: ["username", "profilePicture"],
              },
              { model: this.listingImageModel, attributes: ["url"], limit: 1 },
            ],
          },
        ],
      });
      res.status(200).json(getUserPurchases);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  updateSent = async (req, res) => {
    const { sellerSent, id } = req.params;
    try {
      const sent = await this.model.update(
        {
          sellerSent,
        },
        {
          where: {
            id,
          },
        }
      );
      res.status(200).send(`seller sent updated to ${sellerSent}`);
    } catch (error) {
      res.status(400).send(error);
    }
  };
  updateReceived = async (req, res) => {
    const { buyerReceived, id } = req.params;
    try {
      const received = await this.model.update(
        {
          buyerReceived,
        },
        {
          where: {
            id,
          },
        }
      );
      res.status(200).send(`buyer received updated to ${buyerReceived}`);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  // DELETE ORDER
  deleteOne = async (req, res) => {
    const { listingId } = req.params;
    try {
      await this.model.destroy({
        where: {
          listingId,
        },
      });
      res.status(200).send("Order deleted");
    } catch (error) {
      res.status(400).send(error);
    }
  };
}

module.exports = OrderController;
