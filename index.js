const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = 3000;

const app = express();

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
const orderController = new OrderController(order);

// INIT ROUTERS
const usersRouter = new UsersRouter(usersController).routes();
const categoriesRouter = new CategoriesRouter(categoriesController).routes();
const listingsRouter = new ListingsRouter(listingsController).routes();
const listingImagesRouter = new ListingImagesRouter(
  listingImagesController
).routes();
const chatRouter = new ChatRouter(chatController).routes();
const likesRouter = new LikesRouter(likesController).routes();
const reviewRouter = new ReviewsRouter(reviewsController).routes();
const orderRouter = new OrderRouter(orderController).routes();

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
app.use("/order", orderRouter);

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});

// SOCKET
const io = require("socket.io")(server, {
  cors: {
    origin: true,
    methods: ["GET", "PUT", "POST", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log(`New connection made, the socket id is: ${socket.id}`);

  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
  });
});
