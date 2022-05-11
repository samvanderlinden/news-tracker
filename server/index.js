//IMPORT ENV FILES
require("dotenv").config();

//CREATE EXPRESS SERVER
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 5000;

//IMPORT CORS
const cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

//CONNECT TO MONGO DB
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to db");
  }
);

//MIDDLEWARES
app.use(express.json());
app.use(cors(corsOptions));

//IMPORT ROUTES
const authRoute = require("./routes/auth");
const postsRoute = require("./routes/posts");
const articlesRoute = require("./routes/articles");

app.use("/api/user", authRoute);
app.use("/api/posts", postsRoute);
app.use("/api/articles", articlesRoute);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
