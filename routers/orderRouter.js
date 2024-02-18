const express = require("express");
const router = express.Router();

class OrderRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    router.post("/", this.controller.createOne);
    router.get("/sales/:userId", this.controller.getAllSale);
    router.get("/purchases/:userId", this.controller.getAllPurchase);
    router.put("/seller-sent/:sellerSent/:id", this.controller.updateSent);
    router.put(
      "/buyer-received/:buyerReceived/:id",
      this.controller.updateReceived
      );
      router.delete("/delete/:listingId", this.controller.deleteOne);
      router.get("/:id", this.controller.getOne);

    return router;
  }
}

module.exports = OrderRouter;
