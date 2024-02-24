const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const app = express();
const { auth } = require("express-oauth2-jwt-bearer");

//checking for required scopes for specific route
const checkJwt = auth({
  audience: process.env.AUTH_AUDIENCE,
  issuerBaseURL: process.env.AUTH_ISSUER_BASE_URL,
});

// IMPORT ROUTER
const UsersRouter = require("./routers/usersRouter");
const CategoriesRouter = require("./routers/categoriesRouter");
const ListingsRouter = require("./routers/listingsRouter");
const ListingImagesRouter = require("./routers/listingImagesRouter");
const ChatRouter = require("./routers/chatRouter");
const LikesRouter = require("./routers/likesRouter");
const ReviewsRouter = require("./routers/reviewsRouter");
const OrderRouter = require("./routers/orderRouter");

// IMPORT CONTROLLER
const UsersController = require("./controllers/userController");
const CategoriesController = require("./controllers/categoriesController");
const ListingsController = require("./controllers/listingsController");
const ListingImagesController = require("./controllers/listingImagesController");
const ChatController = require("./controllers/chatController");
const LikesController = require("./controllers/likesController");
const ReviewsController = require("./controllers/reviewsController");
const OrderController = require("./controllers/orderController");

// IMPORT DB
const db = require("./models/index");
const {
  user,
  listing,
  category,
  chat_image,
  chatroom_message,
  chatroom,
  like,
  listing_image,
  order,
  review,
} = db;

// INIT CONTROLLER
const usersController = new UsersController(user);
const chatController = new ChatController(
  chatroom_message,
  chat_image,
  chatroom,
  listing,
  user
);
const categoriesController = new CategoriesController(category);
const listingsController = new ListingsController(
  listing,
  category,
  listing_image,
  user,
  review,
  like
);
const listingImagesController = new ListingImagesController(listing_image);
const likesController = new LikesController(like, listing, listing_image, user);
const reviewsController = new ReviewsController(review);
const orderController = new OrderController(
  order,
  listing,
  user,
  listing_image
);

// INIT ROUTERS
const usersRouter = new UsersRouter(usersController, checkJwt).routes();
const categoriesRouter = new CategoriesRouter(
  categoriesController,
  checkJwt
).routes();
const listingsRouter = new ListingsRouter(
  listingsController,
  checkJwt
).routes();
const listingImagesRouter = new ListingImagesRouter(
  listingImagesController,
  checkJwt
).routes();
const chatRouter = new ChatRouter(chatController, checkJwt).routes();
const likesRouter = new LikesRouter(likesController, checkJwt).routes();
const reviewRouter = new ReviewsRouter(reviewsController, checkJwt).routes();
const orderRouter = new OrderRouter(orderController, checkJwt).routes();

// Middleware
app.use(cors());
app.use(express.json());

// Enable and use routers
app.use("/users", usersRouter);
app.use("/categories", categoriesRouter);
app.use("/listings", listingsRouter);
app.use("/listing-images", listingImagesRouter);
app.use("/chat", chatRouter);
app.use("/likes", likesRouter);
app.use("/reviews", reviewRouter);
app.use("/orders", orderRouter);

const http = require("http").Server(app);
const socketIO = require("socket.io")(http, {
  cors: { origin: "*" },
});
http.listen(PORT, () => {
  console.log("Application listening to port 3000");
});

socketIO.on("connection", (socket) => {
  console.log(`New connection made, the socket id is: ${socket.id}`);

  socket.on("send_message", (data) => {
    console.log("sending message BE");
    socket.broadcast.emit("receive_message", data);
  });
});
