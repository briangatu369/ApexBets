const express = require("express");
const connectDb = require("./src/DataBase/connectDb");
const cors = require("cors");
const { UserRouter } = require("./src/Routes/user.router");
const { GameRouter } = require("./src/Routes/games.router");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { corsOptions } = require("./src/Config/corsConfig");
const { MpesaRouter } = require("./src/Routes/mpesa.router");

dotenv.config();
const app = express();

const MONGOURL = process.env.MONGODB_URL;
const PORT = process.env.PORT;

// Apply CORS middleware
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", UserRouter);
app.use("/api/games", GameRouter);
app.use("/api/mpesa", MpesaRouter);

const startSever = async () => {
  try {
    await connectDb(MONGOURL);
    app.listen(PORT, () => {
      console.log("The server is running");
    });
  } catch (error) {
    console.error(error.message);
  }
};

startSever();
