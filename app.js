const express = require("express");
const mongoose = require("mongoose");

const app = express();

require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("Coonected to Database"))
  .catch(err => console.log("Failed toconnect Database", err));

app.use("/", require("./routes/index"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server is Running..."))