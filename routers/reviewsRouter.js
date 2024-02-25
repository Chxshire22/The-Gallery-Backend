const express = require("express");
const router = express.Router();

class ReviewsRouter {
  constructor(controller, checkJwt) {
    this.controller = controller;
    this.checkJwt = checkJwt;
  }
  routes() {
    router.post("/", this.checkJwt, this.controller.createOne);
    router.delete(
      "/delete/:listingId/:userId",
      this.checkJwt,
      this.controller.deleteOne
    );

    return router;
  }
}

module.exports = ReviewsRouter;
