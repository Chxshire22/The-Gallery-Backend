const express = require("express");
const router = express.Router();

class ListingImagesRouter {
  constructor(controller, checkJwt) {
    this.controller = controller;
    this.checkJwt = checkJwt;
  }
  routes() {
    router.post(
      "/",
      this.checkJwt,
      this.controller.createBatch.bind(this.controller)
    );
    router.get(
      "/:listingId",
      this.checkJwt,
      this.controller.getImagesForListing.bind(this.controller)
    );
    return router;
  }
}

module.exports = ListingImagesRouter;
