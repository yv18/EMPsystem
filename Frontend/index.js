const express = require("express");
const path = require("path");

const app = express();

const port = 3000;

app.listen(port, function () {
  console.log(`App started on`, port);
});

app.use(express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});
