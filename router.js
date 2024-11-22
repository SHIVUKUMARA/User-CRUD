const appRoute = require("express").Router();
const {
  createUser,
  readAllUser,
  readSingleUser,
  updateUser,
  deleteUser,
} = require("./controller");

appRoute.post("/create", createUser);
appRoute.get("/readall", readAllUser);
appRoute.get("/read/:id", readSingleUser);
appRoute.patch("/update/:id", updateUser);
appRoute.delete("/delete/:id", deleteUser);

module.exports = appRoute;
