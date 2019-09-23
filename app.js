const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const { MONGO_URI } = require("./config/keys")

require("./config/passport");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(passport.initialize());

mongoose
  .connect(MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("Connected to Database"))
  .catch(err => console.log("Failed to Connect Database", err));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/question", require("./routes/question"));

if(process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server is Running..."))