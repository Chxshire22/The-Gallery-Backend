const express = require("express");
const router = express.Router();

class ReviewsRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    router.post("/", this.controller.createOne);
    router.delete("/delete/:listingId/:userId", this.controller.deleteOne);

    return router;
  }
}

module.exports = ReviewsRouter;
