// const BaseController = require("./baseController");
const { Sequelize } = require("../models");

class ListingsController {
  constructor(
    model,
    categoryModel,
    listingImageModel,
    userModel,
    reviewModel,
    likeModel
  ) {
    this.model = model;
    this.categoryModel = categoryModel;
    this.listingImageModel = listingImageModel;
    this.userModel = userModel;
    this.reviewModel = reviewModel;
    this.likeModel = likeModel;
  }

  getAll = async (req, res) => {
    try {
      const allListings = await this.model.findAll({
        include: [
          { model: this.listingImageModel, attributes: ["url"], limit: 1 },
          { model: this.categoryModel, attributes: ["id", "name"] },
          {
            model: this.userModel,
            as: "seller",
            attributes: ["username", "firstName", "lastName", "profilePicture"],
          },
        ],
      });
      return res.status(200).json(allListings);
    } catch (error) {
      return res.status(400).send(error);
    }
  };

  async createOne(req, res) {
    const { title, description, price, sellerId, categoryId } = req.body;
    try {
      const createListing = await this.model.create({
        title,
        description,
        price,
        sellerId,
        categoryId,
        sold: false,
        reserved: false,
      });
      const selectedCategory = await this.categoryModel.findByPk(categoryId);
      await createListing.setCategory(selectedCategory);
      return res.status(200).json(createListing);
    } catch (err) {
      return res.status(400).send(err);
    }
  }
  async getOne(req, res) {
    const { listingId } = req.params;
    try {
      const listing = await this.model.findByPk(listingId, {
        include: [
          { model: this.listingImageModel, attributes: ["url"] },
          { model: this.reviewModel, include: [{ model: this.userModel }] },
          { model: this.categoryModel, attributes: ["id", "name"] },
          {
            model: this.userModel,
            as: "seller",
            attributes: ["username", "firstName", "lastName", "profilePicture"],
          },
        ],
      });
      return res.status(200).json(listing);
    } catch (err) {
      return res.status(400).send("Failed, check ur code dummy");
    }
  }

  //Should this be nested within userController, under getProfileByUsername?
  async getListingsOfUser(req, res) {
    const { userId } = req.params;
    try {
      const userListings = await this.model.findAll({
        where: {
          sellerId: userId,
        },
        include: [this.listingImageModel],
      });
      return res.status(200).send(userListings);
    } catch (err) {
      return res.status(500).send("yea... check your code.");
    }
  }

  // ASK SAM ABOUT TURNING THIS INTO A MIDDLEWARE FUNCTION, IT CAN BE USED IN MESSAGES, SEARCH, ETC.
  getPaginatedAll = async (req, res) => {
    const page = Number(req.query.page);
    const limit = 6;
    const offset = (page - 1) * limit;

    try {
      const results = {};

      results.listings = await this.model.findAll({
        order: [["updatedAt", "DESC"]],
        offset: offset,
        limit: limit,
        include: [
          { model: this.listingImageModel, attributes: ["url"], limit: 1 },
          { model: this.categoryModel, attributes: ["id", "name"] },
          // { model: this.likeModel, attributes: ["id"] },
          {
            model: this.userModel,
            as: "seller",
            attributes: ["username", "firstName", "lastName", "profilePicture"],
          },
        ],
      });
      const countListings = await this.model.count();

      results.previous = {
        exists: offset > 0 ? true : false,
        page: offset > 0 ? page - 1 : null,
        limit,
      };

      results.next = {
        exists: offset + limit <= countListings ? true : false,
        page: offset + limit <= countListings ? page + 1 : null,
        limit,
      };

      res.status(200).json(results);
    } catch (error) {
      res.status(400).send("check your code");
    }
  };

  getPaginatedCategory = async (req, res) => {
    const categoryId = req.query.category;
    const page = Number(req.query.page);
    const limit = 6;
    const offset = (page - 1) * limit;

    try {
      const results = {};

      results.listings = await this.model.findAll({
        where: {
          categoryId,
        },
        order: [["updatedAt", "DESC"]],
        offset: offset,
        limit: limit,
        include: [
          { model: this.listingImageModel, attributes: ["url"], limit: 1 },
          { model: this.categoryModel, attributes: ["id", "name"] },
          {
            model: this.userModel,
            as: "seller",
            attributes: ["username", "firstName", "lastName", "profilePicture"],
          },
        ],
      });
      const countListings = await this.model.count();

      results.previous = {
        exists: offset > 0 ? true : false,
        page: offset > 0 ? page - 1 : null,
        limit,
      };

      results.next = {
        exists: offset + limit <= countListings ? true : false,
        page: offset + limit <= countListings ? page + 1 : null,
        limit,
      };

      res.status(200).json(results);
    } catch (error) {
      res.status(400).send("error here");
    }
  };

  getPaginatedSearch = async (req, res) => {
    const search = req.query.search;
    const page = Number(req.query.page);
    const limit = 6;
    const offset = (page - 1) * limit;

    try {
      const results = {};

      results.listings = await this.model.findAll({
        where: {
          title: {
            [Sequelize.Op.substring]: search,
          },
        },
        order: [["updatedAt", "DESC"]],
        offset: offset,
        limit: limit,
        attributes: ["title", "id"],
      });

      results.users = await this.userModel.findAll({
        where: {
          username: {
            [Sequelize.Op.substring]: search,
          },
        },
        order: [["updatedAt", "DESC"]],
        offset: offset,
        limit: limit,
        attributes: ["username", "profilePicture"],
      });

      const countListings = await this.model.count({
        where: {
          title: {
            [Sequelize.Op.substring]: search,
          },
        },
      });
      const countUsers = await this.userModel.count({
        where: {
          username: {
            [Sequelize.Op.substring]: search,
          },
        },
      });

      results.previous = {
        exists: offset > 0 ? true : false,
        page: offset > 0 ? page - 1 : null,
        limit,
      };

      results.next = {
        exists: offset + limit <= countListings + countUsers ? true : false,
        page: offset + limit <= countListings + countUsers ? page + 1 : null,
        limit,
      };

      res.status(200).json(results);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  deleteOne = async (req, res) => {
    const { listingId } = req.params;
    try {
      await this.listingImageModel.destroy({
        where: {
          listingId,
        },
      });

      await this.model.destroy({
        where: {
          id: listingId,
        },
      });
      return res.status(200).send("listing was deleted");
    } catch (error) {
      return res.status(400).send(error);
    }
  };
}

module.exports = ListingsController;
