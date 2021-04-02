const express = require("express");
const server = express();
const routes = require("./routes");

// usando template engine
server.set("view engine", "ejs");

// habilitar arquivo statics
server.use(express.static("public"));

// usar o req.body
server.use(express.urlencoded({ extended: true }));

// rotas
server.use(routes);

server.listen(3000, () => console.log("rodando"));
