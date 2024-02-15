const express = require("express");
const router = express.Router();

class OrderRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    router.post("/", this.controller.createOne);
    router.delete("/delete/:listingId", this.controller.deleteOne);

    return router;
  }
}

module.exports = OrderRouter;
