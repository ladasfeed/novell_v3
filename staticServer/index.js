const express = require("express");
const app = express();
const port = 8081;
const upload = require("./lib/upload");
const cors = require("cors");

app.use(cors());

app.use("/static", express.static("static"));

app.listen(port, () => {
  console.log(`Runs on ${port}`);
});

app.get("/", (req, res) => {
  res.send("works");
});

app.post("/upload", upload.single("picture"), (req, res) => {
  res.json({ filename: req.file.filename });
});
