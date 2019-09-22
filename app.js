const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

require("dotenv").config();
require("./config/passport");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(passport.initialize());

mongoose
  .connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("Coonected to Database"))
  .catch(err => console.log("Failed toconnect Database", err));

app.use("/", require("./routes/index"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/question", require("./routes/question"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server is Running..."))