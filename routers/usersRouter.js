const express = require("express");
const router = express.Router();

class UsersRouter {
  constructor(controller, checkJwt) {
    this.controller = controller;
    this.checkJwt = checkJwt;
  }
  routes() {
    router.get(
      "/",
      this.checkJwt,
      this.controller.getAll.bind(this.controller)
    );
    router.get(
      "/email/:email",
      this.checkJwt,
      this.controller.getByEmail.bind(this.controller)
    );
    router.get(
      "/username/new/:username",
      this.checkJwt,
      this.controller.getByUsernameNewUser.bind(this.controller)
    );
    router.get(
      "/profile/:username",
      this.checkJwt,
      this.controller.getProfileByUsername.bind(this.controller)
    );
    router.get(
      "/username/:userId/:username",
      this.checkJwt,
      this.controller.getByUsernameExistingUser.bind(this.controller)
    );
    router.post(
      "/",
      this.checkJwt,
      this.controller.createOne.bind(this.controller)
    );
    router.put(
      "/address/:id",
      this.checkJwt,
      this.controller.updateAddress.bind(this.controller)
    );
    router.put(
      "/:id",
      this.checkJwt,
      this.controller.updateOne.bind(this.controller)
    );
    return router;
  }
}

module.exports = UsersRouter;
