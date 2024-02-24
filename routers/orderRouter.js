const express = require("express");
const router = express.Router();

class OrderRouter {
  constructor(controller, checkJwt) {
    this.controller = controller;
    this.checkJwt = checkJwt;
  }
  routes() {
    router.post("/", this.checkJwt, this.controller.createOne);
    router.get("/sales/:userId", this.checkJwt, this.controller.getAllSale);
    router.get(
      "/purchases/:userId",
      this.checkJwt,
      this.controller.getAllPurchase
    );
    router.put(
      "/seller-sent/:sellerSent/:id",
      this.checkJwt,
      this.controller.updateSent
    );
    router.put(
      "/buyer-received/:buyerReceived/:id",
      this.checkJwt,
      this.controller.updateReceived
    );
    router.delete(
      "/delete/:listingId",
      this.checkJwt,
      this.controller.deleteOne
    );
    router.get("/:id", this.checkJwt, this.controller.getOne);

    return router;
  }
}

module.exports = OrderRouter;
