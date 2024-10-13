import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
// import initWebroutes from "./routes/web";
import connectDB from "./config/connectDB";
import cors from "cors";
import {
  ReadData,
  CreateData,
  Searching,
  // ReadID,
} from "./controllers/homeController";
require("dotenv").config();

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
connectDB();

app.get("/api/get-list", ReadData);
app.post("/api/create-book", CreateData);
app.get("/api/search-list", Searching);

// app.get("/api/get-id", ReadID);

let port = process.env.PORT || 3030;
// port == undifined => port = 3030
app.listen(port, () => {
  console.log("Server listening on port " + port);
});
