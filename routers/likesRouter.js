const express = require("express");
const router = express.Router();

class LikesRouter {
  constructor(controller, checkJwt) {
    this.controller = controller;
    this.checkJwt = checkJwt;
  }
  routes() {
    router.get("/count/:listingId", this.controller.getCount);
    router.get("/list/:userId", this.checkJwt, this.controller.getLikesList);
    router.delete(
      "/delete/:listingId/:userId",
      this.checkJwt,
      this.controller.deleteOne
    );
    router.post("/", this.checkJwt, this.controller.createOne);

    return router;
  }
}

module.exports = LikesRouter;
