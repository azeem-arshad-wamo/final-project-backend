import http from "http";
import app, { sessionStore } from "./app.js";
import "dotenv/config";
import { connectToDatabase } from "./db/database.js";

const port = process.env.PORT;

http.createServer(app).listen(port, async () => {
  console.log(`Running on port: ${port}`);
  await connectToDatabase();
  await sessionStore.sync();
});
