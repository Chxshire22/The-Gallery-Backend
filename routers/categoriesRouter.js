const express = require("express");
const router = express.Router();

class CategoriesRouter {
  constructor(controller, checkJwt) {
    this.controller = controller;
    this.checkJwt = checkJwt;
  }
  routes() {
    router.get("/", this.controller.getAll.bind(this.controller));
    router.post(
      "/",
      this.checkJwt,
      this.controller.createOne.bind(this.controller)
    );
    router.get(
      "/name/:categoryName",
      this.controller.getByName.bind(this.controller)
    );
    router.get("/:categoryId", this.controller.getById.bind(this.controller));
    return router;
  }
}

module.exports = CategoriesRouter;
