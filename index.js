import express from "express";
import https from "https";
import fs from "fs";

const app = express();
const port = 3000;

const options = {
  cert: fs.readFileSync("./certs/cert.pem"),
  key: fs.readFileSync("./certs/key.pem"),
};

app.get("/", (req, res) => {
  res.status(200).json({ message: "Works" });
});

https.createServer(options, app).listen(port, () => {
  console.log(`Running on port: ${port}`);
});
