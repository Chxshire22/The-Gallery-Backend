const express = require("express");
const router = express.Router();

class UsersRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    router.get("/", this.controller.getAll.bind(this.controller));
    router.get(
      "/email/:email",
      this.controller.getByEmail.bind(this.controller)
    );
    router.get(
      "/username/new/:username",
      this.controller.getByUsernameNewUser.bind(this.controller)
    );
    router.get(
      "/profile/:username",
      this.controller.getProfileByUsername.bind(this.controller)
    );
    router.get(
      "/username/:userId/:username",
      this.controller.getByUsernameExistingUser.bind(this.controller)
    );
    router.post("/", this.controller.createOne.bind(this.controller));
    router.put("/address/:id", this.controller.updateAddress.bind(this.controller));
    router.put("/:id", this.controller.updateOne.bind(this.controller));
    return router;
  }
}

module.exports = UsersRouter;
