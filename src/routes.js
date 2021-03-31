const express = require("express");
const routes = express.Router();

const views = __dirname + "/views/";

const profile = {
  name: "Greg Lixandrão",
  avatar: "https://avatars.githubusercontent.com/u/13009208?v=4",
  "monthly-budget": 2000,
  "days-per-week": 5,
  "hours-per-day": 4,
  "vacation-per-year": 4,
};

routes.get("/", (req, res) => res.render(views + "index"));

routes.get("/job", (req, res) => res.render(views + "job"));

routes.get("/job/edit", (req, res) => res.render(views + "job-edit"));

routes.get("/profile", (req, res) =>
  res.render(views + "profile", { profile })
);

routes.get("/index.html", (req, res) => {
  return res.redirect("/");
});

module.exports = routes;
