const express = require("express");
const rout = express.Router();

const { getAllUser, createUser, login } = require("../controller/user");

rout.get("/", getAllUser);
rout.post("/", createUser);
rout.post("/login", login);

module.exports = rout;
