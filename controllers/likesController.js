class LikesController {
  constructor(model, listingModel, listingImageModel, userModel) {
    this.model = model;
    this.listingModel = listingModel;
    this.listingImageModel = listingImageModel;
    this.userModel = userModel;
  }

  /* All controllers that extend this BASE controller will have access to the below function **/

  createOne = async (req, res) => {
    const { listingId, userId } = req.body;
    try {
      const result = await this.model.create({
        listingId,
        userId,
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  getCount = async (req, res) => {
    const { listingId } = req.params;
    try {
      const count = await this.model.count({
        where: {
          listingId,
        },
      });
      res.status(200).json(count);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  getLikesList = async (req, res) => {
    const { userId } = req.params;
    try {
      const list = await this.model.findAll({
        where: {
          userId,
        },
        include: [
          {
            model: this.listingModel,
            include: [
              {
                model: this.listingImageModel,
                limit: 1,
                attributes: ["url"],
              },
              // { model: this.listingImageModel, attributes: ["url"], limit: 1 },
              {
                model: this.userModel,
                as: "seller",
                attributes: ["username", "profilePicture"],
              },
            ],
          },
        ],
        attributes: [],
      });
      res.status(200).send(list);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  deleteOne = async (req, res) => {
    const { listingId, userId } = req.params;
    try {
      await this.model.destroy({
        where: {
          listingId,
          userId,
        },
      });
      res.status(200).send("removed like");
    } catch (error) {
      res.status(400).send(error);
    }
  };
}

module.exports = LikesController;
