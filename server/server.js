const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDB = require("./db/database");
const transactionRoute = require("./routes/transaction");
const authRoute = require("./routes/auth");

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/api/v1", transactionRoute);
app.use("/api/v1", authRoute);

// server start
const startServer = () => {
  connectDB();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port http://127.0.0.1:${PORT}`);
  });
};

startServer();
