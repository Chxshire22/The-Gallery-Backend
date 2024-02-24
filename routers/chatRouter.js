const express = require("express");
const router = express.Router();

class ChatRouter {
  constructor(controller, checkJwt) {
    this.controller = controller;
    this.checkJwt = checkJwt;
  }
  routes() {
    router.get(
      "/:userId",
      this.checkJwt,
      this.controller.getAll.bind(this.controller)
    );
    router.get(
      "/chatroom/:chatroomId",
      this.checkJwt,
      this.controller.getMessages.bind(this.controller)
    );
    router.post(
      "/message",
      this.checkJwt,
      this.controller.createMessage.bind(this.controller)
    );
    router.post(
      "/image",
      this.checkJwt,
      this.controller.createImage.bind(this.controller)
    );
    router.post(
      "/chatroom",
      this.checkJwt,
      this.controller.createChatroom.bind(this.controller)
    );
    return router;
  }
}

module.exports = ChatRouter;
