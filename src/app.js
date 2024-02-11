const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes/index");
require("./db");

const server = express();

server.use(morgan("dev"));
server.use(bodyParser.json());
server.use(
  cors({
    origin: "https://incident-manager-client.vercel.app/",
    methods: "GET,PUT,POST,DELETE",
    credentials: true,
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, x-access-token"
  })
);
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://incident-manager-client.vercel.app/");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
server.use("/", routes);

server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});


module.exports = server;