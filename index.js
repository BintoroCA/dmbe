// import dotenv and call config function to load environment
require("dotenv").config();

// import and use express
const express = require("express");
const app = express();
app.use(express.json());

// import and use cors
const cors = require("cors");
app.use(cors());

// routes to the variabel
const router = require("./src/routes");
// endpoint grouping and router
app.use("/api/v1/", router);
app.use("/uploads", express.static("uploads")); //to use uploads folder as storage

// create variable to http to make server for socket io
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", //define client origin if client and server on different port
  },
});

// import socket function and call with parameter io
require("./src/socket")(io);

// set the port for server/backend
const port = process.env.PORT || 5005;

// change app to server
server.listen(port, () => console.log(`Listening on port ${port}!`));


