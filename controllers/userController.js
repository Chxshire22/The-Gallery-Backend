const { Sequelize } = require("../models");
const BaseController = require("./baseController");

class UsersController extends BaseController {
  constructor(model) {
    super(model);
  }

  async createOne(req, res) {
    const {
      email,
      firstName,
      lastName,
      username,
      bio,
      style,
      address,
      profilePicture,
    } = req.body;
    try {
      const createUser = await this.model.create({
        email,
        firstName,
        lastName,
        username,
        bio,
        style,
        address,
        profilePicture,
      });
      return res.status(200).json(createUser);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }
  async getByEmail(req, res) {
    const { email } = req.params;
    try {
      const output = await this.model.findOne({
        where: {
          email,
        },
      });
      return res.status(200).json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getByUsernameExistingUser(req, res) {
    const { userId, username } = req.params;
    try {
      const output = await this.model.findAll({
        where: {
          id: { [Sequelize.Op.ne]: userId },
          username: username,
        },
      });
      console.log(output);
      const isUsernameTaken = output.length > 0;
      // console.log(isUsernameTaken)
      return res.status(200).send(isUsernameTaken);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getProfileByUsername(req, res) {
    const { username } = req.params;
    try {
      const output = await this.model.findOne({
        where: {
          username,
        },
      });
      return res.status(200).json(output);
    } catch (err) {
      return res.status(400).send("Failed, check ur code dummy");
    }
  }

  async getByUsernameNewUser(req, res) {
    const { username } = req.params;
    try {
      const output = await this.model.findAll({
        where: {
          username,
        },
      });
      const isUsernameTaken = output.length > 0;
      return res.status(200).send(isUsernameTaken);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async updateAddress(req, res) {
    const { address } = req.body;
    const { id } = req.params;
    console.log("HERE");
    console.log(address, id);
    try {
      await this.model.update(
        {
          address,
        },
        {
          where: {
            id: id,
          },
        }
      );
      res.status(200).send("Address updated");
    } catch (error) {
      console.log(error)
      res.status(400).json(error);
    }
  }

  async updateOne(req, res) {
    const {
      email,
      firstName,
      lastName,
      username,
      bio,
      style,
      address,
      profilePicture,
    } = req.body;
    const { id } = req.params;
    try {
      await this.model.update(
        {
          email,
          firstName,
          lastName,
          username,
          bio,
          style,
          address,
          profilePicture,
        },
        {
          where: {
            id: id,
          },
        }
      );
      return res
        .status(200)
        .json({ success: true, msg: "Updated successfully" });
    } catch (err) {
      return res.status(400).json({ success: false, msg: err });
    }
  }
}

module.exports = UsersController;
