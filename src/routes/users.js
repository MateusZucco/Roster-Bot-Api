const EXPRESS = require("express");

const ROUTES = EXPRESS.Router();

const CONTROLLER = require("../controllers/users");

ROUTES.post("/new-user", CONTROLLER.create);
ROUTES.post("/:telegramId/login", CONTROLLER.login);

ROUTES.get("/:telegramId/verify-register", CONTROLLER.verifyRegister);

module.exports = ROUTES;
