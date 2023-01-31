const path = require("path");
const cors = require("cors");
const express = require("express");

const connect = require("./db/DB.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

connect();

// Render index.html
app.get("/", async (_, res) => {
  try {
    res.render("index.ejs");
  } catch (error) {
    console.log(error);
    res.send("<h1>Unknown error occurred</h1>");
  }
});

const router = require("./routes/router.js");
app.use("/api/v1", router);

// APP SERVER
app.listen(8000, () => {
  console.log("Server listening on 5000");
});
