class OrderController {
  constructor(model) {
    this.model = model;
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
