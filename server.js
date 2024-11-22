const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config");

const PORT = process.env.PORT;

const app = express();

// middleware settings

// body parser middleware -> x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// body parser middleware -> json
app.use(express.json());

// cors middleware -> cors origin resource sharing
app.use(cors());

// server controller
app.get("/", async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Wellcome to the NODE API.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// connect router
app.use("/api/user", require("./router"));

// default controller
app.all("*", async (req, res) => {
  try {
    res.status(404).json({
      success: true,
      message: "Requuested path not found.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

//   server listen
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is Connected @ Port : http://localhost:${PORT}`);
});
