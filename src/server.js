import https from "https";
import app from "./app.js";
import fs from "fs";
import "dotenv/config";
import { connectToDatabase } from "./config/database.js";

const port = process.env.PORT;

const options = {
  cert: fs.readFileSync("./certs/cert.pem"),
  key: fs.readFileSync("./certs/key.pem"),
};

https.createServer(options, app).listen(port, async () => {
  console.log(`Running on port: ${port}`);
  connectToDatabase();
});
