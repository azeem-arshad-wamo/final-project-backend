import https from "https";
import app from "./app.js";
import fs from "fs";

const port = 3000;

const options = {
  cert: fs.readFileSync("./certs/cert.pem"),
  key: fs.readFileSync("./certs/key.pem"),
};

https.createServer(options, app).listen(port, () => {
  console.log(`Running on port: ${port}`);
});
