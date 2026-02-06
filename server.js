const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const transactionRoutes = require("./routes/transactionRoutes");
const accountRoutes = require("./routes/accountRoutes");

const app = express();


app.use(cors());
app.use(express.json());


connectDB();

app.get("/", (req, res) => {
  res.send("Money Manager Backend API is running 🚀");
});

app.use("/api/transactions", transactionRoutes);
app.use("/api/accounts", accountRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
